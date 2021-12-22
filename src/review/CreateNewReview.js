import * as React from 'react';
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { TextArea } from '../auth/TextArea';
import { Avatar, Container, Box, Button, Typography, TextField } from "@mui/material";
import GradingIcon from '@mui/icons-material/Grading';

import { postNewReview } from '../auth/api';

const CreateNewReview = () => {
  const [isPostNew, setIsPostNew] = useState(false)
  const { register, handleSubmit, formState: { errors }} = useForm()
  
  const onSubmit = (data) => {
    setIsPostNew(postNewReview(data.title, data.url, data.detail, data.review))
  }
  
  return (
    <>
    {
      isPostNew ? (
        <Redirect to="/"/>
      ) : (
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
            <GradingIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            新規投稿作成
          </Typography>
          
          
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              id="title"
              label="タイトル"
              errorsName={errors.title}
              errorsMessage="タイトルを入力してください"
              validation={register("title", { required: true})}
            />
            
            <TextArea
              id="url"
              label="URL"
              errorsName={errors.url}
              errorsMessage="urlを入力してください"
              validation={register("url", { required: true})}
            />
            
            <TextArea
              id="detail"
              label="作品詳細"
              errorsName={errors.detail}
              errorsMessage="詳細を入力してください"
              validation={register("detail", { required: true})}
            />
            
            {/* <TextArea
              id="review"
              label="レビュー"
              errorsName={errors.review}
              errorsMessage="レビューを入力してください"
              validation={register("review", { required: true})}
            /> */}
            <TextField
              id="review"
              label="レビュー"
              error={Boolean(errors.review)}
              helperText={Boolean(errors.review) && "レビューを入力してください"}
              {...register("review", { required: true})}
              margin="normal"
              fullWidth
              multiline
              variant="standard"
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              投稿！
            </Button>
        </Box>
      </Box>
    </Container>
    
      )
    }
    </>
    
  )
}


export default CreateNewReview;