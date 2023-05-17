import React, { useRef } from 'react'

type IProps = {
    children: React.ReactNode
}

const Index = ({ children }: IProps) => {
    const ref = useRef(null)

    return (
        <>
            <div className='block' ref={ref}>
                {children}
            </div>
        </>
    )
}

export default Index