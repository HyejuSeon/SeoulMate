import {Box} from '@mui/material';
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


import styled from 'styled-components';
import style from '../../styledCompo/SigninStyle/Signin.module.css';
import * as Api from '../../api'
import CssTextField from './CssTextField'

function Signin() {
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
    })

    const [confirmPassword, setConfirmpassword] = useState("")
    
    const isPasswordSame = form.password === confirmPassword

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //user 회원가입 api 호출
            await Api.post("users/registration", form)
            navigate('/login');

        } catch (error) {
            alert("회원가입에 실패했습니다")
        }
    }

    return(

        <SigninBody onSubmit={handleSubmit}>

            
            <Box class={style.inputEmail}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="email" 
                    name="email"
                    label="Email" 
                    placeholder='Email'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#BBD6FF'}
                    }}
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <Box class={style.inputNickname}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="name" 
                    name="name"
                    label="name" 
                    placeholder='name'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#BBD6FF'}
                    }}
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <Box class={style.inputPassword}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="password" 
                    name="password"
                    label="Password"
                    type = "password"
                    placeholder='Password'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#BBD6FF'}
                    }}
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <Box class={style.inputPasswordconfirm}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="confirmPassword" 
                    name="confirmPassword"
                    label="Confirm Password"
                    type = "Password"
                    placeholder='Confirm Password'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#BBD6FF'}
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmpassword(e.target.value) }
                />
                {!isPasswordSame && (
                    <h1 className={style.warning}>
                        비밀번호가 일치하지 않습니다.
                    </h1>
                )}
            </Box>

            <div class={style.signinButtonbox}>
                <button type='submit' class={style.signinButton}>SIGN IN</button>

                <Box class={style.otherButtonbox}>
                   
                </Box>
            </div>
            
        </SigninBody>
    )
}

export default Signin;

const SigninBody = styled.form`
`;


