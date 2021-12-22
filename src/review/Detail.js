import * as React from 'react';
import { useEffect, useState } from "react";
import { getBookByID } from '../auth/api';
import { withRouter, useHistory } from 'react-router-dom';
import { Container, Box, Button, Grid, Avatar, Typography } from '@mui/material';

import { Progress } from '../component/Progress';




const BookDetail = (props) => {
  return (
    <>
      <p>タイトル: {props.book.title}</p>
      <p>URL: {props.book.url}</p>
      <p>詳細: {props.book.detail}</p>
      <p>レビュー: {props.book.review}</p>
      <p>{props.book.reviewer} により投稿</p>
    </>
  )
}

const EditableButton = (props) => {
  const history = useHistory()
  return (
    <Button variant="contained"  onClick={() => {
      localStorage.setItem("selectedBookId", props.id)
      history.push(`../edit/${props.id}`)
    }}>
      編集する
    </Button>
  )
}

// returnまでの部分をEditReview.jsでも使ってるからまとめる
const Detail = (props) => {
  const [book, setBook] = useState()
  const [isEditable, setIsEditable] = useState(false)
  
  useEffect(() => {
    async function fetchData() {
      setBook(await getBookByID(localStorage.getItem("selectedBookId")))
    }
    if (Boolean(localStorage.getItem("selectedBookId"))) {
      fetchData()
    } else {
      console.log("localStorageにIDなし")
    }
  },[])
  
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
      book ? (
        <BookDetail book={book}/>
        // <Progress/>
      ) : (
        // <p>ローディング</p>
        <Progress/>
      )
    }
    {
      book && localStorage.getItem("userName") == book.reviewer && (
        <EditableButton id={book.id} />
      )
    }
      </Box>
    </Container>
  )
}

export default withRouter(Detail);