import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


export const SideBarData = [
    {
        name: 'All Tasks',
        icon: <LightModeOutlinedIcon />,
        link: '/',
    },
    {
        name: 'Important',
        icon: <GradeOutlinedIcon />,
        link: '/important',
    },
    {
        name: 'Completed',
        icon: <PermContactCalendarOutlinedIcon />,
        link: '/completed',
    },
    // {
    //     name: 'Assigned to me',
    //     icon: <PermIdentityOutlinedIcon />,
    //     link: '/assigned_to_me',
    // },
    {
        name: 'Task',
        icon: <HomeOutlinedIcon/>,
        link: '/task',
    },
]