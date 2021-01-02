import React from 'react'
import styled from 'styled-components';
import { AnimatePresence } from "framer-motion";
import Nav from 'components/Nav';
import SubNav from 'components/SubNav';
import { media, mixin } from 'styles';
import Discover from 'Pages/Discover';

const Main= () => {
    
    return (
        <AnimatePresence exitBeforeEnter initial={true}>
            <Nav key="nav"/>
            <SubNav key="subnav"/>
            <DiscoverBookContainer>
                <Discover key="ahshs"/>
            </DiscoverBookContainer>
        </AnimatePresence>
    )
}

const DiscoverBookContainer = styled.div`
    ${mixin.container};
    padding: 5rem 0;

    ${media.phone`padding: 4rem 0`}
`

export default Main
