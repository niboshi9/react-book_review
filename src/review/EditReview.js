import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextArea } from '../auth/TextArea';
import { BookReviewsContext, DetailIdContext } from "../contextProvider/Context";

import { Redirect } from "react-router-dom";

import { getBookByID, updateReview, deleteBook } from '../auth/api';

import { Container, Box, Button } from "@mui/material";

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
    <Container>
      <p>投稿編集</p>
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
        
        <TextArea
          id="detail"
          label="詳細"
          errorsName={errors.detail}
          errorsMessage="詳細を入力してください"
          validation={register("detail", { required: true})}
          value={props.book.detail}
        />
        
        <TextArea
          id="review"
          label="レビュー"
          errorsName={errors.review}
          errorsMessage="レビューを入力してください"
          validation={register("review", { required: true})}
          value={props.book.review}
        />
        
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
        >
          更新する！
        </Button>
      </Box>
    </Container>
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
    <>
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
    
    {/* {
      book ? (
        <>
          <EditForm book={book} setIsUpdated={setIsUpdated}/>
          <DeleteButton />
        </>
      ) : (
        <p>ローディング</p>
      )
    } */}
    </>
  )
}

export default EditReview;