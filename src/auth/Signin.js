import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  
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
  
  const signinRequest = () => {
    fetch(requestUrl, requestOptions)
    .then(response => response.json())
    .then(responseJSON => console.log(responseJSON))
  }
  
  return (
    <div>
      <h1>ログイン</h1>
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
      <button onClick={signinRequest}>登録</button>
      <p><Link to="/signup">ログイン</Link></p>
    </div>
  )
}

export default Signin;