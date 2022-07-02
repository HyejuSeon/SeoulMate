import { Grid, Stack, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styled from "styled-components";
import ProfileEdit from "./ProfileEdit.js";
import Style from '../../styledCompo/MypageStyle/Mypage.module.css'
import { useNavigate } from 'react-router-dom';
import UserInfo from "./UserInfo.js";

function Profile({setEditOpen, editOpen, toggleEditForm, user, updateUser }) {
  const navigate = useNavigate()
  const percentage = 0;
    return (
    <CardBox>
        <UpperBox>
        {/* 프로필 편집폼이 열리면 이미지 안보이게 함 */}
        {!editOpen && (
          <div className={Style.imageBox} onClick={() => toggleEditForm()}>
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
            <Grid item xs={6} sx={{ textAlign: "center", marginTop: "9em" }}>
              <Typography variant="h3" component="div" fontFamily={'Jeju Gothic'}>
                {user?.name} 
              </Typography>

              <Typography
                variant="h6"
                sx={{ marginTop: "20px" }}
                component="div"
                fontFamily={'Jeju Gothic'}
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

      <Grid item xs={6}  sx={{ textAlign: "center" }}>
      <Grid item xs={6}  sx={{marginLeft:"6em"}}>
        <CircularProgressbar value={percentage} 
  text={`레벨${percentage}`} 
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    // Text size
    textSize: '16px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
    textColor: '#f88',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })}
/>
        </Grid>
      <Typography
                variant="h6"
                component="div"
              >
              </Typography>
                    <UserInfo
                    user={user}
                    />
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
  font-family: 'Jeju Gothic', sans-serif;
`;

const UpperBox = styled.div`
  height: 150px;
  background: #CCE5FF;
  font-family: 'Jeju Gothic', sans-serif;
`;

const LowerBox = styled.div`
  height: 300px;
  font-family: 'Jeju Gothic', sans-serif;
`;


