import SoftTypography from '@components/SoftTypography'
import { Grid } from '@mui/material'
import React from 'react'
import SeparatorPreview from '@pages/projectpage/components/SeparatorPreview'

export default function SparePartDetails({ sparePart }) {

  return (
    <Grid mt={3}>
      <SoftTypography variant='h5' color="primary" >
      {sparePart.name}
      </SoftTypography>
      <SoftTypography variant='body2' sx={!sparePart.brand ? {display: 'none'} : {}}>
        Marque: {sparePart.brand}
      </SoftTypography>
      <SoftTypography variant='body2' sx={!sparePart.reference ? {display: 'none'} : {}}>
        Référence: {sparePart.reference}
      </SoftTypography>
      <SoftTypography variant='body2' sx={!sparePart.quantity ? {display: 'none'} : {}}>
        Quantité: {sparePart.quantity}
      </SoftTypography>
      <Grid sx={sparePart.details ? {} : {display: 'none'}} mt={1}>
        {sparePart.details.split('\n').map(line => {
          return (
            <SoftTypography key={line} variant='body2'>
              {line}
            </SoftTypography>
          )
        })}
      </Grid>
    </Grid>
  )
}
