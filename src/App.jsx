import { observer } from "mobx-react-lite";
import { useUserStore } from "@contexts/UserContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {LoginPage} from "@pages/authentification/loginPage";
import {RegisterPage} from "@pages/authentification/registerPage";
import ResetPasswordPage from "@pages/authentification/resetPasswordPage";
import NewPasswordPage from "@pages/authentification/newPasswordPage";
import NewUser from "@pages/profile/profileFormPage";
import EditUser from "@pages/profile/editProfileFormPage";
import ProfileOverview from "@pages/profile/detailsProfilePage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@theme";
import Error404 from "@pages/authentification/error/404";
import { Navigate } from "react-router-dom";
import Dashboard from "@pages/dashboard";
import EmailValidation from "@pages/authentification/EmailValidation";
import NewProject from "./pages/projectpage/newProject";
import { ProjectOverview } from "@pages/projectpage/editProject";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { BarLoader } from "react-spinners";
import { NewSupplier } from "@pages/supplier/newSupplier";
import ConsultationPage from "@pages/consultation/ConsultationPage";
import Cookies from "js-cookie";
import { Suppliers } from "@pages/suppliers_list/suppliersList";

export const App = observer(() => {
  const userStore = useUserStore()

  useEffect(() =>{
    if (!userStore.authenticated) {
      let cookieAuthToken = Cookies.get('authToken');
      if (cookieAuthToken) {
        userStore.loginUserWithToken(cookieAuthToken)
      } else {
        userStore.noLogin()
      }
    }
  })

  
  if (userStore.loading) {
    return (
      <Grid display='flex' height='100vh' justifyContent='center' alignItems='center'>
        <BarLoader color="#17c1e8" />
      </Grid>
    )
  }


  function PrivateRoute({ component }) {
    if (!userStore.authenticated) {
      return <Navigate to="/login" />;
    } else if (!userStore.user.has_profile) {
      return <Navigate to="/new_profile" />;
    }
    return component;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <main>
          <Routes>
            <Route path="/project-edit/:id" element={<PrivateRoute component={<ProjectOverview />}/>}/>
            <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />}/>}/>
            <Route path="/consultation/:id" element={<ConsultationPage />}/>
            <Route path="/" element={<Navigate to='/login'/>}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/resetpassword" element={<ResetPasswordPage />}/>
            <Route path="/new_password" element={<NewPasswordPage />}/>
            <Route path="/new_profile" element={<NewUser/>} />
            <Route path="/new_project" element={<PrivateRoute component={<NewProject />}/>}/>
            <Route path="/new_supplier" element={<PrivateRoute component={<NewSupplier />}/>}/>
            <Route path="/profile" element={<ProfileOverview />} />
            <Route path="/edit_profile" element={<PrivateRoute component={<EditUser />}/>}/>
            <Route path="/404" element={<Error404/>}/>
            <Route path="/confirmation" element={<EmailValidation/>}/>
            <Route path="/suppliers" element={<PrivateRoute component={<Suppliers/>}/>}/>
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  )
})