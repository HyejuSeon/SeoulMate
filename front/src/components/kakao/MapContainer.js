/*global kakao */
import React, { useEffect, useState } from "react";
import { markerdata } from "./makerData";
import * as API from "../../api";
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atom';

export default function Map() {
  useEffect(() => {
    mapscript();
  }, []);

  const [user, setUser] = useState(null);


  // const user = useRecoilValue(userInfoState);
  const [kakaouser, setkakaoUser] = useState();

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };

  
    //map
    const map = new kakao.maps.Map(container, options);
    
    markerdata.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
      });
    });
  };

  async function getUserData() {
    try {
    const res = await API.get("users/current/info");
    setUser(res.data.user_id)
    } catch (err) {
    console.log("err");
    }
}



useEffect(() => {
  const kakaoUser = () => {
  try{
  const res = API.getQuery('visited?user_id=d810a62e-7100-4fa8-9383-11c0cf9db695')
  setkakaoUser(res.data) 
  } catch(err) {
    console.log("err");
  }
}

  kakaoUser();
}, []);



console.log("user:", user)  
console.log("kakaouser:", kakaouser)  




  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
  
}