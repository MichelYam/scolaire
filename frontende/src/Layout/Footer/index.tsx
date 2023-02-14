import React, { useState } from 'react'


import "./style.css"

const Index = () => {
    const date = new Date().getFullYear()
    return (
        < div className='footer' >
            <h2>Copyright {date} © Learn@Home</h2>
        </div >
    )
}

export default Index