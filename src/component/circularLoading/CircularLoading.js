import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoading({size, color,customStyle}) {
  return (
    <Box sx={{color : {color}, display: 'flex'}}  style= {customStyle}>
      <CircularProgress color= 'inherit' style={{position:'absloute',end:'0px'}} size={size || '20px'}/>
    </Box>
  );
}