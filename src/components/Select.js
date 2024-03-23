"use client"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({data,extra,wid,val,handleChange}) {

  return (
    <Box sx={{ width: wid+"%" }}>
      <FormControl fullWidth>
        <InputLabel id={`${extra}`}>{extra}</InputLabel>
        <Select
          labelId={`${extra}-label`}
          id={`${extra}`}
          value={val}
          label={extra}
          onChange={handleChange}
        >
          {data && data.map((ele,index)=>{
            return <MenuItem key={index} value={ele}>{ele}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
