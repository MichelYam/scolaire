import React from 'react'

type SelectOptionTypes = {
    value: string,
    label: string
}

type SelectFieldProps = {
    label: string
    name: string;
    onChange:  void;
    Options: readonly SelectOptionTypes[];
    classInput?: string
    value?: string
}


const index = ({ label, name, onChange, classInput, Options, value }: SelectFieldProps) => {
    return (
        <>
            <label htmlFor={name}>{label}:</label>
            <select name={name} id={name} className={classInput} value={value} onChange={() => onChange}>
                {
                    Options.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                }
            </select>
        </>
    )
}

export default index