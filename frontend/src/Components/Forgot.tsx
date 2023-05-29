import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
// import { Button, Paper, Typography, Container, Grid } from '@material-ui/core';
// import useStyles from './styles';
// import Field from '../Login/Field';
// import { forgot } from '../../actions/auth';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


const Forgot = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState("");
    const [step, setStep] = useState(0)
    const dispatch = useDispatch();
    const user = sessionStorage.getItem('userToken')

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        // dispatch(forgot({email: form}))
        window.navigator.onLine ? setStep(1) : setStep(2)
    }

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setForm(e.target.value);

    //   if(user) navigate.push('/dashboard')

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <Container component="main" maxWidth="xs">
                <Paper variant="outlined">
                    {step === 0 && (
                        <div>
                            <Typography variant="h6" >Entrez votre email pour réinitialiser votre mot de passe</Typography>
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* <Field name="email" label="Email Address" handleChange={handleChange} type="email" /> */}
                                    <TextField
                                        placeholder="Email"
                                        id='email'
                                        label="Email"
                                        size='small'
                                        type='email'
                                        onChange={handleChange}
                                        defaultValue={""}
                                        margin="normal"
                                        fullWidth
                                    />
                                    <Button type="submit" fullWidth variant="contained" color="primary" > Submit </Button>
                                </Grid>
                            </form>
                        </div>
                    )}

                    {step === 1 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <i className="fas fa-check-circle" style={{ fontSize: '55px', color: '#3e6947' }}></i></div>
                            <br />
                            <p>A password reset link has been sent to your email. Please follow the link to reset your password</p>
                            <div >
                                {/* <button className={styles.button} onClick={() =>history.push('/')}>Back to home</button> */}
                                <button onClick={() => setStep(0)}>Resend link</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <i className="fas fa-check-circle" style={{ fontSize: '55px', color: '#3e6947' }}></i></div>
                            <br />
                            <p>Please check your internet connection and try again</p>
                            <div >
                                {/* <button className={styles.button} onClick={() =>history.push('/')}>Back to home</button> */}
                                <button onClick={() => setStep(0)}>Resend link</button>
                            </div>
                        </div>
                    )}
                </Paper>
            </Container>
        </div>

    );
}

export default Forgot