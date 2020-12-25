import React from 'react'
import styled from 'styled-components';
import { AnimatePresence } from "framer-motion";
import Nav from 'components/Nav';
import SubNav from 'components/SubNav';
import { media, mixin } from 'styles';

const Main= () => {

    return (
        <AnimatePresence exitBeforeEnter initial={true}>
                <Nav/>
                <SubNav />
            <DiscoverBookContainer>
                hello
            </DiscoverBookContainer>
        </AnimatePresence>
    )
}

const DiscoverBookContainer = styled.div`
    ${mixin.container};
    padding: 6rem 0;

    ${media.phone`padding: 4rem 0`}
`

export default Main
