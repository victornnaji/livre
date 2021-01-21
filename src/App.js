import React from 'react'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'
import { useAuth } from '_context/auth-context'

const App = () => {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />
};

export default App
