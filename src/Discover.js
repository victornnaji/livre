import React from 'react'
import styled from 'styled-components';
import { AnimatePresence } from "framer-motion";
import Nav from 'components/Nav';
import Hero from 'components/Hero';

const Discover = () => {

    return (
        <AnimatePresence exitBeforeEnter initial={true}>
            <DiscoverBookContainer>
                <Nav/>
                <Hero />
            </DiscoverBookContainer>
        </AnimatePresence>
    )
}

const DiscoverBookContainer = styled.div`

`

export default Discover
