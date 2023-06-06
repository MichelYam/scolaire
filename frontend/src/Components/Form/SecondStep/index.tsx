import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import React, { ChangeEventHandler, useState } from 'react'
import { IUser } from '../../../Redux/features/user/userAction'

import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormControl from '@mui/material/FormControl'
import { DateField } from '@mui/x-date-pickers/DateField'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type IProps = {
    nextStep: () => void
    prevStep: () => void
    setDate: () => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    values: IUser
}
const Index = ({ handleChange, prevStep, nextStep, values, setDate }: IProps) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'));
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
            <FormControl sx={{ m: 1, width: '45%' }}>
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
            <FormControl sx={{ m: 1, width: '45%' }}>
                {/* <TextField
                    type='date'
                    placeholder="Date de naissance"
                    id='dateOFBirth'
                    label="Date de naissance"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.firstName}
                    variant="filled"
                    margin="normal"
                    fullWidth
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField']}>
                        <DateField
                            id='dateOFBirth'
                            label="Date de naissance"
                            onChange={setDate}
                            margin="normal"
                            size='small'
                            format="DD/MM/YYYY"
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl >
            <FormControl fullWidth sx={{ m: 1, width: '45%' }}>
                <FilledInput
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    autoComplete='on'
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
                    autoComplete='on'
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
            <Button variant="contained" onClick={prevStep} sx={{ ml: 1 }}>
                Retour
            </Button>
            <Button variant="contained" onClick={nextStep} sx={{ ml: 1 }}>
                Suivant
            </Button>
        </>
    )
}

export default Index