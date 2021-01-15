import React from 'react'
import styled from 'styled-components';
import { AnimatePresence } from "framer-motion";
import Nav from 'components/Nav';
import SubNav from 'components/SubNav';
import { media, mixin } from 'styles';
import Discover from 'Pages/Discover';
import List from 'Pages/List';
import {Switch, Route, Redirect} from 'react-router-dom';
import BookDetail from 'Pages/BookDetail';
import NotFoundScreen from 'Pages/NotFoundScreen';
import Finished from 'Pages/Finished';

const AuthenticatedApp= ({logout, user}) => {
    
    return (
        <AnimatePresence initial={false}>
            <Nav key="nav" logout={logout} user={user}/>
            <SubNav key="subnav"/>
                <DiscoverBookContainer>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/discover" />
                        </Route>
                        <Route path="/discover"><Discover key="discover-key" user={user}/> </Route>
                        <Route path="/list"><List user={user}/> </Route>
                        <Route path="/finished"><Finished user={user}/> </Route>
                        <Route path="/book/:bookId"><BookDetail key="book-detail" user={user}/></Route>
                        <Route exact path="*"><NotFoundScreen/></Route>
                    </Switch>
                </DiscoverBookContainer>
        </AnimatePresence>
    )
}

const DiscoverBookContainer = styled.div`
    ${mixin.container};
    padding: 5rem 0;

    ${media.phone`padding: 4rem 0`}
`

export default AuthenticatedApp
