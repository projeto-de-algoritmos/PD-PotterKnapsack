import * as React from 'react';
import { COLORS } from "../assets/consts/colors";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButtom = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(COLORS.defaultColor),
  '&:hover': {
    backgroundColor: COLORS.buttonHover,
    transition: "0.3s",
  },
}));

export default function CustomizedButton(props) {
  return <CustomButtom {...props} sx={{backgroundColor: props.selected ? COLORS.buttonSelected: COLORS.defaultColor}} size="large" variant="contained" />
}