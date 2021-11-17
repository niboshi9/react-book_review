import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DetailIdContext } from "../contextProvider/Context";
import './book.css'

import { Row, Col, Card } from "react-bootstrap";


export const Book = (props) => {
  const { setDetailId } = useContext(DetailIdContext)
  
  const handleClick = (id) => {
    // setDetailId(id)
    // console.log("id")
    localStorage.setItem("selectedBookId", id)
  }
  return (
      <Col xs={12} sm={6} xl={4} key={props.index}>
      {/* <Col xs={12} sm={6} md={4} xl={3} xxl={{span: 2, offset : props.offset}}> */}
      {/* <Col xs={12} sm={6} md={4} xl={3}> */}
        <Card className="h-100">
        {/* <Card> */}
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.review}</Card.Text>
            <div className="text-center">
              {/* <Card.Link onClick={handleClick()} href={`detail/${props.id}`}>レビュー詳細</Card.Link> */}
              <Link to={`detail/${props.id}`} onClick={() => handleClick(props.id)}>レビュー詳細</Link>
              <Card.Link href={props.url} target="_blank" rel="noopener noreferrer">作品詳細</Card.Link>
              {
                localStorage.getItem("userName") == props.reviewer && 
                <Link to={`edit/${props.id}`} onClick={() => handleClick(props.id)}>編集</Link>
              }
            </div>
            <Card.Footer>
              <small className="text-muted d-flex justify-content-end">Posted by {props.reviewer}</small>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    
    
    
    
    // <div className="review-card">
    //   <div className="review-item">
    //     <h2>{props.title}</h2>
    //     <p>詳細: {props.detail}</p>
    //     <p>投稿者: {props.reviewer}</p>
    //   </div>
    // </div>
  )
}