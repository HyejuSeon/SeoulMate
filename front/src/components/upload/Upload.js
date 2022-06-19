import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api';

// import recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../atom';

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

    const [landmarkInfo, setLandmarkInfo] = useState('');
    const [landmarkPic, setLandmarkPic] = useState('');

    // const uploadAvatar = (e) => {
    //     const reader = new FileReader();
    //     if (e.target.files[0]) {
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    //     reader.onload = (readerEvent) => {
    //         setAvatar(readerEvent.target.result);
    //     };

    //     API.post('ai')
    //         .then((res) => {
    //             setLandmarkInfo(res.data);
    //             console.log('info', res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     const formData = new FormData();
    //     formData.append('image', e.target.files[0]);
    //     formData.append('user_id', user.user_id);
    //     formData.append('landmark_id', landmarkInfo.landmark_id);

    //     API.sendImage('visited/images', formData)
    //         .then((res) => {
    //             setLandmarkPic(res.data);
    //             console.log('pic', res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

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

    // const getLandMarkInfo = async () => {
    //     try {
    //         const res = await API.post('ai');
    //         return res.data;
    //     } catch (err) {
    //         console.log('err');
    //         return undefined;
    //     }
    // };

    // const getLandMarkPic = async (file, user_id, landmarkId) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', file);
    //         formData.append('user_id', user_id);
    //         formData.append('landmark_id', landmarkId);
    //         const res = await API.sendImage('visited/images', formData);
    //         return res.data;
    //     } catch (err) {
    //         console.log('err');
    //         return undefined;
    //     }
    // };
    // const uploadAvatar = async (e) => {
    //     const reader = new FileReader();
    //     if (e.target.files[0]) {
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    //     reader.onload = (readerEvent) => {
    //         setAvatar(readerEvent.target.result);
    //     };

    //     const landmarkInfo = await getLandMarkInfo();
    //     console.log('landmarkInfo', landmarkInfo);
    //     if (!landmarkInfo) {
    //         return console.log('landmarkInfo is empty');
    //     }

    //     const landMarkPic = await getLandMarkPic(
    //         e.target.files[0],
    //         user.user_id,
    //         landmarkInfo.landMark_id,
    //     );
    //     if (!landMarkPic) {
    //         return console.log('landMarkPic is empty');
    //     }
    //     setLandmarkPic(landmarkPic);
    // };

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
                <UploadButton
                    onClick={() =>
                        navigate('/uploadResult', {
                            state: { landmarkInfo: landmarkInfo, landmarkPic: landmarkPic },
                        })
                    }
                >
                    업로드
                </UploadButton>
                <UploadCancelButton onClick={() => navigate('/')}>뒤로가기 </UploadCancelButton>
            </UploadButtonContainer>
        </UploadWrapper>
    );
};

export default Upload;
