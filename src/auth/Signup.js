import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import ShowErrorMessage from "./ShowErrorMessage";

// import { handleChange } from "./Signin";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('')
  
  const { register, handleSubmit, formState: { errors }} = useForm()
  const onSubmit = (data) => {
    signupRequest(data)
    console.log(data.email)
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
          console.log(responseJSON.token)
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
      <h1>サインアップ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>名前:
          <input 
            id="name"
            type="text" 
            {...register("name", {required: true})}
          />
          {errors.name && <div className="error">名前を入力してください</div>}
          </label>
        </p>
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
        <input type="submit" value="登録" />
      </form>
      <p><Link to="/login">ログインはこちら</Link></p>
    </div>
  )
}

export default Signup;