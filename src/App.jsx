import { observer } from "mobx-react-lite";
import { useUserStore } from "@contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage} from "@pages/authentification/loginPage";
import {RegisterPage} from "@pages/authentification/registerPage";
import ConfirmationPage from "@pages/authentification/ConfirmationPage";
import ResetPasswordPage from "@pages/authentification/resetPasswordPage";
import NewPasswordPage from "@pages/authentification/newPasswordPage";
import NewUser from "@pages/profile/profileFormPage";
import EditInformations from "@pages/profile/editProfileInformationsPage";
import EditShipping from "@pages/profile/editProfileShippingPage";
import ProfileOverview from "@pages/profile/detailsProfilePage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@theme";
import Error404 from "@pages/authentification/error/404";
import { Navigate } from "react-router-dom";
import Dashboard from "@pages/dashboard";
import EmailValidation from "@pages/authentification/EmailValidation";
import NewProject from "./pages/projectpage/newProject";
import { ProjectEdit } from "@pages/projectpage/editProject";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { BarLoader } from "react-spinners";
import { NewSupplier } from "@pages/supplier/newSupplier";
import ConsultationPage from "@pages/consultation/ConsultationPage";
import Cookies from "js-cookie";
import { EditPasswordPage } from "@pages/profile/editPasswordPage";
import ProjectOverview from "@pages/projectpage/ProjectOverview"
import { ProjectView } from "@pages/projectpage/ViewProject"
import { Suppliers } from "@pages/suppliers_list/suppliersList";
import SupplierContacts from "@pages/supplier/supplierContact";


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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <main>
          <AppRoutes />
        </main>
      </Router>
    </ThemeProvider>
  )
})

function AppRoutes() {
  const userStore = useUserStore()


  function PrivateRoute({ component }) {
    if (!userStore.authenticated) {
      return <Navigate to="/login" />;
    } else if (!userStore.user.has_profile) {
      return <Navigate to="/profile/create" />;
    }
    return component;
  }

  return(
    <Routes>
      <Route path="/404" element={<Error404/>}/>
      {/* authentification pages */}
      <Route path="/" element={<Navigate to='/login'/>}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/register/confirmed" element={<ConfirmationPage/>}/>
      <Route path="/resetpassword" element={<ResetPasswordPage />}/>
      <Route path="/new_password" element={<NewPasswordPage />}/>
      <Route path="/register/confirmation" element={<EmailValidation/>}/>
      {/* Dashboard */}
      <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />}/>}/>
      {/* projects pages */}
      <Route path="/projects" element={<PrivateRoute component={<ProjectOverview />}/>}/>
      <Route path="/projects/new" element={<PrivateRoute component={<NewProject />}/>}/>
      <Route path="/projects/edit/:id" element={<PrivateRoute component={<ProjectEdit />}/>}/>
      <Route path="/projects/view/:id" element={<PrivateRoute component={<ProjectView />}/>}/>      
      {/* profile pages */}
      <Route path="/profile" element={<ProfileOverview />} />
      <Route path="/profile/create" element={<NewUser/>} />
      <Route path="/profile/informations/edit" element={<PrivateRoute component={<EditInformations />}/>}/>
      <Route path="/profile/shipping/edit" element={<PrivateRoute component={<EditShipping />}/>}/>
      <Route path="/profile/account/edit" element={<PrivateRoute component={<EditPasswordPage/>}/>}/>
      {/* consultations pages */}
      <Route path="/consultation/:id" element={<ConsultationPage />}/>
      {/* suppliers pages */}
      <Route path="/suppliers" element={<PrivateRoute component={<Suppliers/>}/>}/>
      <Route path="/suppliers/new" element={<PrivateRoute component={<NewSupplier />}/>}/>
      <Route path="/suppliers/:id" element={<PrivateRoute component={<SupplierContacts/>}/>}/>
    </Routes>
  )
}