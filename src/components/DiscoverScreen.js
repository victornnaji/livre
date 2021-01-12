import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion';
import BookRow from './BookRow';
import TopPicks from './TopPicks';
import { media, theme } from 'styles';
import Loading from './Loading';
import InitialBookScreen from './InitialBookScreen';

const DiscoverScreen = ({data, isSuccess, isIdle, isLoading, isError, error, user}) => {
    return (
      <StyledDiscoverScreen>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          className="discover-contents"
          variants={{
            initial: { y: 7, opacity: 0 },
            exit: {
              y: 5,
              opacity: 0,
              transition: {
                y: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
              },
            },
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.9,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 1.0,
              },
            },
          }}
        >
          {isLoading ? <BookSearchResult><Loading /></BookSearchResult> : null}
          {isIdle && <BookSearchResult><InitialBookScreen user={user}/></BookSearchResult>}
          {isError ? (
                <div className="error-message">
                    <p>There was an error:</p>
                    <pre>{error.message}</pre>
                </div>
            ) : null}
          {isSuccess ? data?.books?.length ? (
          <BookSearchResult>
            {data.books.map(book => (
                <div className={`x ${data.books.length < 3 ? "two-books": null}`} key={book.id}><BookRow book={book} /></div>
            ))}
          </BookSearchResult>
          ) : (<div>no books found</div>) : null}
          <TopPickResult>
            <TopPicks user={user}/>
          </TopPickResult>
        </motion.div>
      </StyledDiscoverScreen>
    );
}

const StyledDiscoverScreen = styled.div`
    margin-top: 3rem;
    .discover-contents{
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        column-gap: 2rem;
        position: relative;

        ${media.phablet`grid-template-columns: 1fr; row-gap: 5rem;`}
    }

`;


const BookSearchResult = styled.div`   
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    position: relative;

    .x{
        width: 49.5%;
        ${media.phablet`width: 100%; `}
        ${media.tablet`min-height: 250px`};
        ${media.phone`min-height: 220px`};
        margin-bottom: .7rem;
        background-color: ${theme.colors.grey};
        
        &.two-books{
            height: 22rem !important;
        }
    }

    ${media.phablet`flex-direction: column; min-height: 5rem;`}
`;

const TopPickResult = styled.div`
`;

export default DiscoverScreen
