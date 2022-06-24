import { Container, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import InfoIcon from '@mui/icons-material/Info';
import Profile from "./Profile"
import { UserStateContext } from "../../App"
import * as API from "../../api";
import MapContainer from "../kakao/MapContainer";

function Mypage() {
  
const isLoggedin = sessionStorage.getItem("userToken")
console.log("abc :", isLoggedin)
const [user, setUser] = useState(null);
const [editOpen, setEditOpen] = useState(false);


const toggleEditForm = () => {
  setEditOpen((prev) => !prev);
};

const updateUser = (user) => {
  setUser(user);
};

// 여기서 user id 가져오면 될듯?

async function getUserData() {
  try {
    const res = await API.get("users/current/info");
    setUser(res.data);
    console.log(user)
  } catch (err) {
    console.log("err");
  }
}


useEffect(() => {
  getUserData();
}, []);


  return (
    <Container sx={{ py: 7, mt: 12 }}>
    {/* 회원 프로필 내용 */}
    <Profile
      user={user}
      updateUser={updateUser}
      editOpen={editOpen}
      toggleEditForm={toggleEditForm}
    />
    

    {/* 회원 설정. 정보 */}
    <Typography
      variant="h3"
      component="div"
      sx={{ fontSize: "30px", mt: 6, mb: 2 }}
    >
      <InfoIcon sx={{ mx: 1.2, my: -1, fontSize: "40px", color: "gray" }} />
      내가 다녀온 곳
      
      <MapContainer>
        
      </MapContainer>
    </Typography>

  </Container>
 )
}
export default Mypage;