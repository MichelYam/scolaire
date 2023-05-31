import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Form from '../../../Components/Form/index';
import { useAppSelector } from '../../../Redux/store';
import { selectUser } from '../../../utils/selector';

import './style.css';

const Index = () => {
    const { userToken, error } = useAppSelector(selectUser)
    console.log(error)
    if (userToken) return <Navigate to="/dashboard" />;
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
                            <Form title="Se connecter" isLogin={true} />
                            <hr />
                            <Link to={"/register"} className='message-help'>Vous n'avez pas de compte ? cliquez ici</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Index