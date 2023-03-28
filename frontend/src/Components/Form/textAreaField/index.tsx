import React from 'react'

type InputFieldProps = {
    label: string
    name: string;
    classInput?: string
    value?: string
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const index = ({ label, name, handleChange, classInput, value }: InputFieldProps) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea className={classInput} name={name} id={name} value={value} cols={30} rows={10} onChange={(event) => handleChange(event)} />
        </ >

    )
}

export default index