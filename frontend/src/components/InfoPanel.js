import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


function InfoPanel(props) {
  const { fillDB } = props;
  return (
    <Box>
      <Paper sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant='h4'>
          Table of Glucose Levels
        </Typography>
        <Typography variant='h6'>
          Supports filtering by user, pagination, and sorting
        </Typography>
        <Button variant="contained" onClick={fillDB}>Fill Database</Button>
      </Paper>
    </Box>
  )
}

export default InfoPanel;