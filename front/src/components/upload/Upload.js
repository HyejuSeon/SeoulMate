import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api';
import Swal from 'sweetalert2';

import './Upload.css';

// import recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState, landmarkPicState } from '../../atom';

import {
    UploadWrapper,
    UploadContainer,
    UploadPlaceholder,
    UploadContent,
    UploadButtonContainer,
    UploadButton,
    UploadCancelButton,
} from './UploadStyle';

const Upload = () => {
    const user = useRecoilValue(userInfoState);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const filepickerRef = useRef();

    const [landmarkPic, setLandmarkPic] = useRecoilState(landmarkPicState);
    const [landmarkInfo, setLandmarkInfo] = useState('');

    const [landmarkPicURL, setLandmarkPicURL] = useState();

    const uploadAvatar = async (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        API.sendImage('ai/images', formData)
            .then((response) => {
                // console.log(response.data);
                return response.data.gcs_url;
            })
            .then((landmarkURL) => {
                setTimeout(() => {
                    API.post('ai', { url: landmarkURL })
                        .then((response) => {
                            // console.log('response.data', response.data);
                            formData.append('user_id', user.user_id);
                            formData.append('landmark_id', response.data.landmark_id);
                            setLandmarkInfo(() => {
                                return response.data;
                            });
                        })
                        .catch((err) => {
                            console.error(err.response);
                        })
                        .then((responseData) => {
                            // formData.append('user_id', user.user_id);
                            // formData.append('landmark_id', responseData);
                            API.sendImage('visited/images', formData)
                                .then((responseData) => {
                                    setLandmarkPic(responseData.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    Swal.fire({
                                        title: 'AI가 분석할 수 없는 사진입니다. 다른 사진을 업로드 해주세요.',
                                        icon: 'warning',
                                        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                                        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
                                    });
                                });
                        });
                }, 3000).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log('error', error);
            });
        setTimeout(() => {}, 500);
        setTimeout(() => {}, 1000);
    };

    // useEffect(() => {
    //     console.log('info', landmarkInfo);
    //     console.log('pic', landmarkPic);
    // }, [landmarkInfo, landmarkPic]);

    const uploadHandler = () => {
        // 서버에 이미지 올라갈때까지 기다리게...정보 다 들어오면 이동
        avatar && landmarkPic && landmarkInfo
            ? setTimeout(() => {
                  navigate('/uploadResult', {
                      state: { landmarkInfo: landmarkInfo, landmarkPic: landmarkPic },
                  });
              }, 500)
            : Swal.fire({
                  title: '먼저 사진을 업로드 하고, AI의 분석 결과를 기다려주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
                  cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
                  confirmButtonText: '확인', // confirm 버튼 텍스트 지정
              });
    };

    // 사진을 올린상태라면 지우고 뒤로가기 , 아니면 걍 뒤로가기
    const uploadCancelButtonHandler = async () => {
        if (avatar) {
            await API.delData(`visited/${landmarkPic.index}`);
            navigate('/');
        } else {
            navigate('/');
        }
    };
    return (
        <UploadWrapper>
            <UploadContainer>
                {!avatar && (
                    <UploadPlaceholder onClick={() => filepickerRef.current.click()}>
                        <span style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                            <p style={{ fontSize: '3.1rem', marginBottom: '1.3rem' }}>+</p>
                            <p>사진을 업로드하고, </p>
                            <p>랜드마크 정보를 확인하세요.</p>
                        </span>
                    </UploadPlaceholder>
                )}
                {avatar && (
                    <UploadContent
                        src={avatar}
                        alt="img"
                        onClick={() => filepickerRef.current.click()}
                    />
                )}
                <input hidden onChange={uploadAvatar} ref={filepickerRef} type="file" />
            </UploadContainer>
            <UploadButtonContainer>
                <UploadButton onClick={uploadHandler}>업로드</UploadButton>
                <UploadCancelButton onClick={uploadCancelButtonHandler}>
                    뒤로가기{' '}
                </UploadCancelButton>
            </UploadButtonContainer>
        </UploadWrapper>
    );
};

export default Upload;
