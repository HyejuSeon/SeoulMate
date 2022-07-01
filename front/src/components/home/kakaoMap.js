import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import './kakaoMapStyle.css';

const { kakao } = window;

const KakaoMap = () => {
    const [allLandmarks, setAllLandmarks] = useState([]);

    useEffect(() => {
        mapscript();
    }, []);

    const mapscript = async () => {
        const res = await API.get('visited/getall');
        console.log('res.data', res.data);

        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.5546788, 126.9706069),
            level: 8,
        };
        const map = new kakao.maps.Map(container, options);
        // const bounds = new kakao.maps.LatLngBounds();

        const positions = res.data.map((item, idx) => {
            return {
                content: `
                <div class="title">${item.landmark.name}</div>
                <img class="pic" src=${item.landmark_img} />
                <div class="add">${item.landmark.add}</div>`,

                latlng: new kakao.maps.LatLng(
                    `${item.landmark.latitude}`,
                    `${item.landmark.longitude}`,
                ),
            };
        });

        console.log(positions);
        for (var i = 0; i < positions.length; i++) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커의 위치
            });

            // 마커에 표시할 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: positions[i].content, // 인포윈도우에 표시할 내용
            });

            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(
                marker,
                'mouseover',
                makeOverListener(map, marker, infowindow),
            );
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
            return function () {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
            return function () {
                infowindow.close();
            };
        }
    };

    return (
        <div
            id="myMap"
            style={{
                width: '100%',
                height: '100%',
            }}
        ></div>
    );
};

export default KakaoMap;
