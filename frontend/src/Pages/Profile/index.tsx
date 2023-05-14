import React, { useState } from 'react'
import { useAppSelector } from '../../Redux/store'
import { selectUser } from '../../utils/selector'
import Button from '@mui/material/Button'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
const Index = () => {

    const { userInfo } = useAppSelector(selectUser)
    const [edit, isEdit] = useState(false)
    return (
        <div className='profile'>
            <h2>Mon Profile</h2>
            <div className='profile-avatar'>
                <div className='block align-items-center'>
                    <div className='flex align-items-center'>
                        <Avatar sx={{ bgcolor: deepOrange[500], height: '70px', width: '70px' }}>N</Avatar>
                        <div className='flex flex-direction-column'>
                            <p>{[userInfo?.firstName, userInfo?.lastName].join(" ")}</p>
                            <p>{userInfo?.role}</p>
                            <p>Paris, France</p>
                        </div>
                    </div>
                    <Button variant="outlined" sx={{ width: "75px", height: "25px", padding:"15px", fontSize: "12px", borderRadius: "18px" }}>
                        Edit
                        <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                    </Button>
                </div>
            </div>
            <div className='profile-info'>
                <div className='block flex-direction-column'>
                    <div className='flex space-between align-items-center'>
                        <h3>Information personnelle</h3>
                        <Button variant="outlined" sx={{ width: "75px", height: "25px", padding:"15px", fontSize: "12px", borderRadius: "18px" }}>
                            Edit
                            <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                        </Button>
                    </div>
                    <div className='flex'>
                        <div className='profile-controle width-half'>
                            <p>Nom</p>
                            <p>{userInfo?.lastName}</p>
                        </div>
                        <div className='profile-controle width-half'>
                            <p>Prénom</p>
                            <p>{userInfo?.firstName}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='profile-controle width-half'>
                            <p>Email</p>
                            <p>{userInfo?.email}</p>
                        </div>
                        <div className='profile-controle width-half'>
                            <p>Téléphone</p>
                            <p>01 80 52 64 75</p>
                        </div>
                    </div>
                    <div className='profile-controle'>
                        <p>Bio</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, laborum ratione earum repudiandae omnis quasi numquam ipsum rem! Modi velit ducimus id, provident voluptatibus inventore officiis accusantium eos esse molestiae.</p>
                    </div>
                </div>
            </div>
            <div className='profile-address'>
                <div className='block flex-direction-column'>
                    <div className='flex space-between align-items-center'>
                        <h3>Adresse</h3>
                        <Button variant="outlined" sx={{ width: "75px", height: "25px", padding:"15px", fontSize: "12px", borderRadius: "18px" }}>
                            Edit
                            <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                        </Button>
                    </div>
                    <div className='flex'>
                        <div className='profile-controle width-half'>
                            <p>Pays</p>
                            <p>Paris</p>
                        </div>
                        <div className='profile-controle width-half'>
                            <p>Ville</p>
                            <p>France</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='profile-controle width-half'>
                            <p>Code Postal</p>
                            <p>75015</p>
                        </div>
                        {/* <div className='profile-controle width-half'>
                            <p>Code Postal</p>
                            <p>75015</p>
                        </div> */}
                    </div>
                    <div className='profile-controle'>
                        <p>Bio</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, laborum ratione earum repudiandae omnis quasi numquam ipsum rem! Modi velit ducimus id, provident voluptatibus inventore officiis accusantium eos esse molestiae.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index