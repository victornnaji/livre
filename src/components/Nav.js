import Logo from 'assets/Logo'
import React from 'react'
import styled from 'styled-components'
import { media, mixin, theme } from 'styles'
import {motion} from 'framer-motion'
import { StyledButton } from './Button'
import { Link } from 'react-router-dom'

export const parentVariants = {
    exit: {
      transition: { staggerChildren: 1.05, staggerDirection: -1 },
    },
    enter: {
      transition: { staggerChildren: 0.07, delayChildren: 0.5 },
    },
}


const Nav = ({logout, user}) => {
  const MotionNav = motion.custom(Link);
    return (
      <StyledNavBar>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          className="nav-contents"
          variants={parentVariants}
        >
          <MotionNav to="/" className="logo" variants={theme.variants}>
            <Logo />
          </MotionNav>

          <motion.div 
          initial="initial"
          animate="enter"
          exit="exit"
          className="user" variants={parentVariants}>
                <motion.div className="username" variants={theme.variants}>{user.username}</motion.div>
                <motion.div className="logout-btn" variants={theme.variants}>
                    <NavStyledButton onClick={logout}>Logout</NavStyledButton>
                </motion.div>
          </motion.div>
        </motion.div>
      </StyledNavBar>
    );
}

const StyledNavBar = styled.nav`
    height: 7rem;
    background-color: ${theme.colors.primary};
    color: #fff;

    .nav-contents{
        height: 100%;
        ${mixin.flexBetween}
        ${mixin.container}

        .logo{
            fill: #fff;
        }
    }

    .user{
        ${mixin.flexBetween}

        .username{
            text-overflow: ellipsis;
            white-space: nowrap; 
            width: 15rem; 
            overflow: hidden;
            text-overflow: ellipsis; 
            font-size: 2rem;
            font-weight: 700;
            text-align: right;

            ${media.phone `width: 6rem; font-size: 1.6rem`}
        }

        .logout-btn{
            margin-left: 1.5rem;
        }
    }
`
const NavStyledButton = styled(StyledButton)`
    padding: 1.2rem 4rem;
    ${media.phablet`padding: 1rem 2.5rem; font-size: 1.4rem`}
    color: ${theme.colors.primary};
    background-color: ${theme.colors.tertiary};

    &:hover{
       background-color: ${theme.colors.darkTertiary};
    }
`
export default Nav
