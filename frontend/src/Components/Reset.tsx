import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';

import FormControl from '@mui/material/FormControl';
import { reset } from '../Redux/features/user/userAction';
import { useAppDispatch } from '../Redux/store';

import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';

const Reset = () => {
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { token } = useParams()
  const user = sessionStorage.getItem('userToken')
  const [step, setStep] = useState(0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(reset({ password, token }))
    window.navigator.onLine ? setStep(1) : setStep(2)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();
  };
  if (user) navigate('/dashboard')

  return (
    <div className='login'>
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
              <h2 className='title'>Changement de mot de passe</h2>
              <div style={{ paddingTop: '50px', paddingBottom: '100px' }}>
                <Container maxWidth="xs">
                  {step === 0 &&
                    <>
                      <Typography variant="h6">Entrer votre nouveau mot de passe</Typography>
                      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <OutlinedInput
                              name="password"
                              placeholder="Nouveau mot de passe"
                              id='password'
                              autoComplete='on'
                              onChange={handleChange}
                              type={showPassword ? 'text' : 'password'}
                              fullWidth
                              margin="none"
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
                          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <OutlinedInput
                              name="passwordCheck"
                              placeholder="Confirmation du nouveau mot de passe"
                              id='passwordCheck'
                              autoComplete='on'
                              onChange={handleChange}
                              type={showPassword ? 'text' : 'password'}
                              fullWidth
                              margin="none"
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
                          <Button type="submit" fullWidth variant="contained" color="primary" >
                            Submit
                          </Button>
                        </Grid>
                      </form>
                    </>}
                  {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                      <AddTaskIcon fontSize='large' />
                      <h2>Mot de passe réinitialiser</h2>
                      <p style={{ color: "rgb(149 149 149)" }}>votre mot de passe a été réinitialisé avec succès </p>
                      <div >
                        <Button fullWidth variant="contained" sx={{ textTransform: "lowercase", mt: 2 }} onClick={() => navigate('/')}>Continuer</Button>
                        <Stack sx={{ alignItems: "center", cursor: "pointer" }} spacing={1} direction="row">
                          <ArrowBackIcon />
                          <Button sx={{ textTransform: "lowercase" }} onClick={() => navigate('/')}>retour connexion</Button>
                        </Stack >
                      </div>
                    </div>
                  )}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset