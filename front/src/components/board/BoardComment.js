import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import { CommentTextField, CommentTextEditField } from '../upload/MuiCustom';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atom';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

import {
    BoardCommentContainer,
    BoardCommentImg,
    BoardCommentBox,
    BoardBtnBox,
    BoardBtnContainer,
    ToggleButton,
    BoardImgBox,
    BoardUserNameBox,
} from './BoardCommentStyle';

import add from '../../img/Add.png';

const BoardComment = () => {
    const user = useRecoilValue(userInfoState);
    // console.log('user:', user);

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
        getAllComments();
        setComments('');
    };

    const getAllComments = async () => {
        const res = await API.getQuery(`comment?board_id=${board_id.board_id}`);
        // setAllComments(res.data.payloads);
        setAllComments(
            res.data.payloads.map((item) => {
                return { ...item, visible: true };
            }),
        );
    };

    useEffect(() => {
        getAllComments();
    }, []);

    // console.log('댓글', allComments);

    return (
        <>
            {allComments.map((item, idx) => {
                return (
                    <>
                        {!item.visible ? (
                            <BoardBtnContainer key={idx}>
                                <CommentTextEditField
                                    type="text"
                                    label="댓글수정"
                                    size="small"
                                    onChange={(e) => {
                                        setEditComments(e.target.value);
                                    }}
                                />
                                <BoardBtnBox>
                                    <IconButton aria-label="delete" size="medium">
                                        <ThreeSixtyIcon
                                            aria-label="delete"
                                            size="medium"
                                            variant="outlined"
                                            onClick={(e) => {
                                                setAllComments(
                                                    allComments.map((item, CommentsIdx) => {
                                                        if (idx === CommentsIdx) {
                                                            return { ...item, visible: true };
                                                        } else {
                                                            return { ...item, visible: true };
                                                        }
                                                    }),
                                                );
                                            }}
                                            key={idx}
                                        />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="edit" size="small">
                                        <EditIcon
                                            onClick={async (e) => {
                                                // await setAllComments(res.data.payloads);
                                                await API.patch('comment', {
                                                    comment_id: item.comment_id,
                                                    content: editComments,
                                                });
                                                getAllComments();
                                                // const res = await API.getQuery(
                                                //     `comment?board_id=${board_id.board_id}`,
                                                // );
                                            }}
                                        />
                                    </IconButton>
                                </BoardBtnBox>
                            </BoardBtnContainer>
                        ) : (
                            <BoardCommentContainer key={idx}>
                                <BoardImgBox>
                                    <BoardCommentImg src={item.profile_image} />
                                    <BoardUserNameBox>{item.name}</BoardUserNameBox>
                                </BoardImgBox>
                                <BoardCommentBox>{item.content}</BoardCommentBox>
                                {/* {item.created_at.substring(0, 10)} */}
                                {user?.user_id === item.user_id ? (
                                    <BoardBtnBox>
                                        <IconButton aria-label="delete" size="medium">
                                            <DeleteIcon
                                                aria-label="delete"
                                                size="medium"
                                                variant="outlined"
                                                onClick={async (e) => {
                                                    await API.del('comment', item.comment_id);
                                                    getAllComments();
                                                }}
                                            />
                                        </IconButton>
                                        <IconButton color="primary" aria-label="edit" size="small">
                                            <EditIcon
                                                onClick={(e) => {
                                                    setAllComments(
                                                        allComments.map((item, allCommentsIdx) => {
                                                            if (idx === allCommentsIdx) {
                                                                return { ...item, visible: false };
                                                            } else {
                                                                return { ...item, visible: true };
                                                            }
                                                        }),
                                                    );
                                                }}
                                                key={idx}
                                            />
                                        </IconButton>
                                    </BoardBtnBox>
                                ) : (
                                    <></>
                                )}
                            </BoardCommentContainer>
                        )}
                    </>
                );
            })}

            <div className="Comment">
                <BoardBtnContainer>
                    <CommentTextField
                        type="text"
                        value={comments}
                        label="댓글"
                        id="outlined-size-small"
                        defaultValue="Small"
                        size="small"
                        onChange={(e) => {
                            setComments(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: comments && (
                                <ToggleButton src={add} onClick={commentUploadHandler} />
                            ),
                        }}
                    />
                </BoardBtnContainer>
            </div>
        </>
    );
};

export default BoardComment;
