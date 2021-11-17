import * as React from "react";
import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
// import { TextField } from "@mui/material";

import ShowErrorMessage from "./ShowErrorMessage";

// import { AuthContext } from "../contextProvider/Context";


const Signin = () => {  
  
  // const { isAuth, setIsAuth } = useContext(AuthContext)
  
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState('')
  
  // const { register, handleSubmit, formState: { errors }} = useForm()
  const { register, handleSubmit, control, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    const status = await signinRequest(data)
    if (status == 200) {
      history.push("/")
    }
  }
  
  const requestUrl = "https://api-for-missions-and-railways.herokuapp.com/signin"
  
  const defineErrorMessage = async (response) => {
    setErrorMessage('')
    const message = await response.json()
    const m = await message.ErrorMessageJP
    setErrorMessage(await m)
    // console.log(errorMessage) 待ってくれないから最初undefinedになる。
  }
  
  const signinRequest =  async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
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
          // const token = localStorage.getItem("token")
          // console.log(token)
          // console.log(responseJSON.token)
          localStorage.setItem("isSignin", "true")
          // console.log(localStorage.getItem("isSignin"))
          // setIsAuth(true)
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
  
  console.log(`エラー！：${errors.email}`)
  console.log(Boolean(errors.email))
  
  return (
    <div>
      <h1>サインイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>メールアドレス:
          <input 
            value="testemail"
            id="email"
            type="text"
            {...register("email", {required: true})}
          />
          {errors.email && <div className="error">メールアドレスを入力してください</div>}
          </label>
        </p>
        <p>
          <label>パスワード:
          <input 
            value="passsssword"
            id="password"
            type="text" 
            {...register("password", {required: true})}
          />
          {errors.password && <div className="error">パスワードを入力してください</div>}
          </label>
        </p>
        
        {/* <Controller
          name="email"
          control={control}
          rules={{ required: "メールアドレスを入力してください"}}
          as={
            <TextField
              label="メールアドレス"
              error={Boolean(errors.email)}
            />
          }
        /> */}
        
        <ShowErrorMessage message={errorMessage}/>
        {/* <Button type="submit">サインイン</Button> */}
        <input type="submit" value="サインイン" />
      </form>
      <p><Link to="/signup">登録はこちら</Link></p>
    </div>
  )
}

export default Signin;