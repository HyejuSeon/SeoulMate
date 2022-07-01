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

    const uploadAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };

        API.post('ai')
            .then((res) => {
                setLandmarkInfo(() => {
                    return res.data;
                });

                const formData = new FormData();
                formData.append('image', e.target.files[0]);
                formData.append('user_id', user.user_id);
                formData.append('landmark_id', res.data.landmark_id);
                API.sendImage('visited/images', formData)
                    .then((res) => {
                        setLandmarkPic(() => {
                            return res.data;
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log('info', landmarkInfo);
        console.log('pic', landmarkPic);
    }, [landmarkInfo, landmarkPic]);

    const uploadHandler = () => {
        avatar
            ? setTimeout(() => {
                  navigate('/uploadResult', {
                      state: { landmarkInfo: landmarkInfo, landmarkPic: landmarkPic },
                  });
              }, 500)
            : Swal.fire({
                  title: '먼저 사진을 업로드 하세요',
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
