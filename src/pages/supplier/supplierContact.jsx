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

// Soft UI Dashboard PRO React components
import SoftButton from "@components/SoftButton";
import SoftTypography from "@components/SoftTypography";
import { observer } from "mobx-react-lite";
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Header from "@components/Header";
import { Card, Divider, Grid, Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useUserStore } from "@contexts/UserContext";
import {NewContact} from "@components/NewContact"
import Sidenav from "@components/navbars/Sidenav";
import { EditSupplier } from "./EditSupplier";
import SoftInput from "@components/SoftInput";
import SoftBox from "@components/SoftBox";
import ContactCard from "@components/ContactCard";



const SupplierContacts = observer(() => {
  const { id } = useParams()
  const supplierStore = useSupplierStore()
  const userStore = useUserStore()
  const [contacts, setContacts]= useState([])
  const [newContact, setNewContact] = useState()

  useEffect(() => {
    if (supplierStore.suppliers) {
      supplierStore.getDetails(userStore.user.id, id)
    }
  }, [])

  useEffect(() => {
    if(supplierStore.details) {
      setContacts(supplierStore.details.supplier_contacts)
    }
  }, [supplierStore.details])


  const [openModal, setOpenModal] = useState(false)

  function handleOpenModal() {
    setOpenModal(true)
  }

  function handleCloseModal() {
    setOpenModal(false)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // A good starting point
    height:'90vh',
    overflowY:'scroll',
    '@media (max-width: 600px)': {
      width: '95%', 
    }
  };

  function FilterContacts(value) {
    let filteredContacts = supplierStore.contacts.filter(contact => contact.first_name.toLowerCase().includes(value.toLowerCase()) || contact.last_name.toLowerCase().includes(value.toLowerCase()))
    setContacts(filteredContacts)
  }
      
  return (
    <>
      <Sidenav />
      <DashboardLayout>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="sending-form"
          aria-describedby="sending-project-form"
        >
          <Grid sx={modalStyle}>
            <NewContact supplier={supplierStore.details} handleCloseModal={handleCloseModal} />
          </Grid>
        </Modal>
        <Header title={supplierStore.details ? supplierStore.details.alias : ''}/>
          {newContact ? <NewContact supplier={supplier.id} setNewContact={setNewContact}/> : <></>}
        <Grid>
          <EditSupplier/>
        </Grid>
        <Card sx={{marginTop: 4}}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              <SoftTypography mx={4} mt={2} variant="h3" color='text'>
                Contacts
              </SoftTypography>
            </Grid>
            <Grid item>
              <SoftButton 
                variant="gradient" 
                color="success" 
                size="large" 
                onClick={() => {handleOpenModal()}}
                sx={
                  openModal ? {display: 'none'} : {marginX: 4, marginTop: 2}
                }
              >
                + Ajouter un contact
              </SoftButton>
            </Grid>
          </Grid>
          
          <Grid item my={2} mx={2} xs={10} md={4}>
            <SoftInput
              placeholder="Rechercher..."
              onChange={(e) => FilterContacts(e.target.value)}
            />
          </Grid>
          <Divider />
          <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
            <Grid item container spacing={2} mb={4} px={2}>
              {contacts.map(contact => {
                return (
                  <Grid item xs={12} md={4} key={contact.id}>
                    <ContactCard contact={contact} />
                  </Grid>
                )
              })}
            </Grid>
          </SoftBox>
        </Card>
      </DashboardLayout>
    </>
  )
})

export default SupplierContacts;