import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';

type IProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const index = ({ onChange }: IProps) => {
    return (
        <div className="search">
            {/* <div className="search-bar"> */}
            <input type="text" placeholder="Search a contact" name="search" onChange={onChange} required />
            <SearchIcon />
            {/* </div> */}
        </div>
    )
}

export default index