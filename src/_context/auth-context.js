import { useAsync } from "hooks/use-async";
import React from "react";
import getUser from "_helpers/get-user";
import * as auth from "_helpers/auth_provider";
import Loading from "components/Loading";
import { client } from "_helpers/client";
import {useQueryClient} from 'react-query';

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

const AuthProvider = (props) => {
  const queryCache = useQueryClient();
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status
  } = useAsync();

  const login = React.useCallback((form) => auth.login(form).then((u) => setData(u)), [setData]);
  const register = React.useCallback((form) => auth.register(form).then((u) => setData(u)), [setData]);
  const logout = React.useCallback(() => {
    auth.logout();
    setData(null);
    queryCache.clear();
  }, [queryCache, setData]);

  const value = React.useMemo(() => ({login, logout, register, user}), [login, logout, register, user])

  React.useEffect(() => {
    run(getUser());
  }, [run]);

  if (isLoading || isIdle) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if(isSuccess){
      return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
};

function useAuth(){
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

function useClient(){
    const {user: {token}} = useAuth();
    return React.useCallback((endpoint, config) => client(endpoint, {...config, token}),[token])
}

export { AuthProvider, useAuth, useClient };
