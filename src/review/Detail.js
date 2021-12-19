import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { BookReviewsContext, DetailIdContext } from "../contextProvider/Context";
import { getBookByID } from '../auth/api';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Button, listItemIconClasses } from '@mui/material';

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
    <Button variant="contained" onClick={() => {
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
    <>
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
    </>
  )
}

export default withRouter(Detail);