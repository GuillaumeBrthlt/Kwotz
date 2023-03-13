import SoftTypography from '@components/SoftTypography'
import { Grid } from '@mui/material'
import React from 'react'
import SeparatorPreview from '@pages/projectpage/components/SeparatorPreview'

export default function ACDetails({ AC }) {

  function OutsideUnit() {
    switch (AC.outside_unit_type) {
      case 0:
        return 'monosplit'
      case 1:
        return 'multisplit'
    }
  }

  function DisplayCurrent() {
    switch (AC.current_type) {
      case 0:
        return "monophasé"
      case 1:
        return 'triphasé'
    }
  }

  return (
    <Grid>
      <Grid container mt={2} mb={1}>
        <Grid>
          <SoftTypography variant='h4' color="text">
            Pièce à climatiser:
          </SoftTypography> 
        </Grid>
        <Grid>
          <SoftTypography variant='h4' sx={{marginLeft: 1}}>
            {AC.name}
          </SoftTypography> 
        </Grid>
      </Grid>
      <SoftTypography variant='h5' color="primary" mt={2}>
        Dimensions
      </SoftTypography>
      <SoftTypography variant='body2' sx={AC.surface ? {} : {display: 'none'}}>
        Surface de la pièce: {AC.surface} m²
      </SoftTypography>
      <SoftTypography variant='body2' sx={AC.height ? {} : {display: 'none'}}>
        Volume de la pièce: {AC.height} m
      </SoftTypography>
      <SoftTypography variant='body2'>
        Volume de la pièce: {AC.volume} m³
      </SoftTypography>
      <SoftTypography variant='h5' color="primary" mt={2}>
        Caractéristiques
      </SoftTypography>
      <SoftTypography variant='body2'>
        unité extérieur: {OutsideUnit()} 
      </SoftTypography>
      <SoftTypography variant='body2'>
        alimentation électrique: {DisplayCurrent()} 
      </SoftTypography>
      <SoftTypography variant='body2'>
        type d'unité intérieur: {AC.inside_unit_type} 
      </SoftTypography>
      <Grid sx={AC.accesories ? {} : {display:'none'}}>
        <SoftTypography variant='h5' color="primary" mt={2}>
          Accessoires
        </SoftTypography>
        <SoftTypography variant='body2'>
          {AC.accesories} 
        </SoftTypography>
      </Grid>
      <Grid sx={AC.comment ? {} : {display:'none'}}>
        <SoftTypography variant='h5' color="primary" mt={2}>
          Informations
        </SoftTypography>
        <SoftTypography variant='body2'>
          {AC.comment} 
        </SoftTypography>
      </Grid>
      <SeparatorPreview />
    </Grid>
  )
}
