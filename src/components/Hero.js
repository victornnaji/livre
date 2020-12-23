import HeroDoddle from 'assets/HeroDoddle'
import React from 'react'
import styled from 'styled-components'
import { mixin, theme } from 'styles'
import {motion} from "framer-motion"

const imagevariant = {
    initial: { y: -7, opacity: 0 },
        exit: { 
            y: -5,
            opacity: 0,
            transition: {
                y: { stiffness: 100 , duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96]}
            }
         },
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 100, velocity: -100,  duration: .9, ease: [0.43, 0.13, 0.23, 0.96] }
            }
        }
}

const Hero = () => {
    return (
      <StyledHero>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            exit: {
              transition: { staggerChildren: 1.05, staggerDirection: -1 },
            },
            enter: {
              transition: { staggerChildren: 0.07, delayChildren: 1 },
            },
          }}
          transition={{ delay: 1.5 }}
        >

          <div className="text-doddle-area">
            <motion.div variants={theme.variants} className="text">
              Find Books that Don't suck
            </motion.div>

            <motion.div variants={imagevariant} className="doddle">
              <HeroDoddle />
            </motion.div>
          </div>

          <div className="form-container">
            <input />
          </div>

        </motion.div>
      </StyledHero>
    );
}

const StyledHero = styled.div`
    height: 40rem;
    background: ${theme.colors.tertiary};
   .text-doddle-area{
        ${mixin.container}
        ${mixin.flexBetween};
        height: 80%;
        .doddle{
            width: 30%;
            height: 100%;
        }

        .text{
            font-size: 3.5rem;
            font-weight: 700;
        }
   }
`

export default Hero
