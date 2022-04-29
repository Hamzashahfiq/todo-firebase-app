import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import { styled } from '@mui/material/styles';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

export default function IconCheckBox({check,checkTooltipFlage ,changeHandler}) {
  return (
    <>
      <BootstrapTooltipupdated checked = {check}  title={checkTooltipFlage ? "Remove importance." : "Make task as important. "} placement="top"><Checkbox {...label} size = 'small'  onChange = {changeHandler} icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} /></BootstrapTooltipupdated>
    </>
  );
}