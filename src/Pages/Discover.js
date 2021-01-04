import DiscoverScreen from 'components/DiscoverScreen';
import React from 'react'
import styled from 'styled-components';
import { media, mixin, theme } from 'styles';
import {motion} from 'framer-motion';
import { client } from '_helpers/client';
import Spinner from 'assets/Spinner';
import { useAsync } from 'hooks/use-async';
import Times from 'assets/Times';
import Loading from 'components/Loading';


const variants = {
    initial: {y: -7, opacity: 0},
    exit: {
        y: 5, opacity: 0,
        transition: { y: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96]} },
    },
      enter: {
        y: 0,
        opacity: 1,
        transition: {  duration: .9, ease: [0.43, 0.13, 0.23, 0.96] , delay: .9},
    },
}

const Discover = () => {
    const [query, setQuery] = React.useState("")
    const [queried, setQueried] = React.useState(false)
    const {data, error, run, isLoading, isError, isSuccess, isIdle} = useAsync()

    
    React.useEffect(() => {
        if (!queried) {
            return
        }
        run(client(`books?query=${encodeURIComponent(query)}`))
    }, [query, queried, run])
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setQueried(true);
        setQuery(e.target.search.value);
    }

    console.log(data);

    return (
        <StyledDiscover>
            <motion.div className="search-form" variants={variants} initial="initial"
            animate="enter"
            exit="exit">
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="search" className="search-btn">
                    {isLoading ? (<Spinner />) : isError ? (<Times aria-label="error" className="error-icon"/>) : (
                        <button type="submit" title="Search books"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" aria-label="search" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></button>
                    )}
                    </label>
                    <input type="search" placeholder="Search books..." id="search"/>
                </form>
            </motion.div>

            {isError ? (
                <div className="error-message">
                    <p>There was an error:</p>
                    <pre>{error.message}</pre>
                </div>
            ) : null}

            {isLoading ? (
                <div><Loading/></div>
            ): <DiscoverScreen data={data} isSuccess={isSuccess} isIdle={isIdle}/>}

        </StyledDiscover>
    )
}

const StyledDiscover = styled.div`
    min-height: 100vh;

    form{
        position: relative;
    }


    .search-form{
        width: 50%;
        ${media.phablet`width: 100%`}

        .search-btn{
            position: absolute;
            top: 1.2rem;
            left: .8rem;
            
            & button {
                border: none;
                background-color: transparent;
            }
            & svg{
                fill: #999;
                height: 1.5rem;
                width: 1.5rem;
            }

            & .error-icon{
              fill: ${theme.colors.secondary} !important;
            }
        }

        input{
            width: 100%;
            padding: .8rem .8rem .8rem 4rem;
            border-radius: .4rem;
            border-color: #999;
            line-height: 1.5;
            font-family: ${theme.fonts.Nunito};
            font-weight: 700;
            cursor: text;
            line-height: 2.1rem;
            font-size: 1.8rem;
            color: #636c72;

            
            &:focus{
                border-color: ${theme.colors.primary};
                outline: none;
            }
        }
    }

    .error-message{
        padding: 3rem 0;
        ${mixin.flexBetween};
        align-items: flex-start;
        flex-direction: column;
        color: ${theme.colors.secondary};
        font-size: 1.4rem;
    }
`
export default Discover
