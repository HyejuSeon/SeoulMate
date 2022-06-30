import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import { ValidationTextField } from '../upload/MuiCustom';
import { useParams } from 'react-router-dom';

const BoardComment = () => {
    const board_id = useParams();
    // console.log(board_id.board_id);

    const [value, setValue] = useState('');
    const [editingValue, setEditingValue] = useState('');
    const [comments, setComments] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const onChange = ({ target: { value } }) => setEditingValue(value);

    const onBlur = () => {
        setValue(editingValue);
    };
    const onKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.target.blur();
        }
    };

    const handleSubmit = (event) => {
        setComments([...comments, { content: value }]);
        event.preventDefault();
    };

    useEffect(() => {
        console.log(value);
    }, [value]);

    const commentUploadHandler = async (e) => {
        const variable = {
            content: value,
            board_id: board_id.board_id,
        };
        await API.post('comment', variable);
        setAllComments([...allComments, { content: value }]);
    };

    useEffect(() => {
        const getAllComments = async () => {
            const res = await API.getQuery(`comment?board_id=${board_id.board_id}`);
            console.log('res', res);
            console.log('res.data', res.data);
            setAllComments(res.data.payloads);
        };
        getAllComments();
    }, []);

    console.log('댓글', allComments);
    const boardCommentRender = allComments.map((item, comments_comment_id) => {
        return (
            <div key={comments_comment_id}>
                <li key={comments_comment_id}>{item.content}</li>
                <button
                    onClick={async (e) => {
                        await API.delete('comment', item.comments_comment_id);
                        await await API.getQuery(`comment?board_id=${board_id.board_id}`).then(
                            (res) => {
                                setAllComments(res.data.payloads);
                            },
                        );

                        // setAllComments(
                        //     allComments.filter(
                        //         (i) => i.comments_comment_id !== item.comments_comment_id,
                        //     ),
                        // );
                    }}
                >
                    삭제
                </button>
                '<button>수정</button>
            </div>
        );
    });
    return (
        <div>
            {boardCommentRender}
            <div className="Comment">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={editingValue}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                    />
                    <button type="submit" onClick={commentUploadHandler}>
                        작성
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BoardComment;
