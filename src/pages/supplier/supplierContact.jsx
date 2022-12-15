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
import { observer } from "mobx-react-lite";
import DashboardLayout from "@components/LayoutContainers/DashboardLayout";
import Header from "@components/Header";
import { Grid, Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSupplierStore } from "@contexts/SupplierContext";
import { useUserStore } from "@contexts/UserContext";
import Table from "@components/Tables/DataTable/Table";
import {NewContact} from "@components/NewContact"
import Sidenav from "@components/navbars/Sidenav";


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


  const columns = [
    { name: "Avatar", align: "center" },
    { name: "Prénom", align: "left" },
    { name: "Nom", align: "left" },
    { name: "email", align: "center" },
  ]

  const rows = contacts.length > 0 ? contacts.map(contact => ({
    key: contact.id,
    email: contact.email,
    Prénom: contact.first_name,
    Nom: contact.last_name,
    Avatar: contact.first_name
    
  })) : []

  

  /* function stringToColor(string) {
    let hash = 0;
    let i; */
  
    /* eslint-disable no-bitwise 
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise 
  
    return color;
  } */

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
    width:{xs: 350, md:600}
  };
      
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
        <Grid container justifyContent='center' mt={5}>
            <SoftButton 
              variant="gradient" 
              color="info" 
              size="medium" 
              onClick={() => {handleOpenModal()}}
              sx={
                openModal ? {display: 'none'} : {}
              }
            >
              + Ajouter un contact
            </SoftButton>
          </Grid>
          {newContact ? <NewContact supplier={supplier.id} setNewContact={setNewContact}/> : <></>}
        
        <Grid container my={3}>
          <Table columns={columns} rows={rows} />
        </Grid>
      </DashboardLayout>
    </>
  )
})

export default SupplierContacts;