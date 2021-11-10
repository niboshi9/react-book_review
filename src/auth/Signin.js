import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import ShowErrorMessage from "./ShowErrorMessage";


const Signin = () => {  
  const [errorMessage, setErrorMessage] = useState('')
  
  const { register, handleSubmit, formState: { errors }} = useForm()
  const onSubmit = (data) => {
    signinRequest(data)
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
          break
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
  
  return (
    <div>
      <h1>サインイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>メールアドレス:
          <input 
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
            id="password"
            type="text" 
            {...register("password", {required: true})}
          />
          {errors.password && <div className="error">パスワードを入力してください</div>}
          </label>
        </p>
        <ShowErrorMessage message={errorMessage}/>
        <input type="submit" value="サインイン" />
      </form>
      <p><Link to="/signup">登録はこちら</Link></p>
    </div>
  )
}

export default Signin;