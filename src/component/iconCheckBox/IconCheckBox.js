import * as React from 'react';
import {useState} from 'react' 
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import IconButton from '@mui/material/IconButton';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function IconCheckBox() {
  const [isCheck, setIsCheck] = useState(false)
  return (
    <>
    {isCheck?
      <Tooltip title="Remove importance" placement="bottom"><IconButton aria-label="Checked" color="primary" onClick={()=>setIsCheck(false)}><GradeIcon sx={{ fontSize: 20,color:'#2564cf' }} /></IconButton></Tooltip>
      :<Tooltip title="Mark as important" placement="bottom"><IconButton aria-label="Unchecked" color="primary" onClick={()=>setIsCheck(true)}><GradeOutlinedIcon  sx={{ fontSize: 20,color:'#767678' }}/></IconButton></Tooltip>
    }
    
      {/* <Checkbox {...label} icon={ <Tooltip title="Mark as important" placement="bottom"><GradeOutlinedIcon /></Tooltip>} checkedIcon={<Tooltip title="Remove importance" placement="bottom"><GradeIcon /></Tooltip>} /> */}
    </>
  );
}