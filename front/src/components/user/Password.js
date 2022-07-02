import { Box } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { ROUTES } from '../../Route';
import style from '../../styledCompo/PasswordStyle/Password.module.css';
import * as API from '../../api';
import CssTextField from './CssTextField';

function Password() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('users/reset/password', {
                email,
            });
            console.log(res);
            Swal.fire({
                position: 'top-center',
                title: '비밀번호 리셋 성공!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });
            /* const user = res.data;
      const jwtToken = user.token;
      console.log(res.data);
      sessionStorage.setItem("userToken", jwtToken); */
            // navigate("/");
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <PasswordBody onSubmit={handleSubmit}>
            <Box class={style.inputEmail}>
                <CssTextField
                    style={{ width: '30%' }}
                    id="standard-basic"
                    label="Email"
                    placeholder="Email"
                    variant="standard"
                    InputLabelProps={{
                        style: { color: '#BBD6FF' },
                    }}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>

            <div class={style.signinButtonbox}>
                <button type="submit" class={style.signinButton}>
                    비밀번호 재설정
                </button>

                <Box class={style.otherButtonbox}>
                    <Link to={'/login'} class={style.loginButton}>
                        Back to Login page
                    </Link>
                    <Link to={'/login'} class={style.forgotpasswordButton}>
                        Back to Signin page
                    </Link>
                </Box>
            </div>
        </PasswordBody>
    );
}

export default Password;

const PasswordBody = styled.form``;

const PasswordBodyUpper = styled.div`
    display: flex;
`;

const PasswordTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-top: 14px;
`;
const PasswordTitle2 = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding-top: 4px;
`;
