import { observer } from "mobx-react-lite";
import { useUserStore } from "@contexts/UserContext";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Nav from "@components/Nav";
import {LoginPage} from "@pages/authentification/loginPage";
import {RegisterPage} from "@pages/authentification/registerPage";
import ResetPasswordPage from "@pages/authentification/resetPasswordPage";
import NewPasswordPage from "@pages/authentification/newPasswordPage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@theme";
import Homepage from "@pages/homepage";
import Error404 from "@pages/authentification/error/404";
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/resetpassword" element={<ResetPasswordPage />}/>
          <Route path="/new_password" element={<NewPasswordPage />}/>
          <Route path="/404" element={<Error404/>}/>
          <Route path="/new_project" element={<NewProject />} />
        </Routes>
      </main>
    </Router>
    </ThemeProvider>
  )
})