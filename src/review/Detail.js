import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { BookReviewsContext, DetailIdContext } from "../contextProvider/Context";
import { getBookByID } from '../auth/api';


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

// returnまでの部分をEditReview.jsでも使ってるからまとめる
const Detail = () => {
  const [book, setBook] = useState()
  
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
  
  return (
    <>
    {
      book ? (
        <BookDetail book={book}/>
      ) : (
        <p>ローディング</p>
      )
    }
    </>
  )
}

export default Detail;