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
import DataTable from "@components/Tables/DataTable";
import {NewContact} from "@components/NewContact"
import Sidenav from "@components/navbars/Sidenav";
import {Link} from "@mui/material";
import { Height } from "@mui/icons-material";


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
    width:{xs: 350, md:'60%'},
    height:'auto'
  };

  const ContactsTable = {
    columns: [
      { Header: "nom", accessor: "name" },
      { Header: "email", accessor: "email" },
      { Header: "téléphone", accessor: "phone" },
      { Header: "Adresse", accessor: "address" },
      { Header: "Ville", accessor: "city" },
    ],
  
    rows: 
    contacts.map((contact) =>
      ({
      name: `${contact.first_name} ${contact.last_name}`,
      email: <Link href={`mailto:${contact.email}`}>{contact.email}</Link>,
      phone: <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>,
      address: contact.adress,
      city: contact.city ? `${contact.city} (${contact.zipcode})` : ''
      })
    ),
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
          <DataTable
            table={ContactsTable}
            entriesPerPage={{
              defaultValue: 5,
              entries: [5, 10, 25],
            }}
            canSearch
          />
        </Grid>
      </DashboardLayout>
    </>
  )
})

export default SupplierContacts;