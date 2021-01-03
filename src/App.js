import React from 'react'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'
import * as auth from '_helpers/auth_provider'

const App = () => {
    const [user, setUser] = React.useState('');
    const login = form => auth.login(form).then(u => setUser(u))
    const register = form => auth.register(form).then(u => setUser(u));
    const logout = () => auth.logout().then(setUser(null));

    return user ? <AuthenticatedApp  user={user} logout={logout}/> : <UnAuthenticatedApp login={login} register={register}/>
}

export default App
