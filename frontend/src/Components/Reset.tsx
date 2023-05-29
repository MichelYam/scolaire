import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Button, Paper, Typography, Container, Grid } from '@material-ui/core';
// import useStyles from './styles';
// import Field from '../Login/Field';
// import { useParams, useHistory } from 'react-router-dom'

// import { reset } from '../../actions/auth';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FilledInput from '@mui/material/FilledInput';

const Reset = () => {
  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  // const history = useHistory()
  // const { token } = useParams()
  const user = sessionStorage.getItem('userToken')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // dispatch(reset({ password: form, token: token }, history))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm(e.target.value);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {

    event.preventDefault();
  };
  // if (user) history.push('/dashboard')

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Container component="main" maxWidth="xs">
        <Paper variant="outlined">
          <Typography variant="h6">Please enter your new password</Typography>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <FilledInput
                name="password"
                placeholder="Confirmation du mot de passe"
                id='password'
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
              <Button type="submit" fullWidth variant="contained" color="primary" >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>

  );
}

export default Reset