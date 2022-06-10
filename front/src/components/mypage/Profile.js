import { Button, Grid, IconButton, Stack, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import Style from '../../styledCompo/MypageStyle/Mypage.module.css'
function Profile({setEditOpen, editOpen, toggleEditForm}) {
    return (
    <CardBox>
        <UpperBox>
        {/* 프로필 편집폼이 열리면 이미지 안보이게 함 */}
        {!editOpen && (
          <div className={Style.imageBox} onClick={() => toggleEditForm()}>
            <img src={``} className={Style.profileImg} alt="프로필 이미지"/>
              <span className={Style.editButton}>편집하기</span>
            </div>
        )}
        </UpperBox>
        <LowerBox>
          <Grid container spacing={1}>
          {editOpen ? (
            <ProfileEdit
              updateUser={updateUser}
              user={user}
              toggleEditForm={toggleEditForm}
            />
          ) : (
            <Grid item xs={5} sx={{ textAlign: "center", marginTop: "9em" }}>
              <Typography variant="h3" component="div">
                {user?.nickname}
              </Typography>

              <Typography
                variant="h6"
                sx={{ marginTop: "20px" }}
                component="div"
              >
                {user?.description === "None"
                  ? "설명이 아직 없습니다. 추가해 주세요."
                  : user?.description}
              </Typography>
            </Grid>
            )}
            </Grid>
        </LowerBox>
        
    </CardBox>
    )
    
}


export default Profile

const CardBox = styled.div`
  margin: 0 auto;
  width: 50%;
  height: 470px;
  border: 1px solid #E4E4E4;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  font-family: "Elice Digital Baeum", sans-serif;
`;

const UpperBox = styled.div`
  height: 150px;
  background: #000000;
`;

const LowerBox = styled.div`
  height: 300px;
`;