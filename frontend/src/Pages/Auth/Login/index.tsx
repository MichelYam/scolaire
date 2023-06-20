import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Form from '../../../Components/Form/index';
import { useAppDispatch, useAppSelector } from '../../../Redux/store';
import { selectUser } from '../../../utils/selector';

import './style.css';
import { userLogin, userRegister } from '../../../Redux/features/user/userAction';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

const Index = () => {
    const { userToken, error } = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()
    // const { error } = useAppSelector(selectUser);
    const [data, setData] = useState({
        email: '',
        password: '',
        remember: false,
    })

    if (userToken) return <Navigate to="/dashboard" />;
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.id]: event.target.id === "remember" ? !data.remember : event.target.value,
        })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userLogin(data));
    }

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
                            <h2 className='title'>Connexion</h2>
                            <div className='error-msg'>{error}</div>
                            {/* <Form title="Se connecter" isLogin={true} /> */}
                            <form onSubmit={handleSubmit}>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <TextField
                                        placeholder="Email"
                                        id='email'
                                        label="Email"
                                        size='medium'
                                        onChange={handleChangeValue}
                                        defaultValue={data.email}
                                        margin="normal"
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <TextField
                                        placeholder="Mot de passe"
                                        id='password'
                                        label="Mot de passe"
                                        size='medium'
                                        onChange={handleChangeValue}
                                        defaultValue={data.password}
                                        margin="normal"
                                        fullWidth
                                        type='password'
                                        autoComplete='on'
                                        required
                                    />
                                </FormControl>
                                <Link to={"/forgot"}>
                                    <div className='message-help'>Mot de passe oublié ?</div>
                                </Link>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox onChange={handleChangeValue} />} label="Se sourvenir de moi" />
                                </FormGroup>
                                <div className='form-button'>
                                    <Button type='submit' variant="contained">Se connecter</Button>
                                </div>
                            </form>
                            <hr style={{ margin: "50px 0 10px 0" }} />
                            <Link to={"/register"} className='message-help'>Vous n'avez pas de compte ? cliquez ici</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index