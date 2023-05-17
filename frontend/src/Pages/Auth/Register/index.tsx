import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../../../Redux/features/user/userAction';
import { useAppDispatch } from '../../../Redux/store';
import './style.css';

const Index = () => {
  const [role, setRole] = useState("")
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    country: "",
    city: "",
    codePostal: "",
    bio: "",
    passwordCheck: "",
    role: "",
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [event.target.id]: event.target.value,
    })
  }
  const handleChangeStatut = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (newUser.password === newUser.passwordCheck) {
      const newData = {
        ...newUser,
        role: role
      }
      console.log(newData)
      dispatch(userRegister(newData))
      navigate("/")
    }
  }
  return (
    <div className='register'>
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
              <h2 className='title'>Inscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <input type="text" name='firstName' id='firstName' placeholder="Prénom" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <input type="text" name='lastName' id='lastName' placeholder="Nom" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date de naissance</label>
                  <input type="date" name='dateOfBirth' id='dateOfBirth' onChange={handleChange} placeholder="JJ/MM/AAAA" required />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirmation du mot de passe</label>
                  <input
                    id="passwordCheck"
                    name="passwordCheck"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='register-statut'>
                  <div className="form-group">
                    <label htmlFor="student">
                      <div className='register-img'>
                        <img src="./assets/img/reading.png" alt="image student" />
                      </div>
                      élève
                    </label>
                    <input
                      id="student"
                      name="userStatut"
                      type="radio"
                      value="student"
                      onChange={handleChangeStatut}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tutor">
                      <div className='register-img'>
                        <img src="./assets/img/teacher.png" alt="image teacher" />
                      </div>
                      Tuteur
                    </label>
                    <input
                      id="tutor"
                      name="userStatut"
                      type="radio"
                      value="tutor"
                      onChange={handleChangeStatut}
                    />
                  </div>
                </div>
                <div className='register-btn'>
                  < button className="btn btn-success btn-block">S'inscrire</button>
                </div>
              </form>
              <hr />
              <Link to={"/"} className='message-help'>Vous avez déjà un compte? cliquez ici</Link>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
export default Index