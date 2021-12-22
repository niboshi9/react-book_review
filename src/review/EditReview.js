import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextArea } from '../auth/TextArea';
import { BookReviewsContext, DetailIdContext } from "../contextProvider/Context";

import { Redirect } from "react-router-dom";

import { getBookByID, updateReview, deleteBook } from '../auth/api';

import { Avatar, Container, Box, Button, TextField, Typography } from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { Progress } from "../component/Progress"

// ログアウトボタンで使ってる、useHistoryのやつで飛ばせるけど、成功した時だけ飛ばしたいから、その状態管理が必要かな


// returnまでの部分をEditReview.jsでも使ってるからまとめる
const EditForm = (props) => {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const onSubmit = (data) => {
    props.setIsUpdatedOrDeleted(updateReview(
      localStorage.getItem("selectedBookId"), 
      data.title, 
      data.url, 
      data.detail, 
      data.review
    ))
  }
  
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
        <ModeEditOutlineIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        投稿編集
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          id="title"
          label="タイトル"
          errorsName={errors.title}
          errorsMessage="タイトルを入力してください"
          validation={register("title", { required: true})}
          value={props.book.title}
        />
        
        <TextArea
          id="url"
          label="URL"
          errorsName={errors.url}
          errorsMessage="urlを入力してください"
          validation={register("url", { required: true})}
          value={props.book.url}
        />
        
        {/* <TextArea
          id="detail"
          label="作品詳細"
          errorsName={errors.detail}
          errorsMessage="詳細を入力してください"
          validation={register("detail", { required: true})}
          value={props.book.detail}
        /> */}
        <TextField
          id="detail"
          label="作品詳細"
          error={Boolean(errors.detail)}
          helperText={Boolean(errors.detail) && "作品の詳細を入力してください"}
          {...register("detail", { required: true })}
          margin="normal"
          fullWidth
          multiline
          variant="standard"
          defaultValue={props.book.detail}
        />
        
        {/* <TextArea
          id="review"
          label="レビュー"
          errorsName={errors.review}
          errorsMessage="レビューを入力してください"
          validation={register("review", { required: true})}
          value={props.book.review}
        /> */}
        <TextField
          id="review"
          label="レビュー"
          error={Boolean(errors.review)}
          helperText={Boolean(errors.review) && "レビューを入力してください"}
          {...register("review", { required: true })}
          margin="normal"
          fullWidth
          multiline
          variant="standard"
          defaultValue={props.book.review}
        />
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
        >
          更新する！
        </Button>
      </Box>
    </>
  )
}

const DeleteButton = (props) => {
  const handleClcik = () => {
    props.setIsUpdatedOrDeleted(deleteBook(localStorage.getItem("selectedBookId")))
  }
  
  return (
    <Button
      varient="contained"
      color="error"
      onClick={handleClcik}
    >
      削除
    </Button>
  )
}


const EditReview = () => {
  const [book, setBook] = useState()
  const [isUpdatedOrDeleted, setIsUpdatedOrDeleted] = useState(false)
  
  useEffect(() => {
    async function fetchData() {
      setBook(await getBookByID(localStorage.getItem("selectedBookId")))
    }
    if (Boolean(localStorage.getItem("selectedBookId"))) {
      fetchData()
    } else {
      console.log("localStorageにIDなし")
    }
    fetchData()
  },[])
  
  console.log("aaaaaaaaaa")
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {
          isUpdatedOrDeleted ? (
          <Redirect to="/"/>
          ) : (
            book ? (
              <>
                <EditForm book={book} setIsUpdatedOrDeleted={setIsUpdatedOrDeleted}/>
                <DeleteButton setIsUpdatedOrDeleted={setIsUpdatedOrDeleted} />
              </>
            ) : (
              <Progress/>
              // <p>ローディング</p>
            )
          )
        }
      </Box>
    </Container>
  )
}

export default EditReview;