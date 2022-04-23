import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoading({size, color}) {
  return (
    <Box sx={{color : {color}, display: 'flex',}}>
      <CircularProgress color= 'inherit' size={size || '20px'}/>
    </Box>
  );
}