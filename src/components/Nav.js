import Logo from 'assets/Logo'
import React from 'react'
import styled from 'styled-components'
import { media, mixin, theme } from 'styles'
import {motion} from 'framer-motion'
import { StyledButton } from './Button'

const parentVariants = {
    exit: {
      transition: { staggerChildren: 1.05, staggerDirection: -1 },
    },
    enter: {
      transition: { staggerChildren: 0.07, delayChildren: 0.5 },
    },
}


const Nav = () => {
    return (
      <StyledNavBar>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          className="nav-contents"
          variants={parentVariants}
        >
          <motion.div className="logo" variants={theme.variants}>
            <Logo />
          </motion.div>

          <motion.div 
          initial="initial"
          animate="enter"
          exit="exit"
          className="user" variants={parentVariants}>
                <motion.div className="username" variants={theme.variants}>Victor Nnaji</motion.div>
                <motion.div className="logout-btn" variants={theme.variants}>
                    <NavStyledButton>Logout</NavStyledButton>
                </motion.div>
          </motion.div>
        </motion.div>
      </StyledNavBar>
    );
}

const StyledNavBar = styled.nav`
    height: 7rem;
    margin-top: 1rem;

    .nav-contents{
        height: 100%;
        ${mixin.flexBetween}
        ${mixin.container}
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
    ${media.phablet`padding: 1rem 2.5rem; font-size: 1.4rem`}
`
export default Nav
