import React, { useRef, useEffect } from 'react';


type IProps = {
    id: string
    handleDropdown: (value: any) => void
    dropdown: null
    children: React.ReactNode
}

const Index = ({ handleDropdown, id, dropdown, children }: IProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const handleClick = (e: any) => {
            if (!e.target.classList.contains('dropdown-toggle')) {
                handleDropdown(null);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [handleDropdown]);
    return (
        <>
            <button
                onClick={() => handleDropdown(id)}
                ref={ref}
                className='dropdown-toggle'
            >
                Click me
            </button>
            {id === dropdown && (
                // <div className='dropdown'>
                //     <ul>
                //         <li>Lorem, ipsum.</li>
                //         <li>Dolore, eligendi.</li>
                //         <li>Quam, itaque!</li>
                //     </ul>
                // </div>
                { children }
            )}
        </>
    )
}

export default Index