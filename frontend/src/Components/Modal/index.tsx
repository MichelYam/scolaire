import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
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
                <CloseIcon className='modal-close' onClick={onClose} />
                {children}
            </div>
        </>
    )
}
