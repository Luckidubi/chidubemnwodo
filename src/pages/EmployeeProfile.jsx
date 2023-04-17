import { Grid, Paper } from '@mui/material'
import React from 'react'
import EmployeeCard from '../components/EmployeeCard'

function EmployeeProfile() {
  return (
    <Grid
    px="2rem"
    container
    spacing={8}
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    direction="column"
  >
    <Grid item xs={12} container justifyContent="center" alignItems="center">
      <Grid item>
        <Paper elevation={6}>

        <EmployeeCard />
        </Paper>
      </Grid>
    </Grid>

  </Grid>
  )
}

export default EmployeeProfile