import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

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

export default function IconCheckBox({ check, changeHandler, docId }) {
  const taskArray = useSelector((store) => store.InputDataReducer.tasks)
  const [toolTipFlageData, setToolTipFlageData] = useState("")
  useEffect(() => {
    let newToolTipData = taskArray.find((item) => {
      return item.docId === docId
    })
    setToolTipFlageData(newToolTipData)
  })
  return (
    <>
      <BootstrapTooltipupdated checked={check} title={docId === toolTipFlageData.docId && toolTipFlageData.important  ? "Remove importance." : "Make task as important. "} placement="left"><Checkbox {...label} size='small' onChange={changeHandler} icon={<GradeOutlinedIcon />} checkedIcon={<GradeIcon />} /></BootstrapTooltipupdated>
    </>
  );
}