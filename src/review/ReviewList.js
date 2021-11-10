import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import { Book } from "./Book";


const ReviewList = () => {
  const [books, setBooks] = useState([])
  const [offset, setOffset] = useState(0)
  const [userName, setUserName] = useState('')
  
  const bookRequestUrl = "https://api-for-missions-and-railways.herokuapp.com/books"
  const userNameRequestUrl = "https://api-for-missions-and-railways.herokuapp.com/users"
  
  const header = { Authorization: `Bearer ${localStorage.getItem("token")}` }
  
  const fetchBookReview = async () => {
    try {
      const response = await axios.get(bookRequestUrl + `?offset=${offset}`, { headers : header })
      setBooks(response.data)
    } catch(err) {
      localStorage.setItem("isSignin", "false")
      console.log(err)
    }
  }
  
  const fetchUserName = async () => {
    try {
      const response = await axios.get(userNameRequestUrl, { headers: header })
      setUserName(response.data.name)
    } catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    fetchBookReview()
    fetchUserName()
  },[offset])
  
  return (
    <div>
      <header>
        <h1>レビュー一覧</h1>
        {userName}
      </header>
      {/* <Container fluid> */}
      <Container>
        <Row className="g-3">
          {/* <Col xxl={1}></Col> */}
          {books.map((book, index) => {
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