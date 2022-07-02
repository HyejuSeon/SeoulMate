import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

//Mui 커스텀 스타일드 컴포넌트
export const ValidationTextField = styled(TextField)({
    width: '100%',

    marginBottom: '2rem',

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#699C1D',
        },
    },
});
export const CommentTextField = styled(TextField)({
    marginTop: '1rem',
    width: '100%',

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#699C1D',
        },
    },
});
export const CommentTextEditField = styled(TextField)({
    marginTop: '0rem',
    width: '100%',

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#699C1D',
        },
    },
});

export const SearchTextField = styled(TextField)({
    width: '100%',
    marginBottom: '2rem',

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#699C1D',
        },
    },
});
