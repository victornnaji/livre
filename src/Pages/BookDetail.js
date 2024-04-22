import React from 'react'
import styled from 'styled-components';
import {useParams} from 'react-router-dom'
import { media, mixin, theme } from 'styles';
import Laptop from 'assets/Laptop';
import StatusButton from 'components/StatusButton';
import NotesTextarea from 'components/NotesTextarea';
import Rating from 'components/Rating';
import ListItemTimeframe from 'components/ListItemTimeframe';
import { useHistory } from "react-router-dom";
import { useBook, useListItem} from 'hooks/query-hooks';

const BookDetail = () => {
    let history = useHistory();
    React.useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [])
    
    const { bookId } = useParams();

    const {book} = useBook(bookId);

    const listItem = useListItem(bookId);

    const {title, author, coverImageUrl, publisher, synopsis} = book

    return (
      <StyledBookDetail>
        <button onClick={history.goBack} className="back-button">
          ← Back
        </button>
        <div className="column image-column">
          <img
            className="image"
            src={coverImageUrl}
            style={{ width: "100%", maxWidth: "30rem" }}
            alt={`${title} book cover`}
          />
        </div>
        <div className="column text-column">
          <div className="text-container">
            <h2 className="title-row">{title}</h2>
            <div className="author-row">
              <div className="author">{author}</div>
              {listItem?.finishDate ? (
                <>
                <span className="seperator"></span>
                  <div className="rating">
                    <Rating listItem={listItem} />
                  </div>
                </>
              ) : null}
            </div>
              <div className="date">
                {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
              </div>
            <div className="publisher">
              <div className="pub-icon">
                <Laptop />
              </div>
              {publisher}
            </div>

            <div className="buttons-row">
              <StatusButton book={book} />
            </div>

            <div className="annotations">
              <div className="title">Synopsis:</div>
              <div className="synopsis">{synopsis}</div>
            </div>
          </div>
        </div>
          {!book.loadingBook && listItem ? (
            <StyledNotesContainer>
                <NotesTextarea listItem={listItem} />
            </StyledNotesContainer>
          ) : null}
      </StyledBookDetail>
    );
}

const StyledNotesContainer = styled.div` 
    text-align: center;
    grid-column: 1/ -1;
    width: 60%;
    margin: 5rem auto 0 auto;

    ${media.phablet`width: 100%; `}
`;

const StyledBookDetail = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3rem auto;
    ${media.phablet`display: block`}

    .back-button{
        grid-column: 1 / -1;
        color: ${theme.colors.primary};
        text-decoration: none;
        font-size: 1.5rem;
        width: 10rem;
        cursor: pointer;
        ${media.phablet`display: block; margin-bottom: 2rem`}

        &:hover{
            color: ${theme.colors.tertiary};
        }
    }

    .column{
        will-change: transform;
        min-height: 50rem;
        ${media.phablet`min-height: 100%`}
        ${media.phone`min-height: 20rem;`}
    }

    .image-column{
        background-color: ${theme.colors.grey};
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .text-column{
        padding: 3rem;
        ${media.phone`padding: 3rem 0rem;`}

        .title-row{
            font-size: 2.7rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .author-row{
            ${mixin.flexBetween};
            justify-content: flex-start;

            .seperator{
                height: .5rem;
                width: .5rem;
                background: ${theme.colors.primary};
                text-align: center;
                margin: 0 1.5rem;
                border-radius: 3rem;

            }

            .rating{
                font-size: 2rem;
            }
        }

        .date{
            margin-top: 1.5rem;
            font-size: 1.4rem;

            svg{
                margin-right: 1rem;
            }
        }

        .author{
            font-size: 1.6rem;
            font-weight: 700;
        }

        .year{
            font-size: 1.5rem;
            position: relative;
        }

        .publisher{
            margin: 2.5rem 0 1rem 0;
            background-color: ${theme.colors.grey};
            padding: 1.5rem;
            ${mixin.flexBetween};
            justify-content: flex-start;
            font-weight: 500;
            font-size: 1.3rem;

            .pub-icon{
                height: 3rem;
                width: 3rem;
                margin-right: 2rem;
            }
        }

        .buttons-row{
            padding: 2rem 0;
            border-bottom: 1px solid ${theme.colors.grey};
        }

        .annotations{
            margin-top: 2.5rem;

            .title{
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
            }

            .synopsis{
                font-size: 1.4rem;
                font-weight: 400;
                line-height: 1.5;
            }
        }
    }
`;

export default BookDetail
