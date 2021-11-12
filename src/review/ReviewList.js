import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";


import { Book } from "./Book";
import { fetchBookReview, fetchUserName } from "../auth/api";

import { AuthContext } from "../contextProvider/AuthContext";


const ReviewList = () => {
  const [bookReviews, setBookReviews] = useState([])
  const [offset, setOffset] = useState(0)
  const [userName, setUserName] = useState('')
  
  const { isAuth, setIsAuth } = useContext(AuthContext)
  
  useEffect(() => {
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
      setIsAuth(false)
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
      {/* <Container fluid> */}
      <Container>
        <Row className="g-3">
          {/* <Col xxl={1}></Col> */}
          {bookReviews.map((book, index) => {
            // if (index == 5) {
            //   return (
            //     <>
            //       <Book
            //         offset={1}
            //         title={book.title}
            //         detail={book.detail}
            //         review={book.review}
            //         reviewer={book.reviewer}
            //         url={book.url}
            //       />
            //     </>
            //   )
            // }
            return (
                <Book
                  key={index}
                  title={book.title}
                  detail={book.detail}
                  review={book.review}
                  reviewer={book.reviewer}
                  url={book.url}
                />
            )
          })}
        </Row>
      </Container>
      </>
    )
  }
  
  
  return (
    <div>
      <header>
        <h1>レビュー一覧</h1>
        {userName}
        <p><Link to="/editUser">ユーザー情報編集</Link></p>
      </header>
      <BookReviews/>
      <LogoutButton/>
    </div>
  )
}

export default ReviewList;