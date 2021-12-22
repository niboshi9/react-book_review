import * as React from "react";
import { useState, useEffect, useContext } from "react";
// import { Container, Row, Button, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";


import Book from "./Book";
import { fetchBookReview, fetchUserName } from "../auth/api";

// import { AuthContext } from "../contextProvider/Context";
import { BookReviewsContext } from "../contextProvider/Context";
import { List, Box, Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { position } from "dom-helpers";

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
})


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
      // console.log("effect!")
    }
    // console.log(Boolean(localStorage.getItem("token")))
    // console.log(localStorage.getItem("token"))
    if (Boolean(localStorage.getItem("token"))) {
      fetchData()
      // console.log("fetchData！")
    } else {
      // console.log("まだ！")
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
      <ThemeProvider theme={theme}>
        <Button
          // sx={{
          //   fontSize: 10
          // }}
          variant="contained"
          color="neutral"
          onClick={() => {
            clearData()
            setBookReviews([])
            history.push("/signin")
            
          }}
        >
          ログアウト
        </Button>
      </ThemeProvider>
    )
  }
  
  const BookReviews = () => {
    return (
      <Box>
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
      </Box>
    )
  }
  
  // console.log(bookReviews)
  
  

  
  return (
    <Box>
      {/* <Grid
        container
        direction="column"
        alignItems="center"
      > */}
        <header>
          <Grid
            container
            direction="row"
            spacing={2}
            // xs={12}
            justifyContent="center"
            alignItems="center"
            sx={{
              zIndex: 2,
              position: "fixed",
              background: "white"
            }}
          >
            <Grid item xs={2}>
              <h1>本の感想</h1>
            </Grid>
            <Grid item xs={4}>
              {userName} としてログイン中
            </Grid>
            <Grid item xs={1}>
              <Link to="/new">新規投稿</Link>
            </Grid>
            <Grid item xs={1}>
              <Link to="/editUser">名前変更</Link>
            </Grid>
            <Grid item xs={2}>
              <LogoutButton/>
            </Grid>
          </Grid>
        </header>
        <Grid
          container
          justifyContent="center"
          sx={{
            paddingTop: "80px"
          }}
        >
          <BookReviews/>
        </Grid>
        <Grid>
          
        </Grid>
      {/* </Grid> */}
    </Box>
  )
}

export default ReviewList;