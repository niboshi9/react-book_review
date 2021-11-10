import * as React from 'react';
import {useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import { fetchUserName } from '../auth/api';
import ShowErrorMessage from '../auth/ShowErrorMessage';

import { editUserName } from '../auth/api';

const EditUser = () => {
  const [userName, setUserName] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  
  const { register, handleSubmit, formState: { errors }} = useForm()
  
  const onSubmit = async (data) => {
    setUserName(await editUserName(data.userName))
  }
  
  useEffect(async () => {
    setUserName(await fetchUserName())
    console.log("更新！")
  })
  
  
  
  return (
    <>
      <p>現在の名前: {userName}</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>名前:
          <input 
            id="userName"
            type="text"
            placeholder={userName}
            {...register("userName", {required: true})}
          />
          {errors.email && <div className="error">名前を入力してください</div>}
          </label>
        </p>
        <ShowErrorMessage message={errorMessage}/>
        <input type="submit" value="変更する" />
      </form>
    </>
  )
}

export default EditUser;