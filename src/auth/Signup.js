import * as React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import ShowErrorMessage from "./ShowErrorMessage";


import { TextArea } from "./TextArea";
import {
  Form,
  Row,
  Col,
  Button,
  ButtonToolbar
} from 'react-bootstrap';

// import { handleChange } from "./Signin";

const Signup = () => {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  
  const { register, handleSubmit, formState: { errors }} = useForm()
  const onSubmit = async (data) => {
    const status = await signupRequest(data)
    if (status == 200) {
      history.push("/")
    }
  }
  
  const requestUrl = "https://api-for-missions-and-railways.herokuapp.com/users"
  
  const defineErrorMessage = async (response) => {
    const message = await response.json()
    const m = await message.ErrorMessageJP
    setErrorMessage(m)
    console.log(errorMessage)
  }
  
  const signupRequest = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "name": `${data.name}`,
        "email": `${data.email}`,
        "password": `${data.password}`
      })
    };
    
    try {
      const response = await fetch(requestUrl, requestOptions)
      console.log(response.status)
      switch (response.status) {
        case 200:
          const responseJSON = await response.json()
          localStorage.setItem("token", responseJSON.token)
          const token = localStorage.getItem("token")
          // console.log(token)
          // console.log(responseJSON.token)
          localStorage.setItem("isSignin", "true")
          return 200
        case 400:
          defineErrorMessage(response)
          break
        case 401:
          defineErrorMessage(response)
          break
        case 403:
          defineErrorMessage(response)
          break
        case 500:
          defineErrorMessage(response)
          break
        default:
          break
      }
    } catch(err) {
      // ネット接続がない時？
      console.log(err)
    }
  }
  
  console.log(errors)
  
  return (
    <div>
      <h1>サインアップ</h1>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* <Form.Group as={Row} controlId="name">
          <Form.Label>名前</Form.Label>
          <Form.Control
            type="text"
            isInvalid={errors.name}
            {...register("name", { required: true})}
          />
          {
            errors.name &&
            <Form.Control.Feedback type="invalid">
              名前を入力してください
            </Form.Control.Feedback>
          }
        </Form.Group> */}
        
        <TextArea
          id="name"
          label="名前"
          errorsName={errors.name}
          errorsMessage="名前を入力してください"
          // ref={register("name", { required: true})}
          
        />
        
        <TextArea
          id="email"
          label="メールアドレス"
          errorsName={errors.email}
          errorsMessage="メールアドレスを入力してください"
          ref={register("email", { required: true})}
        />
        
        <TextArea
          id="password"
          label="パスワード"
          errorsName={errors.password}
          errorsMessage="パスワードを入力してください"
          ref={register("password", { required: true})}
        />
        
        
        <Form.Group>
          <Button variant="primary" type="submit">登録</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Signup;