import SoftTypography from '@components/SoftTypography'
import { Grid } from '@mui/material'
import React from 'react'
import SeparatorPreview from '@pages/projectpage/components/SeparatorPreview'

export default function ACDetails({ AC }) {

  function CondensingUnit() {
    switch (coldRoom.condensing_unit) {
      case 'independant':
        return 'groupe de condensation indépendant'
      case 'compressor_rack':
        return 'sur centrale frigorifique'
    }
  }

  function ProdLocation() {
    switch (coldRoom.prod_outside) {
      case true:
        return "A l'extérieur"
      case false:
        return 'en salle des machines'
    }
  }

  function Frequency() {
    switch (coldRoom.entries_frequency) {
      case 'daily':
        return "jour"
      case 'weekly':
        return 'semaine'
      case 'monthly':
        return 'mois'
    }
  }

  return (
    <Grid>
      <SoftTypography variant='h4' mt={2} mb={1}>
        {AC.name}
      </SoftTypography>
      <SoftTypography variant='h5' color="primary">
        Volume de la pièce
      </SoftTypography>
      <SoftTypography variant='body2'>
        Fuide frigorigène: 
      </SoftTypography>
      <SoftTypography variant='h5' color="primary" mt={2}>
        Dimensions
      </SoftTypography>
      <SeparatorPreview />
    </Grid>
  )
}
