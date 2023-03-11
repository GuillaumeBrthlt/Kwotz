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
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useSupplierStore } from "../../contexts/SupplierContext";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import SoftInput from "@components/SoftInput";
import SoftButton from "@components/SoftButton";

// Soft UI Dashboard PRO React example components
import { useUserStore } from "@contexts/UserContext";
import { useEffect } from "react";
import { Modal } from "@mui/material";

export const EditSupplier = observer(() => {
  const [alias, setAlias] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const supplierStore = useSupplierStore()
  const userStore = useUserStore()

  useEffect(() => {
    if (supplierStore.details) {
      setAlias(supplierStore.details.alias)
      setAddress(supplierStore.details.address)
      setCity(supplierStore.details.city)
      setZipcode(supplierStore.details.zipcode)
    }

  }, [supplierStore.details])

    const supplierData = {
      "supplier": {
        "alias": alias,
        "address": address,
        "city": city,
        "zipcode": zipcode,
      }
    }
    
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSupplier()
    }
  }

  const handleSubmit = () => {
    supplierStore.updateSupplier(supplierData, supplierStore.details.id, userStore.user.id)
    handleOpenModal()
  }

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
    height:'auto',
    overflowY:'scroll',
    '@media (max-width: 600px)': {
      width: '95%', 
    }
  };

  return (
    <>
      <SoftBox mt={3} mb={4}>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="sending-form"
          aria-describedby="sending-project-form"
        >
          <Grid sx={modalStyle}>
            <Card>
              <SoftTypography textAlign='center' sx={{marginY: 4}}>
                La modification à bien été prise en compte !
              </SoftTypography>
              <SoftButton 
                width='50%' 
                color='primary' 
                variant='gradient' 
                onClick={() => {handleCloseModal()}} 
                sx={{mb:2, width: '50%', marginX: 'auto'}}
              >
                Fermer
              </SoftButton>
            </Card>
          </Grid>
        </Modal>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2} lineHeight={1} mt={2}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Alias
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="alias fournisseur" 
                    value={alias}
                    onChange={e => setAlias(e.target.value)}
                    onSubmit={handleKeyDown}
                    />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Adresse
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="Adresse fournisseur" 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Ville
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="ville" 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                  <Divider />
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Code Postal
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput 
                    type="text"
                    placeholder="code postal" 
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />    
                  <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0}>
                    <SoftButton
                      variant="gradient" 
                      color="info"
                      onClick={handleSubmit}
                    >
                      Modifier
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </>
  );
})