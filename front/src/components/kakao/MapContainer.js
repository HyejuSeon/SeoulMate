/*global kakao */
import React, { useEffect, useState } from "react";
import * as API from "../../api";
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../atom';

export default function Map() {


  const [user, setUser] = useState();



  const userB = useRecoilValue(tokenState);
  const [kakaouser, setkakaoUser] = useState();


  async function getUserData() {
    try {
    const res = await API.getQuery(`visited?user_id=${userB.user_id}`);
    setUser(res.data)
    } catch (err) {
    console.log("err");
    }
}

useEffect(() => {
  getUserData();
}, []);

function userInfo () {
  let container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(37.5666805, 126.9784147),
    level: 5,
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


userInfo()



  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
  
}