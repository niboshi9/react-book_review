import * as React from "react";
import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import { Container, Box, Button, Grid } from "@mui/material";


import { signupRequest } from "../auth/api";
import { TextArea } from "../auth/TextArea";

import { fetchBookImage } from "../auth/api";

const noImage = "https://placehold.jp/24/cccccc/ffffff/128x174.png?text=NO+IMAGE"


const Test = () => {  
  const [imageUrl, setImageUrl] = useState('')
  const handleClick = async () => {
    // const response = await fetchBookImage("アオのハコ 1(ジャンプコミックス)")
    const response = await fetchBookImage("基礎から学ぶ React/React Hooks")
    // const responseImageUrl = response.data.items[0].volumeInfo.imageLinks.thumbnail
    // console.log(responseImageUrl)
    // setImageUrl(responseImageUrl)
    setImageUrl(response)
    console.log(imageUrl)
  }
  
  return (
    <>
      <Button variant="contained" onClick={() => handleClick()}>テスト！</Button>
      {
        imageUrl ? <img src={imageUrl} /> : <img src={noImage} />
      }
      {/* <img src={imageUrl} /> */}
    </>
  )
}

export default Test;