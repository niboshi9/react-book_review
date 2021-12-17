import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";


import Book from "./Book";
import { fetchBookReview, fetchUserName } from "../auth/api";

// import { AuthContext } from "../contextProvider/Context";
import { BookReviewsContext } from "../contextProvider/Context";
import { List } from "@mui/material";


const ReviewList = () => {
  // const [bookReviews, setBookReviews] = useState([])
  const { bookReviews, setBookReviews } = useContext(BookReviewsContext)
  const [offset, setOffset] = useState(0)
  const [userName, setUserName] = useState('')
  
  // const { isAuth, setIsAuth } = useContext(AuthContext)
  
  useEffect(() => {
    localStorage.removeItem("selectedBook")
    async function fetchData() {
      setBookReviews(await fetchBookReview(offset))
      setUserName(await fetchUserName())
      console.log("effect!")
    }
    console.log(Boolean(localStorage.getItem("token")))
    console.log(localStorage.getItem("token"))
    if (Boolean(localStorage.getItem("token"))) {
      fetchData()
      console.log("fetchData！")
    } else {
      console.log("まだ！")
    }
  },[offset])
  
  const LogoutButton = () => {
    const history = useHistory()
    const clearData = () => {
      localStorage.clear()
      setBookReviews({})
      setOffset(0)
      setUserName('')
    }
    
    return (
      <Button
        variant="secondary"
        onClick={() => {
          clearData()
          setBookReviews([])
          history.push("/signin")
          
        }}
      >
        ログアウト
      </Button>
    )
  }
  
  const BookReviews = () => {
    return (
      <>
      <List
        sx={{
          // maxWidth: 750,
          width: 750,
        }}
      >
      {bookReviews.map((book, index) => {
        return (
          <Book
            key={index}
            id={book.id}
            title={book.title}
            detail={book.detail}
            review={book.review}
            reviewer={book.reviewer}
            url={book.url}
          />
        )
      })}
      </List>
      
      
      {/* ↓ReactBootstrap */}
      {/* <Container>
        <Row className="g-3">
          {bookReviews.map((book, index) => {
            return (
                <Book
                  key={index}
                  id={book.id}
                  title={book.title}
                  detail={book.detail}
                  review={book.review}
                  reviewer={book.reviewer}
                  url={book.url}
                />
            )
          })}
        </Row>
      </Container> */}
      </>
    )
  }
  
  console.log(bookReviews)
  
  

  
  return (
    <div>
      <header>
        <h1>レビュー一覧</h1>
        {userName}
        <p><Link to="/editUser">ユーザー情報編集</Link></p>
        <p><Link to="/new">新規投稿</Link></p>
      </header>
      <BookReviews/>
      <LogoutButton/>
    </div>
  )
}

export default ReviewList;