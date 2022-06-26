import {Box} from '@mui/material';
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'


import {ROUTES} from '../../Route'
import styled from 'styled-components';
import style from '../../styledCompo/SigninStyle/Signin.module.css';
import * as Api from '../../api'
import CssTextField from './CssTextField'
import { validateEmail } from './validateEmail';

function Signin() {
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: '',
    })

    const [confirmPassword, setConfirmpassword] = useState("")
    
    const isPasswordSame = form.password === confirmPassword;
    const checkEmail = form.email
    const isEmailValid = validateEmail(checkEmail);
    console.log(isEmailValid)
    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = form.password.length >= 4;
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    // 이름이 2글자 이상인지 여부를 확인함.


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //user 회원가입 api 호출
            await Api.post("users/registration", form)

        } catch (error) {
            alert("회원가입에 실패했습니다")
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
                {!isEmailValid && (
                    <h1 className={style.warning}>
                        이메일이 유효하지 않습니다.
                    </h1>
                )}
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
                {!isPasswordValid && (
                    <h1 className={style.warning}>
                        비밀번호는 네글자 이상 입력해 주세요!
                    </h1>
                )}
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
                <button type='submit' class={style.signinButton} disabled={!(isEmailValid && isPasswordValid)}>SIGN IN</button>

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

