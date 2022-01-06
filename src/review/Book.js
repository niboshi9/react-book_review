import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";

import { fetchBookImage } from "../auth/api";


const noImage = "https://placehold.jp/24/cccccc/ffffff/128x174.png?text=NO+IMAGE"

const Book = (props) => {
  const [imageUrl, setImageUrl] = useState(noImage)
  const history = useHistory()
  
  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      const response = await fetchBookImage(props.title)
      // setImageUrl(await response.data.items[0].volumeInfo.imageLinks.thumbnail)
      // setImageUrl(response)
      if (isMounted) {
        setImageUrl(response)
      }
    }
    fetchData()
    // ↓はアンマウント直前に呼ばれる。
    // マウント時にfetchData呼ぶけど、
    // マウントされている時しかsetImageUrlしないようにできる
    // →メモリリークを防ぐ
    return () => {
      isMounted = false
    }
  },[])
  
  
  const handleClick = (id) => {
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
    <ListItem alignItems="flex-start" sx={{ 
      minHeight: 220
      }}>
      <Avatar 
        onClick={() => {
          handleClick(props.id)
          linkTo("url")
        }}
        src={imageUrl}
        variant="square"
        sx={{ 
          // width: 88,
          // height: 134,
          width: 128,
          height: 174,
          marginRight: "12px",
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
              textDecoration: "underline"
            }
          }}
        />
        
        {/* 投稿者名 */}
        <ListItemText
          // onClick={() => {
          //   handleClick(props.id)
          //   linkTo("editDetail")
          // }}
          secondary={`by ${props.reviewer}`}
          sx={{
            mt: -1
          }}
        />
        
        {/* 作品詳細 */}
        <ListItemText
          onClick={() => {
            handleClick(props.id)
            linkTo("detail")
          }}
          secondary={props.detail}
          sx={{
            mt: 1.6,
            overflow: "hidden",
            height: "5em",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
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
  )
}

export default Book;