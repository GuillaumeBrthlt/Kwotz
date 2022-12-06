import { observer } from "mobx-react-lite";
import { useUserStore } from "@contexts/UserContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from "@components/Nav";
import {LoginPage} from "@pages/authentification/loginPage";
import {RegisterPage} from "@pages/authentification/registerPage";
import ResetPasswordPage from "@pages/authentification/resetPasswordPage";
import NewPasswordPage from "@pages/authentification/newPasswordPage";
import NewUser from "@pages/profile/profileFormPage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@theme";
import Error404 from "@pages/authentification/error/404";
import { Navigate } from "react-router-dom";
import Dashboard from "@pages/dashboard";
import NewProject from "@pages/projectpage/newProject";


export const App = observer(() => {
  const userStore = useUserStore()

  let localAuthToken = localStorage.auth_token;
  let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null
  if (cookieExists) {
    const auth_token = localStorage.getItem('auth_token');
    const authTokenExists = auth_token !== undefined && auth_token !== null
    if (authTokenExists) {
      userStore.loginUserWithToken(auth_token)
    }
  }

  function PrivateRoute({ component: Page }) {
    if (!userStore.authenticated) {
      return <Navigate to="/login" />;
    }
    return Page;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />}/>}/>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/resetpassword" element={<ResetPasswordPage />}/>
          <Route path="/new_password" element={<NewPasswordPage />}/>
          <Route path="/new_profile" element={<NewUser />} />
          <Route path="/404" element={<Error404/>}/>
          <Route path="/new_project" element={<PrivateRoute component={<NewProject />}/>} />
        </Routes>
      </main>
    </Router>
    </ThemeProvider>
  )
})