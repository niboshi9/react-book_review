import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }
  
  const requestUrl = "https://api-for-missions-and-railways.herokuapp.com/signin"
  
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": `${email}`,
      "password": `${password}`
    })
  };
  
  const defineErrorMessage = async (response) => {
    const message = await response.json()
    const m = await message.ErrorMessageJP
    setErrorMessage(m)
    console.log(errorMessage)
  }
  
  const signinRequest =  async () => {
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
      <h1>サインイン</h1>
      <p>
        メールアドレス:
        <input 
          id="email"
          type="text" 
          value={email}
          onChange={handleChange}
        />
      </p>
      <p>
        パスワード:
        <input 
          id="password"
          type="text" 
          value={password}
          onChange={handleChange}
        />
      </p>
      <button onClick={signinRequest}>サインイン</button>
      <p><Link to="/signup">登録はこちら</Link></p>
    </div>
  )
}

export default Signin;