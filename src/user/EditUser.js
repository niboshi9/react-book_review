import * as React from 'react';
import {useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { fetchUserName } from '../auth/api';
import { Container, Box, Button, Grid, Avatar, Typography, Link } from "@mui/material";

import { editUserName } from '../auth/api';
import { TextArea } from '../auth/TextArea';

const EditUser = () => {
  const history = useHistory()
  const [userName, setUserName] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  
  
  const { register, handleSubmit, reset, formState: { errors }} = useForm()
  
  const onSubmit = async (data) => {
    console.log(data)
    setUserName(await editUserName(data.userName))
    reset()
    history.push("/")
  }
  
  useEffect(() => {
    async function fetchData() {
      setUserName(await fetchUserName())
    }
    fetchData()
    console.log("更新！")
  })
  
  
  
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
        <p>現在の名前: {userName}</p>
        
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            id="userName"
            label="新しい名前"
            errorsName={errors.userName}
            errorsMessage="新しい名前を入力してください"
            validation={register("userName", {required: true})}
            placeholder={userName}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            変更する
          </Button>
          {/* <input type="submit" value="変更する" /> */}
        </Box>
        {/* </form> */}
      </Box>
    </Container>
  )
}

export default EditUser;