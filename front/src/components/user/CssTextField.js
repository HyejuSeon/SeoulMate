import {withStyles} from "@material-ui/core/styles";
import {TextField} from '@mui/material';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'blue',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      }, 
      width: '300px'
    },
})(TextField);

export default CssTextField
