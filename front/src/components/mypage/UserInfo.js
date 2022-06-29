import { Button, Stack} from '@mui/material';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import * as API from '../../api'
import { useContext } from 'react';
import { DispatchContext } from '../../App';
import { LOGOUT } from '../../reducer';
import styled from "styled-components";

function UserInfo({user, updateUser}){
    const navigate = useNavigate()
    const dispatch = useContext(DispatchContext)
    
    function updatePassword() {
        Swal.fire({
            title: '비밀번호 변경',
            text: "변경하고 싶은 비밀번호를 아래에 작성해주세요!",
            icon: 'info',
            input: 'password',
            inputPlaceholder: "새로운 비밀번호",
            showConfirmButton: true,
            confirmButtonText: '변경',
            inputAttributes: {
                autocomplete: 'off'
            },
            showCancelButton: true,
            cancelButtonText: '취소',
            showCloseButton: true,
        }).then(async function(result) {
            const newPassword = result.value

            if(result.isConfirmed){
                if(!newPassword)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '다시한번 확인 해주세요',
                        
                    })
                else{
                    try{
                        //password 변경하기 
                        const res = await API.put("users/update/password", {password: newPassword})
                        updateUser(res.data)
                        Swal.fire({
                            title: '비밀번호 변경',
                            icon: 'success'
                        })
                    }
                    catch(err){
                        console.log('회원 관리 오류')
                    }
                }
                
            }            
        })
    }

    function DeleteUser(){
        console.log(user)
        Swal.fire({
            title: '계정삭제',
            text: "기존의 비밀번호를 적어주세요",
            icon: 'info',
            input: 'password',
            inputPlaceholder: "기존 비밀번호",
            showConfirmButton: true,
            confirmButtonText: '탈퇴',
            showCancelButton: true,
            cancelButtonText: '취소',
            showCloseButton: true,
        }).then(async function(e) {
            const password = {password: e.value}
            if(e.isConfirmed){
                    try{
                        //password 회원탈퇴하기
                        await API.delpw('users/delete', password)
                        Swal.fire({
                            title: '회원탈퇴 완료',
                            icon: 'success'
                        })
                    }
                    catch(err){
                        Swal.fire({
                            title: '회원탈퇴가 정상적으로 이루어지지 않았습니다. ',
                            icon: 'fail'
                        })
                }
                
            }            
        })
    }


    return (
        <Stack direction="row" spacing={2}>
        <Button onClick={() => updatePassword()} variant="contained" color="success" sx={{
                marginLeft: "190px",
                width: "100px",
                height: "50px",
                verticalAlign: 'top',
                fontSize: "10px", 
                }}>비밀번호 변경</Button>
        <Button onClick={() => DeleteUser()} variant="contained" color="error" sx={{
                marginLeft: "190px",
                width: "100px",
                height: "50px",
                verticalAlign: 'top', 
                }}>계정 삭제</Button>
      </Stack>
    )
}

export default UserInfo

