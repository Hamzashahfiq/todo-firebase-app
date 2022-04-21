import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


export const SideBarData = [
    {
        name: 'My Day',
        icon: <LightModeOutlinedIcon />,
        link: '/',
    },
    {
        name: 'Important',
        icon: <GradeOutlinedIcon />,
        link: '/important',
    },
    {
        name: 'Planned',
        icon: <PermContactCalendarOutlinedIcon />,
        link: '/planned',
    },
    {
        name: 'Assigned to me',
        icon: <PermIdentityOutlinedIcon />,
        link: '/assigned_to_me',
    },
    {
        name: 'Task',
        icon: <HomeOutlinedIcon/>,
        link: '/task',
    },
]