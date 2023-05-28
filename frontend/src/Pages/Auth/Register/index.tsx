import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../../../Redux/features/user/userAction';
import { useAppDispatch } from '../../../Redux/store';


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './style.css';

import FirstStep from '../../../Components/Form/FirstStep';
import SecondStep from '../../../Components/Form/SecondStep';
import ThirdStep from '../../../Components/Form/ThirdStep';


const steps = ['Vous êtes...', 'Informations personnelles', ''];

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


  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleStep = (step: number) => () => {
  //   setActiveStep(step);
  // };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
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
      // dispatch(userRegister(newData))
      // navigate("/")
    }
  }

  // const values = newUser;

  const handleStep = (step: number) => {
    switch (step) {
      case 1:
        return <FirstStep nextStep={handleNext} handleChange={(event) => handleChangeStatut(event)} values={newUser} />
      case 2:
        return <SecondStep nextStep={handleNext} prevStep={handlePrev} handleChange={(event) => handleChange(event)} values={newUser} />
      case 3:
        return <ThirdStep nextStep={handleNext} prevStep={handlePrev} handleChange={(event) => handleChange(event)} values={newUser} />
      default:
        throw new Error("Unknow Step")
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
              <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                  {[...Array(3)].map((label, index) => (
                    <Step key={index} completed={completed[index]}>
                      {/* <StepButton color="inherit" onClick={handleStep(index)}> */}
                      <StepButton color="inherit">
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {allStepsCompleted() ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <form onSubmit={handleSubmit}>
                        {handleStep(activeStep + 1)}
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                          {/* Step {activeStep + 1} */}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handlePrev}
                            sx={{ mr: 1 }}
                            variant="contained"
                          >
                            Retour
                          </Button>
                          <Box sx={{ flex: '1 1 auto' }} />
                          {activeStep + 1 !== steps.length ?
                            <Button type='button' variant="contained" onClick={handleNext} sx={{ ml: 1 }}>
                              Suivant
                            </Button>
                            : <Button type='submit' variant="contained" sx={{ ml: 1 }}>
                              S'inscire
                            </Button>}
                        </Box>
                      </form>
                    </React.Fragment>
                  )}
                </div>
              </Box>
              {/* <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
              </form> */}
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