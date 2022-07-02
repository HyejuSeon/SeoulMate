/*global kakao */
import React, { useEffect, useState } from "react";
import * as API from "../../api";
import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenState, userState, userInfoState } from '../../atom';



export default function Map() {


  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);


  const userB = useRecoilValue(userInfoState);


  async function getUserData() {
    try {
    const res = await API.getQuery(`visited?user_id=${userB.user_id}`);
    setUser(res.data)
    console.log("user:", user)
    } catch (err) {
    console.log("err");
    }
}

useEffect(() => {
  getUserData();
}, []);

function userInfoo () {
  let container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(37.5666805, 126.9784147),
    level: 8,
  };
  if (user) {
    const map = new kakao.maps.Map(container, options);
    const b = {
      ...user.payloads.forEach((el)=> {
        new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: map,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el["landmark"].latitude, el["landmark"].longitude),
          //마커에 hover시 나타날 title
          title: el.name,
        });
      }

      )
    }
    console.log("서울마커:", b)
  }
}


userInfoo()



  return <div id="map" style={{ width: "50vw", height: "60vh", marginLeft:"100px"}}></div>;
  
}