import { Button, Grid, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import ProfileEdit from "./ProfileEdit.js";
import Style from '../../styledCompo/MypageStyle/Mypage.module.css'
import { useNavigate } from 'react-router-dom';
import UserInfo from "./UserInfo.js";


function Profile({setEditOpen, editOpen, toggleEditForm, user, updateUser }) {
  const navigate = useNavigate()
    return (
    <CardBox>
        <UpperBox>
        {/* 프로필 편집폼이 열리면 이미지 안보이게 함 */}
        {!editOpen && (
          <div className={Style.imageBox} onClick={() => toggleEditForm()}>
            <img src="https://gradium.co.kr/wp-content/uploads/kiwi-2.jpg" className={Style.profileImg} alt="프로필 이미지"/>
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
                {user?.name} 
              </Typography>

              <Typography
                variant="h6"
                sx={{ marginTop: "20px" }}
                component="div"
              >
                {user?.email}
              </Typography>
              <Stack direction="row" sx={{ mt: 9, justifyContent: "center" }}>
              <Typography
                variant="h2"
                sx={{ color: "#FC8694" }}
                component="span"
              >
              </Typography>
            </Stack>
            </Grid>
          )}

<Grid item xs={6} sx={{ marginTop: "12em" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "30px", textAlign: "center" }}
              component="div"
            >
              <UserInfo />
            </Typography>
          </Grid>
          </Grid>
          </LowerBox>
          
    </CardBox>
    )
    
}


export default Profile

const CardBox = styled.div`
  margin: 0 auto;
  width: 80%;
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

