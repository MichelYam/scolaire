import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import React, { ChangeEventHandler, useState } from 'react'
import { IUser } from '../../../Redux/features/user/userAction'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormControl from '@mui/material/FormControl'
type IProps = {
    nextStep: () => void
    prevStep: () => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    values: IUser
}
const Index = ({ handleChange, values }: IProps) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <h2>Informations personnelles</h2>
            <FormControl sx={{ m: 1, width: '45%' }}>
                <TextField
                    placeholder="Prénom"
                    id='firstName'
                    label="Prénom"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.firstName}
                    margin="normal"
                    fullWidth
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '45%' }}>
                <TextField
                    placeholder="Nom"
                    id='lastName'
                    label="Nom"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.lastName}
                    margin="normal"
                    fullWidth
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '93%' }}>
                <TextField
                    placeholder="Email"
                    id='email'
                    label="Email"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.firstName}
                    margin="normal"
                    fullWidth
                />
            </FormControl >
            <FormControl sx={{ m: 1, width: '93%' }}>
                <TextField
                    type='date'
                    placeholder="Date de naissance"
                    id='dateOFBirth'
                    // label="Date de naissance"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.firstName}
                    margin="normal"
                    fullWidth
                />
            </FormControl >
            <FormControl fullWidth sx={{ m: 1, width: '45%' }}>
                <FilledInput
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    id='password'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, width: '45%' }}>
                <FilledInput
                    placeholder="Confirmation du mot de passe"
                    id='passwordCheck'
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    )
}

export default Index