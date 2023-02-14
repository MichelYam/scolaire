import React from 'react';
import './style.css';

const index = () => {
    return (
        <div className="search">
            <div className="search-container">
                <form action="POST">
                    <div className="search-bar">
                        <input type="text" placeholder="Search a contact" name="search" required />
                        <button className="search-btn" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default index