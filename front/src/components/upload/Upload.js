import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api';

// import recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { landmarkInfoState, userInfoState } from '../../atom';

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

    // const [landmarkInfo, setLandmarkInfo] = useState('');
    // console.log(user);

    // const [landmarkInfo, setLandmarkInfo] = useRecoilState(landmarkInfoState);

    const [landmarkInfo, setLandmarkInfo] = useState('');
    const [landmarkPic, setLandmarkPic] = useState('');

    const uploadAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        console.log('formData', formData.get('file'));
        console.log('formData', e.target.files[0]);

        API.post('/ai')
            .then((res) => {
                setLandmarkInfo(res.data);
                console.log('info', res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        API.sendImage('/visited/images', {
            user_id: user.user_id,
            landmark_id: landmarkInfo.landmark_id,
            image: formData,
        })
            .then((res) => {
                setLandmarkPic(res.data);
                console.log('pic', res.data);
            })
            .catch((err) => {
                console.log(err);
            });
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
                <UploadButton onClick={() => navigate('/uploadResult', { state: landmarkInfo })}>
                    업로드
                </UploadButton>
                <UploadCancelButton onClick={() => navigate('/')}>뒤로가기 </UploadCancelButton>
            </UploadButtonContainer>
        </UploadWrapper>
    );
};

export default Upload;
