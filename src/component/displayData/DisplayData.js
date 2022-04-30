import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { FetchData, CompTask, UnCompTask, ImportantTask } from '../../store/action/InputDataAction';
import './DisplayData.css'
import LinearLoading from '../linearLoading/LinearLoading'
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation'
import CircularLoading from '../circularLoading/CircularLoading';
import IconCheckBox from '../iconCheckBox/IconCheckBox';


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

// for tooltip
const BootstrapTooltipupdated = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));





export default function DispalyData({ CompletedFlage, TaskFlage, importantTaskFlage, deleteHandler, deleteOpen, handleDeleteOpen, handleDeleteClose, setCheckEnterFlage, setClickedItem, setInputTask, setIsUpadte, setRightBarOpen, taskDeleteLoading, setTaskDeleteLoading, setRightBarCheck, setUpdatedData, compTaskLoading, setCompTaskLoading, loadingId, setLoadingId }) {

    const dispatch = useDispatch();
    const tasks = useSelector((store) => store.InputDataReducer.tasks)
    const [taskLoading, setTaskLoading] = useState(false)
    const [dispalyTask, setDisplayTask] = useState(true)
    const [dispalyCompTask, setDisplayCompTask] = useState(false)
    const [dispalyImportantTask, setDispalyImportantTask] = useState(true)
    const [importantLoading, setImportantLoading] = useState(false)
    const [importantTaskId, setImportantTaskId] = useState(0)

    // // for delete dialog box
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = (item) => {
    //     setOpen(true);
    //     setTaskDeleteId(item.docId)
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };



    // for show and hide of tasks
    useEffect(() => {
        let task = tasks.filter((item) => {
            return item.completed === false
        })
        if (task.length) {
            setDisplayTask(false)
        } else {
            setDisplayTask(true)
        }

    })

    // for show and hide of completed
    useEffect(() => {
        let task = tasks.filter((item) => {
            return item.completed === true
        })
        if (task.length) {
            setDisplayCompTask(true)
        } else {
            setDisplayCompTask(false)
        }

    })
    // for show and hide of important
    useEffect(() => {
        let task = tasks.filter((item) => {
            return item.important === true && item.completed === false
        })
        if (task.length) {
            setDispalyImportantTask(false)
        } else {
            setDispalyImportantTask(true)
        }

    })


    useEffect(() => {
        dispatch(FetchData(setTaskLoading))
    }, [])

    const completedHandler = (item) => {
        setClickedItem(item)
        let completedTaskData = {
            task: item.task,
            completed: true,
            important: item.important
        }
        dispatch(CompTask(item.docId, completedTaskData, setCompTaskLoading, setLoadingId, setRightBarCheck,))

    }

    const unCompletedHandler = (item) => {
        setClickedItem(item)
        let unCompletedTaskData = {
            task: item.task,
            completed: false,
            important: item.important
        }
        dispatch(UnCompTask(item.docId, unCompletedTaskData, setCompTaskLoading, setLoadingId, setRightBarCheck,))

    }



    const updateHandler = (item) => {
        setUpdatedData(item)
        setInputTask(item.task)
        setIsUpadte(true)
        setRightBarOpen(false)
        setCheckEnterFlage(true)
    }
    const rightBarHandler = (item) => {
        setClickedItem(item)
        setRightBarOpen(true)
        setRightBarCheck(true)
    }
    const rightBarCheckHandler = (item) => {

        setClickedItem(item)
        setRightBarOpen(true)
        setRightBarCheck(false)
    }


    const importantHandler = (item) => {
        setImportantTaskId(item.docId)
        if (item.important === false) {
            let newImportantTask = {
                task: item.task,
                completed: item.completed,
                important: true
            }
            dispatch(ImportantTask(item.docId, newImportantTask, setImportantLoading))

        }

        if (item.important === true) {
            let newImportantTask = {
                task: item.task,
                completed: item.completed,
                important: false
            }
            dispatch(ImportantTask(item.docId, newImportantTask, setImportantLoading))

        }

    }

    if (taskLoading) {
        return <LinearLoading />
    }

    if (TaskFlage) {
        return (
            <div>
                <Box sx={{ px: 4, overflowY: 'auto', }} >

                    {dispalyTask ? null : <Box component='h4' sx={{ my: 1 }}> Tasks  </Box>}
                    {tasks.map((item) => {
                        return (item.completed ? null :
                            <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content" }}>

                                <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }}>{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle={{ paddingTop: '8px', paddingRight: '8px', width: 'fit-content', float: 'right' }} /> : <BootstrapTooltip title="Mark as completed" placement="left"><Checkbox onChange={() => completedHandler(item)} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                                <Grid item xs={5} sm={8} sx={{ color: 'black', textAlign: 'left' }}>
                                    <Box>
                                        <Button className='hoverColor' onClick={() => rightBarHandler(item)} sx={{ color: 'black', textTransform: 'none', display: 'inline-block', backgroundColor: 'inherit', border: 0, width: '100%', padding: '7px 7px', textAlign: 'left' }}>{item.task} </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={5} sm={3} sx={{ textAlign: 'right', minWidth: 'fit-content', }}>
                                    {importantLoading &&
                                        item.docId === importantTaskId ? <IconButton aria-label="delete" color="primary"> <CircularLoading /></IconButton> : <IconCheckBox check={item.important} docId={item.docId} changeHandler={() => importantHandler(item)} />}
                                    <BootstrapTooltipupdated title="Update" placement="bottom"><IconButton aria-label="delete" color="primary" onClick={() => updateHandler(item)}> <EditIcon sx={{ fontSize: 20 }} /></IconButton></BootstrapTooltipupdated>
                                    <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleDeleteOpen={() => handleDeleteOpen(item)} handleDeleteClose={handleDeleteClose} deleteOpen={deleteOpen} />

                                </Grid>

                            </Grid>
                        )
                    })
                    }
                </Box >
            </div >

        )
    }
    if (CompletedFlage) {
        return (
            <div>
                <Box>
                    {dispalyCompTask && <Box component='h4' sx={{ mb: 1, mt: 2 }}> Completed  </Box>}
                    {
                        tasks.map((item) => {
                            return (item.completed &&
                                <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content", }}>
                                    <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }} >{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle={{ paddingTop: '8px', paddingRight: '8px', width: 'fit-content', float: 'right' }} /> : <BootstrapTooltip title="Mark as not completed" placement="left" ><Checkbox onChange={() => unCompletedHandler(item)} defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                                    <Grid item xs={8} sm={9} sx={{ color: 'black', textAlign: 'left' }}>
                                        <Box>
                                            <Button className='hoverColor' onClick={() => rightBarCheckHandler(item)} sx={{ display: 'inline-block', textTransform: 'none', backgroundColor: 'inherit', border: 0, color: 'black', width: '100%', padding: '7px 7px', textAlign: 'left' }}><del>{item.task}</del></Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} sx={{ minWidth: 'fit-content', textAlign: 'right', }}>
                                        <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleDeleteOpen={() => handleDeleteOpen(item)} handleDeleteClose={handleDeleteClose} deleteOpen={deleteOpen} />
                                    </Grid>
                                </Grid >
                            )
                        })
                    }

                </Box>
            </div >

        )
    }

    if (importantTaskFlage) {
        return (
            <div>
                <Box sx={{ px: 4, overflowY: 'auto', }} >

                    {dispalyImportantTask ? null : <Box component='h4' sx={{ my: 1 }}> Important  </Box>}
                    {tasks.map((item) => {
                        return (item.completed ? null :
                            item.important &&
                            <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content" }}>
                                <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }}>{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle={{ paddingTop: '8px', paddingRight: '8px', width: 'fit-content', float: 'right' }} /> : <BootstrapTooltip title="Mark as completed" placement="left"><Checkbox onChange={() => completedHandler(item)} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                                <Grid item xs={5} sm={8} sx={{ color: 'black', textAlign: 'left' }}>
                                    <Box>
                                        <Button className='hoverColor' onClick={() => rightBarHandler(item)} sx={{ color: 'black', textTransform: 'none', display: 'inline-block', backgroundColor: 'inherit', border: 0, width: '100%', padding: '7px 7px', textAlign: 'left' }}>{item.task} </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={5} sm={3} sx={{ textAlign: 'right', minWidth: 'fit-content', }}>
                                    {importantLoading &&
                                        item.docId === importantTaskId ? <IconButton aria-label="delete" color="primary"> <CircularLoading /></IconButton> : <IconCheckBox check={item.important} docId={item.docId} changeHandler={() => importantHandler(item)} />}
                                    <BootstrapTooltipupdated title="Update" placement="bottom"><IconButton aria-label="delete" color="primary" onClick={() => updateHandler(item)}> <EditIcon sx={{ fontSize: 20 }} /></IconButton></BootstrapTooltipupdated>
                                    <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleDeleteOpen={() => handleDeleteOpen(item)} handleDeleteClose={handleDeleteClose} deleteOpen={deleteOpen} />
                                </Grid>

                            </Grid>
                        )
                    })
                    }
                </Box >
            </div >
        )

    }



    return (
        <div>
            <Box sx={{ px: 4, overflowY: 'auto', }} >

                {dispalyTask ? null : <Box component='h4' sx={{ my: 1 }}> Tasks  </Box>}
                {tasks.map((item) => {
                    return (item.completed ? null :
                        <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content" }}>

                            <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }}>{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle={{ paddingTop: '8px', paddingRight: '8px', width: 'fit-content', float: 'right' }} /> : <BootstrapTooltip title="Mark as completed" placement="left"><Checkbox onChange={() => completedHandler(item)} sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                            <Grid item xs={5} sm={8} sx={{ color: 'black', textAlign: 'left' }}>
                                <Box>
                                    <Button className='hoverColor' onClick={() => rightBarHandler(item)} sx={{ color: 'black', textTransform: 'none', display: 'inline-block', backgroundColor: 'inherit', border: 0, width: '100%', padding: '7px 7px', textAlign: 'left' }}>{item.task} </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={5} sm={3} sx={{ textAlign: 'right', minWidth: 'fit-content', }}>
                                {importantLoading &&
                                    item.docId === importantTaskId ? <IconButton aria-label="delete" color="primary"> <CircularLoading /></IconButton> : <IconCheckBox check={item.important} docId={item.docId} changeHandler={() => importantHandler(item)} />}
                                <BootstrapTooltipupdated title="Update" placement="bottom"><IconButton aria-label="delete" color="primary" onClick={() => updateHandler(item)}> <EditIcon sx={{ fontSize: 20 }} /></IconButton></BootstrapTooltipupdated>
                                <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleDeleteOpen={() => handleDeleteOpen(item)} handleDeleteClose={handleDeleteClose} deleteOpen={deleteOpen} />

                            </Grid>

                        </Grid>
                    )
                })
                }

                <Box>
                    {dispalyCompTask && <Box component='h4' sx={{ mb: 1, mt: 2 }}> Completed  </Box>}
                    {
                        tasks.map((item) => {
                            return (item.completed &&
                                <Grid key={item.docId} className='hoverColor' container sx={{ borderBottom: 1, wordWrap: 'break-word', borderColor: '#e0e0e0', minHeight: "fit-content", }}>
                                    <Grid item xs={1} sx={{ minWidth: '30px', textAlign: 'right', }} >{compTaskLoading && item.docId === loadingId ? <CircularLoading customStyle={{ paddingTop: '8px', paddingRight: '8px', width: 'fit-content', float: 'right' }} /> : <BootstrapTooltip title="Mark as not completed" placement="left" ><Checkbox onChange={() => unCompletedHandler(item)} defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} /></BootstrapTooltip>}</Grid>
                                    <Grid item xs={8} sm={9} sx={{ color: 'black', textAlign: 'left' }}>
                                        <Box>
                                            <Button className='hoverColor' onClick={() => rightBarCheckHandler(item)} sx={{ display: 'inline-block', textTransform: 'none', backgroundColor: 'inherit', border: 0, color: 'black', width: '100%', padding: '7px 7px', textAlign: 'left' }}><del>{item.task}</del></Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} sx={{ minWidth: 'fit-content', textAlign: 'right', }}>
                                        <DeleteConfirmation deleteHandler={deleteHandler} taskDeleteLoading={taskDeleteLoading} handleDeleteOpen={() => handleDeleteOpen(item)} handleDeleteClose={handleDeleteClose} deleteOpen={deleteOpen} />
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

