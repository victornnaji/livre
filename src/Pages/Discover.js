import React from 'react'
import styled from 'styled-components';
import { media, mixin, theme } from 'styles';
import Spinner from 'assets/Spinner';
import TopPicks from 'components/TopPicks';
import Times from 'assets/Times';
import BookRow from 'components/BookRow';
import {useQueryClient} from 'react-query';
import { useBookSearch, useRefetchBookSearchQuery } from 'hooks/query-hooks';

const Discover = () => {
    const [query, setQuery] = React.useState("");
    const [queried, setQueried] = React.useState(false);
    const queryCache = useQueryClient();

    const {books, error, isLoading, isError, isSuccess} = useBookSearch(query);
    const refetchBookSearchQuery = useRefetchBookSearchQuery();

    React.useEffect(() => {
     return () => {
      refetchBookSearchQuery(queryCache);
     }
    }, [queryCache, refetchBookSearchQuery])
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setQueried(true);
        setQuery(e.target.search.value);
    }

    return (
      <StyledDiscover>
        <div
          className="search-form"
        >
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="search" className="search-btn">
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <Times aria-label="error" className="error-icon" />
              ) : (
                <button type="submit" title="Search books">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    aria-label="search"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </button>
              )}
            </label>
            <input type="search" placeholder="Search books..." id="search" />
          </form>
        </div>

        <StyledDiscoverScreen>
          <div>
            {isError ? (
              <div className="error-message">
                <p>There was an error:</p>
                <pre>{error.message}</pre>
              </div>
            ) : null}

            <div>
              {queried ? null : (
                <div>
                  <p className="initial-book-header">
                    Welcome to the discover page.
                  </p>
                  <p className="initial-book-header">
                    Here, let me load a few books for you...
                  </p>
                  {isLoading ? (
                    <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
                      <Spinner />
                    </div>
                  ) : isSuccess && books.length ? (
                    <p className="initial-book-header">
                      Here you go! Find more books with the search bar above.
                    </p>
                  ) : isSuccess && !books.length ? (
                    <p className="initial-book-header">
                      Hmmm... I couldn't find any books to suggest for you.
                      Sorry.
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            { books.length ? (
                <BookSearchResult>
                  {books.map((book) => (
                    <div
                      className={`x ${books.length < 3 ? "two-books" : null}`}
                      key={book.id}
                    >
                      <BookRow book={book}/>
                    </div>
                  ))}
                </BookSearchResult>
              ) : (
                <p>No books found. Try another search.</p>
              )
            }
          </div>
          <TopPicks />
        </StyledDiscoverScreen>
      </StyledDiscover>
    );
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

const StyledDiscoverScreen = styled.div`
        margin-top: 3rem;
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        column-gap: 2rem;
        position: relative;

        ${media.tablet`grid-template-columns: 1fr; row-gap: 5rem;`}

        .initial-book-header{
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 2rem;

          &:last-of-type{
            margin-bottom: 5rem;
          };

        }

`;

export const BookSearchResult = styled.div`   
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
            height: 26rem !important;
        }
    }

    ${media.phablet`flex-direction: column; min-height: 5rem;`}
`;


export default Discover
