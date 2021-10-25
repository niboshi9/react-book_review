import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isModalHidden, setIsModalHidden] = useState(false)
  
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
  
  const signupRequest = () => {
    // useEffect(async() => {
      
    // },[isModalHidden])
    fetch(requestUrl, requestOptions)
    .then(response => response.json())
    .then(responseJSON => console.log(responseJSON))
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