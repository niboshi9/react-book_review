import * as React from 'react'
import { CircularProgress, Box, LinearProgress, Grid } from "@mui/material";

export const Progress = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh'
      }}
    >
      <CircularProgress size={100} />
    </Grid>
    
  )
}