import React from 'react'
import styled from 'styled-components';
import { AnimatePresence } from "framer-motion";
import Nav from 'components/Nav';
import SubNav from 'components/SubNav';
import { media, mixin, theme } from 'styles';
import Discover from 'Pages/Discover';
import List from 'Pages/List';
import {Switch, Route, Redirect} from 'react-router-dom';
import BookDetail from 'Pages/BookDetail';
import NotFoundScreen from 'Pages/NotFoundScreen';
import Finished from 'Pages/Finished';
import {ErrorBoundary} from 'react-error-boundary'



function ErrorFallback({error}) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.colors.danger
        }}
      >Error: {error.message}</div>
    )
  }

const AuthenticatedApp= ({logout, user}) => {
    
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AnimatePresence initial={false}>
            <Nav key="nav" logout={logout} user={user}/>
            <SubNav key="subnav"/>
                <DiscoverBookContainer>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                    </ErrorBoundary>
                </DiscoverBookContainer>
        </AnimatePresence>
        </ErrorBoundary>
    )
}

const DiscoverBookContainer = styled.div`
    ${mixin.container};
    padding: 5rem 0;

    ${media.phone`padding: 4rem 0`}
`

export default AuthenticatedApp
