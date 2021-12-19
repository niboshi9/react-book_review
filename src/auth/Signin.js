import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import { Box, Button, Grid } from "@mui/material";

import { signinRequest } from "../auth/api";

import ShowErrorMessage from "./ShowErrorMessage";
import { TextArea } from "../auth/TextArea";


const Test = () => {  
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  
  const {register, handleSubmit, formState: { errors }} = useForm()
  
  const onSubmit = async (data) => {
    const response = await signinRequest(data.email, data.password)
    if (response == 200) {
      history.push("/")
    } else {
      setErrorMessage(response)
    }
  }
  
  return (
    <div>
      <h1>サインイン</h1>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          value="testemail"
          id="email"
          label="メールアドレス"
          errorsName={errors.email}
          errorsMessage="メールアドレスを入力してください"
          validation={register("email", {required: true})}
        />
        
        <TextArea
          value="passsssword"
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
      <ShowErrorMessage message={errorMessage}/>
      <p><Link to="/signup">登録はこちら</Link></p>
    </div>
  )
}

export default Test;