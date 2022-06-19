import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

//Mui 커스텀 스타일드 컴포넌트
export const ValidationTextField = styled(TextField)({
    width: '100%',
    marginBottom: '1rem',

    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#699C1D',
        },
    },
});
