import React from 'react'
import { SideBarData } from '../../constant/SideBarData';
import './LeftNavbar.css'
import Box from '@mui/material/Box';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function LeftNavbar() {
    const taskLength = useSelector((store) => store.InputDataReducer.taskDetail.length)
  

    return (
        <>
            <Box component='ul' sx={{ mt: 4, p: 0 }}>
                {
                    SideBarData.map((item, index) => {
                        return (
                            <NavLink key={index} to={item.link} className='sideBarLink' activeclassname="active" >
                                <Box component='li' sx={{ listStyleType: 'none', display: 'flex', position: 'relative', backgroundColor: 'inherit', pt: 1, px: { xs: 0, sm: 1 } }}>
                                    <Box component='span' sx={{ position: 'absolute', left: { xs: 14, sm: 21 } }} >
                                        {item.icon}
                                    </Box>
                                    <Box className='sideBarText' component='span' sx={{ mb: 1,pt:'3px', typography: 'subtitle2', mx: 6, minWidth: '100px' }}>
                                        {item.name}
                                    </Box>
                                    <Box className='sideBarText' component='span' sx={{ mb: 1,pt:'3px', typography: 'subtitle2',}}>
                                      {item.name === 'Task' ?
                                       taskLength === 0? null : taskLength
                                       :null
                                      }
                                    </Box>
                                </Box>
                            </NavLink>
                        )
                    })
                }
            </Box>
        </>
    )
}
