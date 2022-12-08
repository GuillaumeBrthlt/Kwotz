/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
//import react-spinner animation loading
import {PropagateLoader} from 'react-spinners'

import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import { useUserStore } from "@contexts/UserContext";
import { useUserProfileStore } from "@contexts/UserProfileContext";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Footer from "@components/Footer";
import ProfileInfoCard from "@pages/profile/components/ProfileInfoCard";
import ProfilesList from "@pages/profile/components/ProfilesList";
import DefaultProjectCard from "@pages/profile/components/DefaultProjectCard";
import PlaceholderCard from "@pages/profile/components/PlaceholderCard";

// Overview page components
import Header from "@pages/profile/components/Header";

// Data
import profilesListData from "@pages/profile/components/profile-overview/data/profilesListData";

// Images
import homeDecor1 from "@assets/images/home-decor-1.jpg";
import homeDecor2 from "@assets/images/home-decor-2.jpg";
import homeDecor3 from "@assets/images/home-decor-3.jpg";
import team1 from "@assets/images/team-1.jpg";
import team2 from "@assets/images/team-2.jpg";
import team3 from "@assets/images/team-3.jpg";
import team4 from "@assets/images/team-4.jpg";

export default function ProfileOverview() {
  const userProfileStore = useUserProfileStore()
  const {id} = useParams()

useEffect(() => {
  userProfileStore.getProfileDetails(id)
  console.log(userProfileStore.profileDetails)
}, [id])

const e = userProfileStore.profileDetails


  return (
    <div>
    {!userProfileStore.profileDetails.id ? (
      <div className="sweet-loading">
        <PropagateLoader color="#36d7b7"/>
      </div>) : (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="information"
              info={{
                fullName: e.first_name + '' + e.last_name,
                mobile: e.phone_number,
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="coordonnées"
              info={{
                fullName: e.first_name + ' ' + e.last_name,
                mobile: e.phone_number,
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
    )}
    </div>
  );
}


