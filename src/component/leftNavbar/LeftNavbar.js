import React , {useState, useEffect} from 'react'
import { SideBarData } from '../../constant/SideBarData';
import './LeftNavbar.css'
import Box from '@mui/material/Box';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function LeftNavbar() {
    const [taskLength , setTaskLength] = useState(0)
    const [importantLength , setImportantLength] = useState(0)
    const [completedLength , setCompletedLength] = useState(0)
    const tasks = useSelector((store) => store.InputDataReducer.tasks)


    useEffect(() => {
        let task = tasks.filter((item) => {
            return item.completed === false
        })

        setTaskLength(task.length)
        
        let importantTask = tasks.filter((item) => {
            return item.important === true && item.completed === false
        })

        setImportantLength(importantTask.length)
        
        let completedTask = tasks.filter((item) => {
            return item.completed === true
        })

        setCompletedLength(completedTask.length)
       
           
    })
  

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
                                    <Box className='sideBarText' component='span' sx={{ mb: 1,pt:'3px', typography: 'subtitle2',color:'blue'}}>
                                    {item.name === 'All Tasks' ?
                                       tasks.length === 0? null : tasks.length 
                                       :null
                                      }
                                      {item.name === 'Task' ?
                                       taskLength === 0? null : taskLength
                                       :null
                                      }
                                      {item.name === 'Important' ?
                                       importantLength === 0? null : importantLength
                                       :null
                                      }
                                      {item.name === 'Completed' ?
                                       completedLength === 0? null : completedLength
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
