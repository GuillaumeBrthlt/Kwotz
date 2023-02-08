import SoftTypography from '@components/SoftTypography'
import { Grid } from '@mui/material'
import React from 'react'
import SeparatorPreview from '@pages/projectpage/components/SeparatorPreview'

export default function ColdRoomDetails({ coldRoom }) {

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
      <Grid container mt={2} mb={1}>
        <Grid>
          <SoftTypography variant='h4' color="text">
            Chambre froide:
          </SoftTypography> 
        </Grid>
        <Grid>
          <SoftTypography variant='h4' sx={{marginLeft: 1}}>
            {coldRoom.name}
          </SoftTypography> 
        </Grid>
      </Grid>
      <SoftTypography variant='h5' color="primary">
        Informations générales
      </SoftTypography>
      <SoftTypography variant='body2'>
        Fuide frigorigène: {coldRoom.refrigerant_type}
      </SoftTypography>
      <SoftTypography variant='body2' sx={coldRoom.condensing_unit == 'without' ? {display: 'none'} : {}}>
        Production: {CondensingUnit()}
      </SoftTypography>
      <SoftTypography variant='body2' sx={coldRoom.condensing_unit == 'without' ? {display: 'none'} : {}}>
        Emplacement de la production: {ProdLocation()}
      </SoftTypography>
      <SoftTypography variant='body2' sx={coldRoom.condensing_unit != 'without' ? {display: 'none'} : {}}>
        Ne pas chiffrer la production
      </SoftTypography>
      <SoftTypography variant='h5' color="primary" mt={2}>
        Dimensions
      </SoftTypography>
      <SoftTypography variant='body2' sx={!coldRoom.length ? {display: 'none'} : {}}>
        Longueur: {coldRoom.length} m
      </SoftTypography>
      <SoftTypography variant='body2' sx={!coldRoom.width ? {display: 'none'} : {}}>
        Largeur: {coldRoom.width} m
      </SoftTypography>
      <SoftTypography variant='body2' sx={!coldRoom.height ? {display: 'none'} : {}}>
        Hauteur: {coldRoom.height} m
      </SoftTypography>
      <SoftTypography variant='body2' sx={!coldRoom.volume ? {display: 'none'} : {}}>
        Volume: {coldRoom.volume} m³ 
      </SoftTypography>
      <SoftTypography variant='h5' color="primary" mt={2}>
        Denrées
      </SoftTypography>
      <SoftTypography variant='body2'>
        Denrées stockées: {coldRoom.product_types}
      </SoftTypography>
      <SoftTypography variant='body2' sx={!coldRoom.entries_quantity ? {display: 'none'} : {}}>
        Entrée des denrées: {coldRoom.entries_quantity} kg /{Frequency()} {coldRoom.entry_temperature ? `à ${coldRoom.entry_temperature}°C` : ''}
      </SoftTypography>
      <Grid sx={coldRoom.heat_sources || coldRoom.heat_sources_power ? {} : {display: 'none'}}>
        <SoftTypography variant='h5' color="primary" mt={2}>
          Autres apports de chaleur
        </SoftTypography>
        <SoftTypography fontWeight='medium' variant='body2'>
          description:
        </SoftTypography>
        <SoftTypography variant='body2'>
          {coldRoom.heat_sources}
        </SoftTypography>
        <SoftTypography variant='body2' mt={2}>
          Puissance totale: {coldRoom.heat_sources_power} kW
        </SoftTypography>
      </Grid>
      <Grid sx={coldRoom.comment ? {} : {display: 'none'}}>
        <SoftTypography variant='h5' color="primary" mt={2}>
          Commentaires
        </SoftTypography>
        {coldRoom.comment.split('\n').map(line => {
          return (
            <SoftTypography key={line} variant='body2'>
              {line}
            </SoftTypography>
          )
        })}
      </Grid>
      <SeparatorPreview />
    </Grid>
  )
}
