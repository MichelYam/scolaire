import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import React, { ChangeEventHandler } from 'react'

type IProps = {
    nextStep: () => void
    prevStep: () => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    values: any
}
const index = ({ nextStep, prevStep, handleChange, values }: IProps) => {
    return (
        <>
            <h2>Informations complémentaires</h2>
            <FormControl sx={{ m: 1, width: '45%' }}>
                <TextField
                    placeholder="Pays"
                    id='country'
                    label="Pays"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.country}
                    margin="normal"
                    fullWidth
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '45%' }}>
                <TextField
                    placeholder="Ville"
                    id='city'
                    label="Ville"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.city}
                    margin="normal"
                    fullWidth
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '45%' }}>
                <TextField
                    placeholder="Code Postal"
                    id='codePostal'
                    label="Code Postal"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.codePostal}
                    margin="normal"
                    fullWidth
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '45%' }}>
                <TextField
                    placeholder="Téléphone"
                    id='city'
                    label="Téléphone"
                    size='small'
                    onChange={handleChange}
                    defaultValue={values.phone}
                    margin="normal"
                    fullWidth
                />
            </FormControl>
        </>
    )
}

export default index