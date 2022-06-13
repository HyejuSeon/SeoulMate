import { useRef, useState } from 'react';

import {
    UploadWrapper,
    UploadContainer,
    UploadPlaceholder,
    UploadContent,
    UploadButtonContainer,
    UploadButton,
    UploadCancelButton,
} from '../../styledCompo/UploadStyle/UploadStyle';

const Upload = () => {
    const [avatar, setAvatar] = useState(null);

    const filepickerRef = useRef();

    const uploadAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };
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
                <UploadButton>업로드</UploadButton>
                <UploadCancelButton>뒤로가기 </UploadCancelButton>
            </UploadButtonContainer>
        </UploadWrapper>
    );
};

export default Upload;
