import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAsync } from 'hooks/use-async'
import {Link, useParams} from 'react-router-dom'
import { client } from '_helpers/client';
import PlaceHolder from 'assets/PlaceHolder.svg';
import { media, mixin, theme } from 'styles';
import Laptop from 'assets/Laptop';


const loadingBook = {
    title: 'Loading...',
    author: 'loading...',
    coverImageUrl: PlaceHolder,
    publisher: 'Loading Publishing',
    synopsis: 'Loading...',
    pageCount: '...loading',
    loadingBook: true,
  }

const LinkBtn = motion.custom(Link);

const BookDetail = ({user}) => {
    const {run, data} = useAsync();
    const {bookId} = useParams();

    React.useEffect(() => {
        run(client(`books/${bookId}`, {token: user.token}))
    }, [bookId, run, user.token])

    const {title, author, coverImageUrl, publisher, synopsis, pageCount} =
    data?.book ?? loadingBook

    const MotionBookDetail = motion.custom(StyledBookDetail);

    return (
        <MotionBookDetail initial="exit" animate="enter" exit="exit">
          <LinkBtn to="/discover" className="back-button">← Back</LinkBtn>
          <motion.div className="column image-column">
              <motion.img className="image" src={coverImageUrl} style={{width: '100%', maxWidth: '30rem'}} alt={`${title} book cover`}/>
          </motion.div>
          <motion.div className="column text-column" >
              <div className="text-container" >
                  <div className="title-row">{title}</div>
                  <div className="author-row">
                      <div className="author">{author}</div>
                      <span></span>
                      <div className="year">{pageCount} pages</div>
                  </div>
                  <div className="publisher">
                      <div className="pub-icon"><Laptop /></div>
                      {publisher}
                  </div>

                  <div className="buttons-row">
                      {/* buttons will be here */}
                  </div>

                  <div className="annotations">
                      <div className="title">Synopsis:</div>
                      <div className="synopsis">{synopsis}</div>
                  </div>
              </div>
          </motion.div>
        </MotionBookDetail>
    )
}

const StyledBookDetail = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3rem 1fr;
    ${media.phablet`grid-template-columns: 1fr`}

    .back-button{
        grid-column: 1 / -1;
        color: ${theme.colors.primary};
        text-decoration: none;
        font-size: 1.5rem;

        &:hover{
            color: ${theme.colors.tertiary};
        }
    }

    .column{
        will-change: transform;
        min-height: 50rem;
        ${media.phone`height: 100%`}
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
            margin-bottom: 1rem;
        }

        .author-row{
            ${mixin.flexBetween};
            justify-content: flex-start;

            span{
                height: .5rem;
                width: .5rem;
                background: ${theme.colors.primary};
                text-align: center;
                margin: 0 1.5rem;
                border-radius: 3rem;

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
            margin: 3rem 0;
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
            min-height: 2.5rem;
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
