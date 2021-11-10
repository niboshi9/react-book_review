import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Book } from "./Book";
import { fetchBookReview, fetchUserName } from "../auth/api";


const ReviewList = () => {
  const [bookReviews, setBookReviews] = useState([])
  const [offset, setOffset] = useState(0)
  const [userName, setUserName] = useState('')
  
  useEffect( async () => {
    setBookReviews(await fetchBookReview(offset))
    setUserName(await fetchUserName())
  },[offset])
  
  return (
    <div>
      <header>
        <h1>レビュー一覧</h1>
        {userName}
        <p><Link to="/editUser">ユーザー情報編集</Link></p>
      </header>
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
    </div>
  )
}

export default ReviewList;