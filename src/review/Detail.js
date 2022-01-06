import * as React from 'react';
import { useEffect, useState } from "react";
import { getBookByID, fetchBookImage } from '../auth/api';
import { withRouter, useHistory } from 'react-router-dom';
import { Container, Box, Button, Grid, Avatar, Typography, List, ListItem, ListItemText } from '@mui/material';

import { Progress } from '../component/Progress';




const BookDetail = (props) => {
  const history = useHistory()
  const linkTo = () => {
    window.location.href = `${props.book.url}`
  }
  
  
  return (
    <>
      <ListItem alignItems="center">
        <Avatar 
          onClick={() => {
            // handleClick(props.id)
            linkTo()
          }}
          src={props.imageUrl}
          variant="square"
          sx={{ 
            // width: 88,
            // height: 134,
            width: 128,
            height: 174,
            marginRight: "20px",
            '&:hover': {
              cursor: "pointer",
              outline: "5px solid gray",
              outlineOffset: "-5px"
            }
          }}
        />
      
        <List>
          {/* タイトル */}
          <ListItemText
            onClick={() => {
              // handleClick(props.book.id)
              // linkTo("url")
            }}
            primary={props.book.title}
            primaryTypographyProps={{
              fontSize: 37,
              fontWeight: "bold"
            }}
            sx={{
              // margin: "auto"
            }}
          />
          {/* 投稿者名 */}
          <ListItemText
            // onClick={() => {
            //   handleClick(props.id)
            //   linkTo("editDetail")
            // }}
            secondary={`posted by ${props.book.reviewer}`}
            secondaryTypographyProps={{
              fontSize: 17
            }}
            sx={{
              mt: -1
            }}
          />
        </List>
      </ListItem>
        
      <List>
        {/* 作品詳細 */}
        <Typography variant="h5" sx={{mt: 5}}>作品詳細</Typography>
        <ListItemText
          onClick={() => {
            // handleClick(props.book.id)
            // linkTo("detail")
          }}
          secondary={props.book.detail}
          sx={{
            mt: 1.6,
            // WebkitBoxOrient: "vertical",
          }}
        />
        
        {/* レビュー */}
        <Typography variant="h5" sx={{mt: 5}}>レビュー</Typography>
        <ListItemText
          onClick={() => {
            // handleClick(props.book.id)
            // linkTo("detail")
          }}
          secondary={props.book.review}
          sx={{
            mt: 1.6,
            // WebkitBoxOrient: "vertical",
          }}
        />
      </List>
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
  const noImage = "https://placehold.jp/24/cccccc/ffffff/128x174.png?text=NO+IMAGE"
  const [book, setBook] = useState()
  const [imageUrl, setImageUrl] = useState(noImage)
  const [isEditable, setIsEditable] = useState(false)
  
  useEffect(() => {
    async function fetchData() {
      // setBook(await getBookByID(localStorage.getItem("selectedBookId")))
      const bookResponse = await getBookByID(localStorage.getItem("selectedBookId"))
      const imageResponse = await fetchBookImage(bookResponse.title)
      setBook(bookResponse)
      setImageUrl(imageResponse)
    }
    if (Boolean(localStorage.getItem("selectedBookId"))) {
      fetchData()
    } else {
      console.log("localStorageにIDなし")
    }
  },[])
  
  return (
    <Container maxWidth="md">
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
        <BookDetail 
          book={book}
          imageUrl={imageUrl}
        />
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