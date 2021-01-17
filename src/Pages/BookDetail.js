import React from 'react'
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom'
import { client } from '_helpers/client';
import PlaceHolder from 'assets/PlaceHolder.svg';
import { media, mixin, theme } from 'styles';
import Laptop from 'assets/Laptop';
import StatusButton from 'components/StatusButton';
import NotesTextarea from 'components/NotesTextarea';
import Rating from 'components/Rating';
import ListItemTimeframe from 'components/ListItemTimeframe';
import {useQuery} from 'react-query';


const loadingBook = {
    title: 'Loading...',
    author: 'loading...',
    coverImageUrl: PlaceHolder,
    publisher: 'Loading Publishing',
    synopsis: 'Loading...',
    pageCount: '...loading',
    loadingBook: true,
  }

const BookDetail = ({user}) => {
    const { bookId } = useParams();

    const {data : book = loadingBook } = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => client(`books/${bookId}`, {token: user.token}).then(data => data.book),
    });

    const { data: listItems } = useQuery({
      queryKey: "list-items",
      queryFn: () =>
        client(`list-items`, { token: user.token }).then(
          (data) => data.listItems
        ),
    });

    const listItem = listItems?.find(li => li.bookId === bookId) ?? null

    const {title, author, coverImageUrl, publisher, synopsis} = book

    return (
      <StyledBookDetail>
        <Link to="/discover" className="back-button">
          ← Back
        </Link>
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
            <div className="title-row">{title}</div>
            <div className="author-row">
              <div className="author">{author}</div>
              {listItem?.finishDate ? (
                <>
                <span className="seperator"></span>
                  <div className="rating">
                    <Rating user={user} listItem={listItem} />
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
              <StatusButton user={user} book={book} />
            </div>

            <div className="annotations">
              <div className="title">Synopsis:</div>
              <div className="synopsis">{synopsis}</div>
            </div>
          </div>
        </div>
          {!book.loadingBook && listItem ? (
            <StyledNotesContainer>
                <NotesTextarea user={user} listItem={listItem} />
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
