import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { selectUser } from '../../utils/selector'
import Button from '@mui/material/Button'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { updateUserProfile } from '../../Redux/features/user/userAction';

const Index = () => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector(selectUser)
    // const [editAvatar, setEditAvatar] = useState(false)
    // const [editAddress, setEditAddress] = useState(false)
    // const [editInfo, setEditInfo] = useState(false)
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState({
        avatar: userInfo?.profileImageUrl || "",
        lastName: userInfo?.lastName || "",
        firstName: userInfo?.firstName || "",
        email: userInfo?.email || "",
        city: userInfo?.city || "",
        bio: userInfo?.bio || "",
        phone: userInfo?.phone || "",
        country: userInfo?.country || "",
        codePostal: userInfo?.codePostal || "",
    })
    const editRef = useRef(null)
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [event.target.id]: event.target.value,
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(updateUserProfile(userData))
        console.log("submited")
        console.log(userData)
        setEdit(false)
    }
    return (
        <div className='profile'>
            {/* <h2>Mon Profile</h2>
            <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEdit(!edit)}>
                Edit
                <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
            </Button> */}
            {/* <div className='profile-avatar'>
                <div className='block align-items-center'>
                    {editAvatar ? <>
                        <input type="file" />
                        <div className='flex space-between'>
                            <Button variant="outlined" color="error" onClick={() => setEditAvatar(!editAvatar)}>
                                Annuler
                            </Button>
                            <Button variant="contained">
                                Sauvegarder
                            </Button>
                        </div>
                    </> :
                        <>
                            <div className='flex align-items-center'>
                                <Avatar sx={{ bgcolor: deepOrange[500], height: '70px', width: '70px' }}>N</Avatar>
                                <div className='flex flex-direction-column'>
                                    <p>{[userInfo?.firstName, userInfo?.lastName].join(" ")}</p>
                                    <p>{userInfo?.role}</p>
                                    <p>Paris, France</p>
                                </div>
                            </div>
                            <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEditAvatar(!editAvatar)}>
                                Edit
                                <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                            </Button>
                        </>}
                </div>
            </div>
            <div className='profile-info'>
                <div className='block flex-direction-column'>
                    {editInfo ?
                        <>
                            <h3>Information personnelle</h3>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="lastName" label="Nom" variant="outlined" value={userData.lastName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="firstName" label="Prénom" variant="outlined" value={userData.firstName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="email" label="Email" variant="outlined" value={userData.email} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="phone" label="Téléphone" variant="outlined" value="01 80 52 64 75" />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='profile-controle'>
                                <FormControl>
                                    <TextField id="bio" label="Bio" variant="outlined" multiline onChange={handleChangeValue} value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, laborum ratione earum repudiandae omnis quasi numquam ipsum rem! Modi velit ducimus id, provident voluptatibus inventore officiis accusantium eos esse molestiae." />
                                </FormControl>
                            </div>
                            <div className='flex space-between'>
                                <Button variant="outlined" color="error" onClick={() => setEditInfo(!editInfo)}>
                                    Annuler
                                </Button>
                                <Button variant="contained" >
                                    Sauvegarder
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <div className='flex space-between align-items-center'>
                                <h3>Information personnelle</h3>
                                <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEditInfo(!editInfo)}>
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
                        </>
                    }
                </div>
            </div >
            <div className='profile-address'>
                <div className='block flex-direction-column'>
                    {editAddress ?
                        <>

                            <h3>Adresse</h3>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="country" label="Pays" variant="outlined" value={userData.firstName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="city" label="Ville" variant="outlined" value={userData.lastName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="codePostal" label="Code Postal" variant="outlined" value={userData.email} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex space-between'>
                                <Button variant="outlined" color="error" onClick={() => setEditAddress(!editAddress)}>
                                    Annuler
                                </Button>
                                <Button variant="contained">
                                    Sauvegarder
                                </Button>
                            </div>
                        </>
                        :
                        <>
                            <div className='flex space-between align-items-center'>
                                <h3>Adresse</h3>
                                <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEditAddress(!editAddress)}>
                                    Edit
                                    <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                                </Button>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Pays</p>
                                    <p>France</p>
                                </div>
                                <div className='profile-controle width-half'>
                                    <p>Ville</p>
                                    <p>Paris</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Code Postal</p>
                                    <p>75015</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div> */}
            {edit ? <>
                <div className='flex space-between align-items-center'>
                    <h2>Mon Profile</h2>
                    <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEdit(!edit)}>
                        Annuler
                    </Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='profile-avatar'>
                        <div className='block align-items-center'>
                            <Avatar sx={{ bgcolor: deepOrange[500], height: '70px', width: '70px' }}>
                                <input type="file" />
                            </Avatar>
                        </div>
                    </div>
                    <div className='profile-info'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Information personnelle</h3>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="lastName" label="Nom" variant="outlined" value={userData.lastName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="firstName" label="Prénom" variant="outlined" value={userData.firstName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="email" label="Email" variant="outlined" value={userData.email} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="phone" label="Téléphone" variant="outlined" value="01 80 52 64 75" />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='profile-controle'>
                                <FormControl>
                                    <TextField id="bio" label="Bio" variant="outlined" multiline onChange={handleChangeValue} value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, laborum ratione earum repudiandae omnis quasi numquam ipsum rem! Modi velit ducimus id, provident voluptatibus inventore officiis accusantium eos esse molestiae." />
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className='profile-address'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Adresse</h3>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="country" label="Pays" variant="outlined" value={userData.country} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="city" label="Ville" variant="outlined" value={userData.city} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="codePostal" label="Code Postal" variant="outlined" value={userData.codePostal} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-between'>
                        <Button variant="outlined" color="error" onClick={() => setEdit(!edit)}>
                            Annuler
                        </Button>
                        <Button variant="contained" type='submit'>
                            Sauvegarder
                        </Button>
                    </div>
                </form>
            </> :
                <>
                    <div className='flex space-between align-items-center'>
                        <h2>Mon Profile</h2>
                        <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEdit(!edit)}>
                            Edit
                            <BorderColorOutlinedIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
                        </Button>
                    </div>
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
                        </div>
                    </div>
                    <div className='profile-info'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Information personnelle</h3>
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
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Pays</p>
                                    <p>{userInfo?.country}</p>
                                </div>
                                <div className='profile-controle width-half'>
                                    <p>Ville</p>
                                    <p>{userInfo?.city}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Code Postal</p>
                                    <p>{userInfo?.codePostal}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}

export default Index