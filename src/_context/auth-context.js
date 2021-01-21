import { useAsync } from "hooks/use-async";
import React from "react";
import getUser from "_helpers/get-user";
import * as auth from "_helpers/auth_provider";
import Loading from "components/Loading";
import { client } from "_helpers/client";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

const AuthProvider = (props) => {
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

  const login = (form) => auth.login(form).then((u) => setData(u));
  const register = (form) => auth.register(form).then((u) => setData(u));
  const logout = () => {
    auth.logout();
    setData(null);
  };

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
      const value = {login, logout, register, user};
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
