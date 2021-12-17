import * as React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { DetailIdContext } from "../contextProvider/Context";
import './book.css'

import { Row, Col, Card } from "react-bootstrap";

import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

import bookIcon from '../img/content.jpg'
import Button from "@restart/ui/esm/Button";





// export const Book = (props) => {
const Book = (props) => {
  const { setDetailId } = useContext(DetailIdContext)
  const history = useHistory()
  
  const ListItemLink = (props) => {
    const renderLink = () => {
      // React.forwardRef
    }
  }
  
  const handleClick = (id) => {
    // setDetailId(id)
    // console.log("id")
    localStorage.setItem("selectedBookId", id)
  }
  
  
  const linkTo = (destination) => {
    
    switch (destination) {
      case "detail":
        history.push(`detail/${props.id}`)
        break
      case "url":
        window.location.href = `${props.url}`
        break
      case "editDetail":
        history.push(`edit/${props.id}`)
        break
      default:
        alert("リンクエラー")
        break
    }
  }
  
  return (
    
    <>
    {/* サムネイル */}
    <ListItem alignItems="flex-start" sx={{ height: 220}}>
      <Avatar 
        onClick={() => {
          handleClick(props.id)
          linkTo("url")
        }}
        src={bookIcon}
        variant="square"
        sx={{ 
          // width: 88,
          // height: 134,
          width: 128,
          height: 174,
          '&:hover': {
            cursor: "pointer"
          }
        }}
      />
      
      <List
        sx={{
          height: 146,   //146
          // maxWidth: 700,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 5,
          
        }}
      >
        
        {/* タイトル */}
        <ListItemText
          onClick={() => {
            handleClick(props.id)
            linkTo("url")
          }}
          primary={props.title}
          primaryTypographyProps={{
            fontSize: 22,
            fontWeight: "bold"
          }}
          sx={{
            '&:hover': {
              cursor: "pointer",
              xtDecoration: "underline"
            }
          }}
        />
        
        {/* 投稿者名 */}
        <ListItemText
          // onClick={() => {
          //   handleClick(props.id)
          //   linkTo("editDetail")
          // }}
          secondary={props.reviewer}
        />
        
        {/* レビュー一部 */}
        <ListItemText
          onClick={() => {
            handleClick(props.id)
            linkTo("detail")
          }}
          secondary={props.detail}
          sx={{
            '&:hover': {
              cursor: "pointer",
              textDecoration: "underline"
            }
          }}
        />
      </List>
    </ListItem>
    <Divider />
    </>
    
    
    
    // reactBootstrap
      // <Col xs={12} sm={6} xl={4} key={props.index}>
      // {/* <Col xs={12} sm={6} md={4} xl={3} xxl={{span: 2, offset : props.offset}}> */}
      // {/* <Col xs={12} sm={6} md={4} xl={3}> */}
      //   <Card className="h-100">
      //   {/* <Card> */}
      //     <Card.Body>
      //       <Card.Title>{props.title}</Card.Title>
      //       <Card.Text>{props.review}</Card.Text>
      //       <div className="text-center">
      //         {/* <Card.Link onClick={handleClick()} href={`detail/${props.id}`}>レビュー詳細</Card.Link> */}
      //         <Link to={`detail/${props.id}`} onClick={() => handleClick(props.id)}>レビュー詳細</Link>
      //         <Card.Link href={props.url} target="_blank" rel="noopener noreferrer">作品詳細</Card.Link>
      //         {
      //           localStorage.getItem("userName") == props.reviewer && 
      //           <Link to={`edit/${props.id}`} onClick={() => handleClick(props.id)}>編集</Link>
      //         }
      //       </div>
      //       <Card.Footer>
      //         <small className="text-muted d-flex justify-content-end">Posted by {props.reviewer}</small>
      //       </Card.Footer>
      //     </Card.Body>
      //   </Card>
      // </Col>
    
    
    // <div className="review-card">
    //   <div className="review-item">
    //     <h2>{props.title}</h2>
    //     <p>詳細: {props.detail}</p>
    //     <p>投稿者: {props.reviewer}</p>
    //   </div>
    // </div>
  )
}

export default Book;