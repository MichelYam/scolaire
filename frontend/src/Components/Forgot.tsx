import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
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
import { useAppDispatch } from '../Redux/store';
import { forgot } from '../Redux/features/user/userAction';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
const Forgot = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(0)
    const dispatch = useAppDispatch();
    const user = sessionStorage.getItem('userToken')

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        dispatch(forgot(email))
        window.navigator.onLine ? setStep(1) : setStep(2)
    }

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value);

    if (user) navigate('/dashboard')
    //   if(user) navigate.push('/dashboard')

    return (


        < div className='login' >
            <div className='row'>
                <div className='half'>
                    <div className='legends'>
                        <img src="../../assets/img/test.svg" alt="" />
                        <h1>Learn@Home</h1>
                        <span>Soutien scolaire à distance</span>
                    </div>
                </div>
                <div className='half'>
                    <div className='container'>
                        <div className='form-content'>
                            <h3 className='title'>Mot de passe oublié ?</h3>
                            <div style={{ paddingTop: '50px', paddingBottom: '100px' }}>
                                <Container component="main" maxWidth="xs">
                                    {step === 0 && (
                                        <div>
                                            <Typography variant="h6" >
                                                Afin de réinitialiser votre mot de passe, veuillez saisir votre adresse e-mail ci-dessous.
                                                Nous vous enverrons un lien pour réinitialiser votre mot de passe.
                                            </Typography>
                                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                <Grid container spacing={2}>
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
                                        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                                            <EmailOutlinedIcon fontSize='large' />
                                            <h2>Vérifier votre email</h2>
                                            <p style={{ color: "rgb(149 149 149)" }}>Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail. Veuillez suivre le lien pour réinitialiser votre mot de passe</p>
                                            <div >
                                                <p>Nous n'avez pas reçu le mail ?<Button sx={{ textTransform: "lowercase" }} onClick={() => setStep(0)}>Renvoyer le lien</Button></p>
                                                <Button sx={{ textTransform: "lowercase" }} onClick={() => navigate('/')}>retour connexion</Button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <i className="fas fa-check-circle" style={{ fontSize: '55px', color: '#3e6947' }}></i></div>
                                            <br />
                                            <p>Please check your internet connection and try again</p>
                                            <div >
                                                <button onClick={() => navigate('/')}>Back to home</button>
                                                <button onClick={() => setStep(0)}>Renvoyer le lien</button>
                                            </div>
                                        </div>
                                    )}
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Forgot
