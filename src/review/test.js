import * as React from "react";
import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import { Container, Box, Button, Grid } from "@mui/material";


import { signupRequest } from "../auth/api";
import { TextArea } from "../auth/TextArea";


const Test = () => {  
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  
  const {register, handleSubmit, formState: { errors }} = useForm()
  
  const onSubmit = async (data) => {
    const response = await signupRequest(data.email, data.password)
    if (response == 200) {
      history.push("/")
    } else {
      alert("エラーが発生しました")
    }
  }
  
  
  return (
    <div>
      <h1>新規登録</h1>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          id="name"
          label="名前"
          errorsName={errors.name}
          errorsMessage="名前を入力してください"
          validation={register("name", {required: true})}
        />
        
        <TextArea
          id="email"
          label="メールアドレス"
          errorsName={errors.email}
          errorsMessage="メールアドレスを入力してください"
          validation={register("email", {required: true})}
        />
        
        <TextArea
          id="password"
          label="パスワード"
          errorsName={errors.password}
          errorsMessage="パスワードを入力してください"
          validation={register("password", {required: true})}
        />
        
        <Button
          type="submit"
          variant="contained"
        >
          サインイン
        </Button>
      </Box>
      
      <p><Link to="/signいn">ログインはこちら</Link></p>
    </div>
  )
}

export default Test;