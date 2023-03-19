import React, { Suspense, useContext } from "react";
import SystemPage from "./pages/SystemPage";

import { Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import LogoutPage from "./pages/LogoutPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
const WelcomePage = React.lazy(() => import("./pages/WelcomePage"));
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        <Suspense fallback={<LoadingPage />}>
          <WelcomePage />
        </Suspense>
      </Route>
      <Route path="/auth" exact>
        <AuthPage />
        {authCtx.isLoggedIn && <Redirect to="/"></Redirect>}
      </Route>
      {authCtx.isLoggedIn ? (
        <Route path="/system">
          <Suspense fallback={<LoadingPage />}>
            <SystemPage />
          </Suspense>
        </Route>
      ) : (
        <Route path="/system">
          <LogoutPage />
        </Route>
      )}
      <Route path="/workspace">
        <WorkSpace />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
};
export default App;
