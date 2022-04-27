import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import CircularLoading from '../circularLoading/CircularLoading';





// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// for tooltip
const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

export default function DeleteConfirmation({title, text, deleteHandler, taskDeleteLoading,deleteOpen, handleDeleteOpen, handleDeleteClose}) {
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <span>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}

            <BootstrapTooltip title="Delete" placement="bottom"><IconButton aria-label="delete" color="error" onClick={handleDeleteOpen}><DeleteIcon sx={{ fontSize: 20 }} /></IconButton></BootstrapTooltip>
            <Dialog
                open={deleteOpen}
                keepMounted
                onClose={handleDeleteClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{ title ||"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {text|| 'Do you want to delete it?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    {taskDeleteLoading? <Button ><CircularLoading color = "red" /></Button> : <Button onClick={deleteHandler} sx={{color:'red'}}>Delete</Button>}
                </DialogActions>
            </Dialog>
        </span>
    );
}
