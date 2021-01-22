import React from 'react'
import { useAuth } from '_context/auth-context'
import Loading from 'components/Loading'

const AuthenticatedApp = React.lazy(() => import(/* webpackPrefetch: true */'./AuthenticatedApp') )
const UnAuthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp') )

const App = () => {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<Loading />}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  )
  
};

export default App
