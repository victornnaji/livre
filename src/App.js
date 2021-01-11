import React from 'react'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'
import * as auth from '_helpers/auth_provider'
import { useAsync } from 'hooks/use-async'
import getUser from '_helpers/get-user'
import Loading from 'components/Loading'

const App = () => {

    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        run,
        setData,
      } = useAsync()

    React.useEffect(() => {
        run(getUser());
    }, [run]);

    if (isLoading || isIdle) {
        return <Loading />
    }

    if (isError) {
        return (
          <div>
            <p>Uh oh... There's a problem. Try refreshing the app.</p>
            <pre>{error.message}</pre>
          </div>
        )
      }

    if(isSuccess){
        const login = form => auth.login(form).then(u => setData(u))
        const register = form => auth.register(form).then(u => setData(u));
        const logout = () => {
            auth.logout()
            setData(null)
        }
    
        return user ? <AuthenticatedApp  user={user} logout={logout}/> : <UnAuthenticatedApp login={login} register={register}/>
    }

}

export default App
