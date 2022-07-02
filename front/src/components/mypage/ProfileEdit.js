import { useState } from "react";
import * as API from "../../api";
import { Button, Grid, Stack, Typography } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import errorHandler from "../../errorHandler";
const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#6587FF",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#6587FF",
      },
      width: "280px",
    },
  })(TextField);
  
  function ProfileEdit({ toggleEditForm, updateUser, user }) {
  
    const [imageInfo, setImageInfo] = useState(null);
  
    const [form, setForm] = useState({
      name: user?.name,
      prePassword:"",
    });

    const [imageform, setImageForm] = useState({})
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // user 수정 api 호출
      const UserInfoEdit = await API.put('users/update', form);
    
        let formData = new FormData();
        formData.append("name", form.name)
        formData.append("prePassword", form.prePassword)
        formData.append("profile_image", imageInfo);
        // console.log("formData", formData)
      // 이미지를 넣었을 경우에만 업로드 api 호출
      console.log("42번 imageInfo", imageInfo)
        const ImageEdit = API.put('users/update', {...form, 
          file:"https://storage.googleapis.com/landmark_service_images/visited/1656677066968_a132cd26-3b3e-4ef5-8579-fbf6ab4f2303_landMark2jpg"});
    
        
      const Edit = async () => {
        try {
          return await Promise.all([UserInfoEdit, ImageEdit]);
        } catch (error) {
          // errorHandler("회원 정보 수정 오류", error.response.data)
          throw error;
        }
      };
      Edit()
        .then((res) => {
          console.log("res:", res)
          const InfoData = res[0].data;
          console.log("res[1]",res[1])
          const ImageData = res[1]?.data?.updatedUser; // 이미지 안넣었을 땐 res[1]이 null 값.
          

  
          ImageData ? updateUser(ImageData) : updateUser(InfoData);
          alert("회원정보가 정상적으로 변경되었습니다!");
  
          toggleEditForm();
        })
        .catch((error) => {
          errorHandler('이미지수정오류', "이미지 파일이 너무 큽니다. 다시 확인해주세요")
          console.log("error", error.response.data);
        });
    };
  
    return (
      <Grid item xs={5}>
        <form onSubmit={handleSubmit}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ mt: 1.3, alignItems: "center", justifyContent: "center" }}
          >
            <CssTextField
              id="name"
              name="name"
              label="name"
              placeholder={user?.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
  
            <CssTextField
              id="prePassword"
              name="prePassword"
              label="prePassword"
              placeholder="prePassword"
              multiline
              row={3}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
  
          </Stack>
  
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              type="submit"
              disableElevation
              disableRipple
            >
              {" "}
              확인{" "}
            </Button>
            <Button
              type="reset"
              onClick={() => toggleEditForm()}
              variant="outlined"
            >
              {" "}
              취소{" "}
            </Button>
          </Stack>
        </form>
      </Grid>
    );
  }
  export default ProfileEdit;
  
  const UploadBox = {
    border: "1px dashed gray",
    bgcolor: "rgba(0, 0, 0, 0.03)",
    width: "280px",
    alignItems: "center",
    justifyContent: "center",
    p: 1,
  };
  