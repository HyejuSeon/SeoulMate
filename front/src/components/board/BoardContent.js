import React, { useState, useEffect } from 'react';

import { BoardContentContainer, ImgContainer } from './BoardContentStyle';
import * as API from '../../api';

const BoardContent = () => {
    const [allBoardContent, setAllBoardContent] = useState('');

    useEffect(() => {
        const getBoardContent = async () => {
            const res = await API.get('board/8411223d-c4ee-4f13-b4db-efb832b90ade');
            const content = res.data;
            setAllBoardContent(content);
            console.log('content', content);
        };
        getBoardContent();
    }, []);

    return (
        <>
            <BoardContentContainer>
                <ImgContainer src={allBoardContent.landmark_img_id} />
            </BoardContentContainer>
        </>
    );
};

export default BoardContent;
