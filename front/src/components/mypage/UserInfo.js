import { Button, Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import * as Api from '../../api'
import { useContext } from 'react';
import { DispatchContext } from '../../App';
import { LOGOUT } from '../../reducer';
import styled from "styled-components";

function UserInfo({updateUser}){
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
                        const res = await Api.put("users/update", {password: newPassword})
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
        Swal.fire({
            title: '계정 탈퇴',
            text: "정말 탈퇴 하시겠습니까?",
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: '네',
            showCancelButton: true,
            cancelButtonText: '아니요',
            focusCancel: true,
            showCloseButton: true,
        }).then(async function(result) {
            if(result.isConfirmed){
                try{
                    //user 계정 삭제 
                    await Api.delete("users")
                    sessionStorage.removeItem("userToken")
                    dispatch({
                        type: LOGOUT      
                    })

                    Swal.fire({
                        title: '회원 탈퇴되었습니다!',
                        text: '다음에 만나요',
                        icon: 'success'
                    })
                    
                    navigate('/')
                } catch(err){
                    console.log('회원 관리 오류')
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

