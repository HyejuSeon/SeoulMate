import { Container, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import InfoIcon from '@mui/icons-material/Info';
import Profile from "./Profile"
import { UserStateContext } from "../../App"
import * as Api from "../../api";

function Mypage() {

const [user, setUser] = useState(null);
const [editOpen, setEditOpen] = useState(false);


const toggleEditForm = () => {
  setEditOpen((prev) => !prev);
};

// 여기서 user id 가져오면 될듯?

async function getUserData() {
  try {
    const res = await Api.get("/user/current");
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
  <>
  <Profile
  editOpen={editOpen}
  toggleEditForm={toggleEditForm}
/>
  
          <Typography variant="h3" component="div" sx={{fontSize: '30px',mt: 6, mb:2}}>
          <InfoIcon sx={{mx: 1.2, my: -1, fontSize: '40px', color: 'gray'}}/>
          회원 정보
      </Typography>
  </>
 )
}
export default Mypage;