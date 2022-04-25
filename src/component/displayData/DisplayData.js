import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { FetchData, CompTask, UnCompTask, TaskDeleteHandler, showRightBarTask, UnImportantTask, ImportantTask } from '../../store/action/InputDataAction';
import './DisplayData.css'
import LinearLoading from '../linearLoading/LinearLoading'
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation'
import CircularLoading from '../circularLoading/CircularLoading';


// Checkbox Lable
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// BootstrapTooltip code
const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));




export default function DispalyData({ setInputTask, setIsUpadte, setRightBarOpen, setRightBarCheck, setUpdatedData }) {

    const dispatch = useDispatch();
    const tasks = useSelector((store) => store.InputDataReducer.tasks)
    const [taskLoading, setTaskLoading] = useState(false)
    const [taskDeleteLoading, setTaskDeleteLoading] = useState(false)
    const [taskDeleteId, setTaskDeleteId] = useState(0)
    const [dispalyTask, setDisplayTask] = useState(true)
    const [compTaskLoading, setCompTaskLoading] = useState(false)
    const [loadingId, setLoadingId] = useState(false)



    // for delete dialog box
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (item) => {
        setOpen(true);
        setTaskDeleteId(item.docId)
    };

    const handleClose = () => {
        setOpen(false);
    };



    // for show and hide of tasks
    useEffect(() => {
        if (tasks.length === 0) {
            setDisplayTask(true)
        } else
            tasks.find((item) => {
                if (item.completed === false) {
                    setDisplayTask(false)
                }
                else {
                    setDisplayTask(true)
                }
            })
    }, [tasks])


    useEffect(() => {
        dispatch(FetchData(setTaskLoading))
    }, [])

    const completedHandler = (item) => {
        let completedTaskData = {
            task: item.task,
            completed: true,
            important: item.important
        }
        dispatch(CompTask(item.docId, completedTaskData, setRightBarOpen, setCompTaskLoading,setLoadingId))
    }
    const unCompletedHandler = (item) => {
        let unCompletedTaskData = {
            task: item.task,
            completed: false,
            important: item.important
        }
        dispatch(UnCompTask(item.docId, unCompletedTaskData, setRightBarOpen,setCompTaskLoading,setLoadingId))

    }

    const deleteHandler = () => {
        dispatch(TaskDeleteHandler(taskDeleteId, setRightBarOpen, setTaskDeleteLoading, handleClose))
    }

    const updateHandler = (item) => {
        setUpdatedData(item)
        setInputTask(item.task)
        setIsUpadte(true)
        setRightBarOpen(false)
    }
    const rightBarHandler = (item) => {
        dispatch(showRightBarTask(item))
        setRightBarOpen(true)
        setRightBarCheck(true)
    }
    const rightBarCheckHandler = (item) => {
        dispatch(showRightBarTask(item))
        setRightBarOpen(true)
        setRightBarCheck(false)
    }

    // const unCompImportantHandler = (item,checked) => {

    //     if (checked === false) {
    //         let newImportantTask = {
    //             ...item,important:false
    //         }
    //         dispatch(UnImportantTask(newImportantTask))
    //         return
    //     }else{
    //         let newImportantTask = {
    //             ...item,important:true
    //         }
    //         dispatch(UnImportantTask(newImportantTask))
    //         return
    //     }


    // }

    // const importantHandler = (item) => {
    //     if (checked === false) {
    //         let newImportantTask = {
    //             ...item,important:false
    //         }
    //         dispatch(ImportantTask(newImportantTask))
    //         return
    //     }else{
    //         let newImportantTask = {
    //             ...item,important:true
    //         }
    //         dispatch(ImportantTask(newImportantTask))
    //         return
    //     }

    // }

    if (taskLoading) {
        return <LinearLoading />
    }

    return (
        <div>
            <Box sx={{ px: 4, overflowY: 'auto', }} >

                {dispalyTask ? null : <Box component='h4' sx={{ my: 1 }}> Tasks  </Box>}
                {tasks.map((item) => {
                    return (item.completed ? null :
                        <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content" }}>

                            <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }}>{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle = {{paddingTop:'8px',paddingRight:'8px',width:'fit-content',float: 'right'}}/> : <BootstrapTooltip title="Mark as completed" placement="left"><Checkbox onChange={() => completedHandler(item)} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                            <Grid item xs={9} sx={{ color: 'black', textAlign: 'left' }}>
                                <Box>
                                    <Button className='hoverColor' onClick={() => rightBarHandler(item)} sx={{ color: 'black', textTransform: 'none', display: 'inline-block', backgroundColor: 'inherit', border: 0, width: '100%', padding: '7px 7px', textAlign: 'left' }}>{item.task} </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'right', minWidth: 'fit-content', }}>
                                <Tooltip title="Update" placement="bottom"><IconButton aria-label="delete" color="primary" onClick={() => updateHandler(item)}> <EditIcon sx={{ fontSize: 20 }} /></IconButton></Tooltip>
                                <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleClickOpen={() => handleClickOpen(item)} handleClose={handleClose} open={open} />
                                {/* <Checkbox {...label}  onChange={(e)=>unCompImportantHandler(item,e.target.checked)} icon={ <Tooltip title="Mark as important" placement="bottom"><GradeOutlinedIcon/></Tooltip>} checkedIcon={<Tooltip title="Remove importance" placement="bottom"><GradeIcon /></Tooltip>} /> */}

                            </Grid>

                        </Grid>
                    )
                })
                }

                <Box>
                    {tasks.length === 0 ? null : <Box component='h4' sx={{ mb: 1, mt: 2 }}> Completed  </Box>}
                    {
                        tasks.map((item) => {
                            return (item.completed &&
                                <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content", }}>
                                    <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }} >{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle = {{paddingTop:'8px',paddingRight:'8px',width:'fit-content',float: 'right'}}/> :<BootstrapTooltip title="Mark as not completed" placement="left" ><Checkbox onChange={() => unCompletedHandler(item)} defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                                    <Grid item xs={9} sx={{ color: 'black', textAlign: 'left' }}>
                                        <Box>
                                            <Button className='hoverColor' onClick={() => rightBarCheckHandler(item)} sx={{ display: 'inline-block', textTransform: 'none', backgroundColor: 'inherit', border: 0, color: 'black', width: '100%', padding: '7px 7px', textAlign: 'left' }}><del>{item.task}</del></Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} sx={{ minWidth: 'fit-content', textAlign: 'right', }}>
                                        <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleClickOpen={() => handleClickOpen(item)} handleClose={handleClose} open={open} />
                                    </Grid>
                                </Grid >
                            )
                        })
                    }

                </Box>

            </Box >
        </div >
    )
}


