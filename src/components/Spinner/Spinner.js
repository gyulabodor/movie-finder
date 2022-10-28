import React from 'react'
import {CircularProgress , Backdrop} from '@mui/material'
import { backDropStyle } from './style.js'
export const Spinner = ({isLoading}) => {
    return (
    <Backdrop
        sx={backDropStyle}
        open={isLoading}
    >
        <CircularProgress color="inherit" />
      </Backdrop> 
    )
}
