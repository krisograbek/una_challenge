import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function FilterPanel(props) {
  const { handleFilter, user, handleChange, availableUsers } = props;

  // const users = ['None', 'a', 'b', 'c', 'aaa', 'bbb', 'ccc'];

  // React.useEffect(() => {
  //   fetch(`/api/v1/level?user=${user}`).then(res => res.json()).then(data => {
  //     setGlucoseData(data)
  //   })
  // }, [])


  return (
    <Box >
      <FormControl sx={{ minWidth: 120, mt: 2, mb: 2 }}>
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
        <Button variant="contained" onClick={() => handleFilter(user)}>Update</Button>
      </FormControl>
    </Box>
  );
}

export default FilterPanel