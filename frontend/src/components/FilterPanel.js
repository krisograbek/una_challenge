import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function FilterPanel(props) {
  const { handleFilter, user, handleChange, availableUsers } = props;

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h6">Select User</Typography>
          <FormControl sx={{ minWidth: 120, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="User"
              onChange={handleChange}
            >
              {availableUsers.map((name, i) => {
                return (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={() => handleFilter(user)}>Update</Button>
        </Grid>
      </Grid>
    </Box >
  );
}

export default FilterPanel