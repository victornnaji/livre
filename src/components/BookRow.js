import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { media, mixin, theme } from 'styles'
import Rating from './Rating'
import StatusButton from './StatusButton'
import { useListItem } from 'hooks/query-hooks'

const BookRow = ({book}) => {
    const { title, author, coverImageUrl } = book;
    const listItem = useListItem(book.id);

    const id = `book-row-book-${book.id}`;

    return (
      <StyledBookRow>
        <BookRowLink aria-labelledby={id} to={`/book/${book.id}`}>
          <div className="book-side">
            <img src={coverImageUrl} alt={`${title} book cover`} />
          </div>
          <div className="text-side">
            <span className="publisher">{book.publisher}</span>
            <p className="book-title">{title}</p>
            <div className="book-author">
              <span>{author}</span>
              <div className="book-rating">
                {listItem?.finishDate ? (
                  <Rating listItem={listItem} />
                ) : null}
              </div>
            </div>
            <small className="synopsis">
              {book.synopsis.substring(0, 120)}...
            </small>
          </div>
        </BookRowLink>
        <div className="button-side">
          <StatusButton book={book} />
        </div>
      </StyledBookRow>
    );
}

const BookRowLink = styled(Link)`
    ${mixin.flexBetween};
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    text-decoration: none;
    color: currentColor;
    grid-column: 1/ -1;
`

const StyledBookRow = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 33.3% auto;
    grid-template-rows: auto auto;
    box-sizing: border-box;

    &:hover{
        /* background: ${theme.colors.tertiary}; */
        box-shadow: ${theme.colors.gray20} 0px 5px 15px -5px ;
    }

    .book-side{
        width: 33.3333%;
        height: 20rem;
        ${media.phablet`height: 100%`}
        ${media.phone`transform: translateY(3.5rem)`}

        img{
            max-width: 100%;
            height: 100%;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 8px 0px, rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
            ${media.phablet`height: auto`};
        }
    }

    .button-side{
        grid-column: 2;
    }

    .text-side{
        width: 66.6667%;
        margin-left: 1.6rem;
        font-size: 1.4rem;
        ${media.desktop`margin-bottom: 2rem`}
        ${media.phone`font-size: 1.1rem;`}

        .publisher{
            font-weight: 400;
            font-size: 1rem;
            margin-bottom: 2rem;
            text-align: right;
            display: block;
        }

        .book-title{
            margin-bottom: 1rem;
            font-size: 1.6rem;
            font-weight: 700;

            ${media.phone`font-size: 1.4rem`}
        }
        .book-author{
            ${mixin.flexBetween};
            font-weight: 700;
            font-size: 1.2rem;
        }

        .synopsis{
            margin-top: 1.2rem;
            font-size: 1.4rem;
            display: inline-block;
        }
    }
`

export default BookRow
