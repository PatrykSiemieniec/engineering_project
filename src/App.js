import React, { useContext } from "react";
import SystemPage from "./pages/SystemPage";
import WelcomePage from "./pages/WelcomePage";
import { Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";
import WorkSpace from "./components/WorkSpace/WorkSpace";
const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Route path="/" exact>
        <WelcomePage></WelcomePage>
      </Route>
      <Route path="/auth" exact>
        <AuthPage />
        {authCtx.isLoggedIn && <Redirect to="/"></Redirect>}
      </Route>
      {authCtx.isLoggedIn &&
        <Route path="/system">
          <SystemPage />
        </Route>
      }
      <Route path="/workspace">
        <WorkSpace />
      </Route>
    </div>
  );
};
export default App;
