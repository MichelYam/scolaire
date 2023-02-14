import React from 'react'

import "./style.css"

interface IModal {
    children: React.ReactNode,
    onClose: () => void,
    open: boolean
}

export const Modal = ({ children, onClose, open }: IModal) => {
    if (!open) return null
    return (
        <>
            <div className='overlay' onClick={onClose} />
            <div className='modal'>
                <button className='modal-close' onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>
    )
}
