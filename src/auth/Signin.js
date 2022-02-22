import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { Container, Box, Button, Grid, Avatar, Typography, Link} from "@mui/material";
// import { LockOutlinedIcon } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { signinRequest } from "../auth/api";

import ShowErrorMessage from "./ShowErrorMessage";
import { TextArea } from "../auth/TextArea";


const Signin = () => {  
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const [haveError, setHaveError] = useState(false)
  
  const {register, handleSubmit, formState: { errors }} = useForm()
  
  const onSubmit = async (data) => {
    const response = await signinRequest(data.email, data.password)
    if (response == 200) {
      history.push("/")
    } else {
      setHaveError(true)
      setErrorMessage(response)
    }
  }
  
  const onClick = () => {
    history.push("/signup")
  }
  
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          サインイン
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextArea
            value="test@example.com"
            id="email"
            label="メールアドレス"
            errorsName={errors.email}
            errorsMessage="メールアドレスを入力してください"
            validation={register("email", {required: true, pattern: /^\S+@\S+$/})}
          />
          
          <TextArea
            value="passssswor"
            type="password"
            id="password"
            label="パスワード"
            errorsName={errors.password}
            errorsMessage="パスワードを入力してください"
            validation={register("password", {required: true})}
          />
          
          { haveError && <ShowErrorMessage message={errorMessage}/> }
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            サインイン
          </Button>
        </Box>
        
        {/* <Link to="/signup">登録はこちら</Link> */}
        <Link variant="body2" onClick={() => onClick()} sx={{ '&:hover': { cursor: 'pointer' }}}>
          登録はこちら
        </Link>
      </Box>
    </Container>
  )
}

export default Signin;