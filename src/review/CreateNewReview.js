import * as React from 'react';
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { TextArea } from '../auth/TextArea';
import { Container, Box, Button, Grid } from "@mui/material";

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
      <Container>
      {/* <Grid container> */}
        <p>新規投稿作成</p>
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
            label="詳細"
            errorsName={errors.detail}
            errorsMessage="詳細を入力してください"
            validation={register("detail", { required: true})}
          />
          
          <TextArea
            id="review"
            label="レビュー"
            errorsName={errors.review}
            errorsMessage="レビューを入力してください"
            validation={register("review", { required: true})}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            投稿！
          </Button>
      </Box>
    {/* </Grid> */}
    </Container>
    
      )
    }
    </>
    
  )
}


export default CreateNewReview;