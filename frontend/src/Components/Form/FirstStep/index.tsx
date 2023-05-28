import React, { ChangeEventHandler } from 'react'

type IProps = {
    nextStep: () => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    values: any
}
const index = ({ nextStep, handleChange, values }: IProps) => {
    return (
        <>
        <h2>Vous êtes...</h2>
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    )
}

export default index