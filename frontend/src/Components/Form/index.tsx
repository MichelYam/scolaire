import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser } from '../../utils/selector';
import { userLogin, userRegister } from '../../Redux/features/user/userAction';
import './style.css'
interface IForm {
    title: string,
    isLogin: boolean
}

const Index = ({ title, isLogin }: IForm) => {
    const navigate = useNavigate()
    // const { error } = useAppSelector(selectUser);
    const dispatch = useAppDispatch()
    const [data, setData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        dateOfBirth: "",
        country: "",
        city: "",
        codePostal: "",
        confirmPassword: '',
        remember: false,
    })

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.id]: event.target.id === "remember" ? !data.remember : event.target.value,
        })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLogin) {
            dispatch(userLogin(data));

        } else {
            if (data.password === data.confirmPassword) {
                dispatch(userRegister(data))
                navigate("/login")
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name='email' onChange={handleChangeValue} value={data.email} autoComplete="on" required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Password </label>
                <input type="password" id="password" name='password' onChange={handleChangeValue} value={data.password} autoComplete="on" required />
                <span className='message-help'>Mot de passe oublié ?</span>
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember" onChange={handleChangeValue} />
                <label htmlFor="remember"> Remember me</label>
            </div>
            <div className='form-group-btn'>
                <button className='btn'>{title}</button>
            </div>
        </form>
    )
}

Index.protoTypes = {
    title: PropTypes.string,
    isLogin: PropTypes.bool
}

export default Index