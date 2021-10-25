import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// import { handleChange } from "./Signin";

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  // const [isModalHidden, setIsModalHidden] = useState(false)
  
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value)
        break
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
  
  const requestUrl = "https://api-for-missions-and-railways.herokuapp.com/users"
  
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "name": `${name}`,
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
  
  const signupRequest = async () => {
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
      <p>
        名前:
        <input 
          id="name"
          type="text" 
          value={name}
          onChange={handleChange}
          />
      </p>
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
      <button onClick={signupRequest}>登録</button>
      <p><Link to="/login">ログインはこちら</Link></p>
    </div>
  )
}

export default Signup;