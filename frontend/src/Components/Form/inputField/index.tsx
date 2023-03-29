import React from 'react'

type InputFieldProps = {
    label: string
    type: string
    name: string;
    classInput?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
/**
 * 
 * @param props.label label of input
 * @param props.type type of input
 * @param props.name name of input
 * @param props.classInput custom css 
 * @param props.onChange update the new value
 * @returns the label and input
 */
const InputField = ({ label, type, name, onChange, classInput }: InputFieldProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input className={classInput} name={name} id={name} type={type} onChange={(event) => onChange(event)} required />
        </div>
    )
}

export default InputField