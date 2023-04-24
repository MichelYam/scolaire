import React from 'react'

type InputFieldProps = {
    label: string
    name: string;
    classInput?: string
    description?: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const index = ({ label, name, onChange, classInput, description }: InputFieldProps) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea className={classInput} name={name} id={name} value={description} cols={30} rows={10} onChange={(event) => onChange(event)} />
        </ >

    )
}

export default index