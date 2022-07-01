import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import { CommentTextField } from '../upload/MuiCustom';
import { useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import {
    BoardCommentContainer,
    BoardCommentImg,
    BoardCommentBox,
    BoardBtnBox,
} from './BoardCommentStyle';

const BoardComment = () => {
    const board_id = useParams();

    const [comments, setComments] = useState([]);
    const [allComments, setAllComments] = useState([]);

    const [editable, setEditable] = useState(false);
    const [editComments, setEditComments] = useState('');

    const commentUploadHandler = async (e) => {
        const variable = {
            content: comments,
            board_id: board_id.board_id,
        };
        await API.post('comment', variable);
    };

    useEffect(() => {
        const getAllComments = async () => {
            const res = await API.getQuery(`comment?board_id=${board_id.board_id}`);
            setAllComments(res.data.payloads);
        };
        getAllComments();
    }, [board_id.board_id, editable]);

    console.log('댓글', allComments);

    return (
        <>
            {allComments.map((item, idx) => {
                return (
                    <>
                        {editable === true ? (
                            <div key={idx}>
                                <input
                                    type="text"
                                    label="댓글"
                                    // value={item.comments_content}
                                    onChange={(e) => {
                                        setEditComments(e.target.value);
                                    }}
                                />

                                <button
                                    onClick={async () => {
                                        await API.patch('comment', {
                                            comment_id: item.comment_id,
                                            content: editComments,
                                        });
                                        await setEditable(false);
                                    }}
                                >
                                    확인
                                </button>
                                <button
                                    onClick={() => {
                                        setEditable(false);
                                    }}
                                >
                                    취소
                                </button>
                            </div>
                        ) : (
                            <BoardCommentContainer key={idx}>
                                <BoardCommentImg src={item.profile_image} />
                                <BoardCommentBox>{item.content}</BoardCommentBox>
                                <BoardBtnBox>
                                    <IconButton aria-label="delete" size="medium">
                                        <DeleteIcon
                                            aria-label="delete"
                                            size="medium"
                                            variant="outlined"
                                            onClick={async (e) => {
                                                await API.del('comment', item.comment_id);
                                                await API.getQuery(
                                                    `comment?board_id=${board_id.board_id}`,
                                                ).then((res) => {
                                                    setAllComments(res.data.payloads);
                                                });
                                            }}
                                        />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="edit" size="small">
                                        <EditIcon
                                            onClick={() => {
                                                setEditable(true);
                                            }}
                                        />
                                    </IconButton>
                                </BoardBtnBox>
                            </BoardCommentContainer>
                        )}
                    </>
                );
            })}

            <div className="Comment">
                <form>
                    <input
                        type="text"
                        value={comments}
                        onChange={(e) => {
                            setComments(e.target.value);
                        }}
                    />
                    <button type="submit" onClick={commentUploadHandler}>
                        작성
                    </button>
                </form>
            </div>
        </>
    );
};

export default BoardComment;
