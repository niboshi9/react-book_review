import * as React from "react";
import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { Container, Box, Button, Grid, Avatar, Typography, Link } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { signupRequest } from "../auth/api";

import ShowErrorMessage from "./ShowErrorMessage";
import { TextArea } from "../auth/TextArea";


const Test = () => {  
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  const [haveError, setHaveError] = useState(false)
  
  const {register, handleSubmit, formState: { errors }} = useForm()
  
  const onSubmit = async (data) => {
    const response = await signupRequest(data.name, data.email, data.password)
    if (response == 200) {
      history.push("/")
    } else {
      setHaveError(true)
      setErrorMessage(response)
    }
  }
  
  const onClick = () => {
    history.push("/signin")
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
          新規登録
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextArea
            id="name"
            label="名前"
            errorsName={errors.name}
            errorsMessage="名前を入力してください"
            validation={register("name", {required: true})}
          />
          
          <TextArea
            id="email"
            label="メールアドレス"
            errorsName={errors.email}
            errorsMessage="メールアドレスを入力してください"
            validation={register("email", {required: true, pattern: /^\S+@\S+$/})}
          />
          
          <TextArea
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
            登録
          </Button>
        </Box>
        <Link variant="body2" onClick={() => onClick()} sx={{ '&:hover': { cursor: 'pointer'}}}>
          ログインはこちら
        </Link>
      </Box>
    </Container>
  )
}

export default Test;