import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { media, mixin, theme } from 'styles'

const BookRow = ({book}) => {
    const {title, author, coverImageUrl} = book
    return (
        <StyledBookRow 
            aria-labelledby={book.id}
            to={`/book/${book.id}`}
         >
            <div className="book-side">
                <img src={coverImageUrl}  alt={`${title} book cover`}/>
            </div>
            <div className="text-side">
                <span className="publisher">{book.publisher}</span>
                <p className="book-title">{title}</p>
                <p className="book-author"><span>{author}</span> </p>
                <small className="synopsis">{book.synopsis.substring(0, 120)}...</small>
            </div>
        </StyledBookRow>
    )
}

const StyledBookRow = styled(Link)`
    height: 100%;
    text-decoration: none;
    box-sizing: border-box;
    padding: 1.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    ${mixin.flexBetween};
    justify-content: flex-start;
    position: relative;
    color: currentColor;
    box-sizing: border-box;

    &:hover{
        background: ${theme.colors.tertiary};
    }

    .book-side{
        width: 33.3333%;

        img{
            max-width: 100%;
            height: auto;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 8px 0px, rgba(0, 0, 0, 0.08) 0px 2px 4px 0px;
        }
    }

    .text-side{
        width: 66.6667%;
        margin-left: 1.6rem;
        font-size: 1.4rem;
        ${media.phone`font-size: 1.2rem`}

        .publisher{
            font-weight: 400;
            font-size: 1rem;
            position: absolute;
            top: 2rem;
            right: 1.5rem;
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
        }

        .synopsis{
            margin-top: 1.2rem;
            display: inline-block;
        }
    }
`

export default BookRow
