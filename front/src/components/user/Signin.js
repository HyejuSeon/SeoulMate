import {Box} from '@mui/material';
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'


import {ROUTES} from '../../Route'
import styled from 'styled-components';
import style from '../../styledCompo/SigninStyle/Signin.module.css';
import * as Api from '../../api'
import CssTextField from './CssTextField'

function Signin() {
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        email: '',
        nickname: '',
        password: '',
    })

    const [confirmPassword, setConfirmpassword] = useState("")
    
    const isPasswordSame = form.password === confirmPassword

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //user 회원가입 api 호출
            await Api.post("users/register", form)

        } catch (error) {
            alert(error.response.data)
        }
    }

    return(

        <SigninBody onSubmit={handleSubmit}>
            <SigninBodyUpper>
                <Box>
                    <SigninTitle>Sign In</SigninTitle>
                </Box>
            </SigninBodyUpper>
            
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
                    id="nickname" 
                    name="nickname"
                    label="Nickname" 
                    placeholder='Nickname'
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

const SigninBodyUpper = styled.div`
    display: flex;  
`;

const SigninTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-top: 14px;
`;

