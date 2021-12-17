import axios from "axios";
import { LinkToReviewList } from "../review/test";

const bookRequestUrl = "https://api-for-missions-and-railways.herokuapp.com/books"
const userNameRequestUrl = "https://api-for-missions-and-railways.herokuapp.com/users"
const editUserNameUrl = "https://api-for-missions-and-railways.herokuapp.com/users"
const createNewReviewUrl = "https://api-for-missions-and-railways.herokuapp.com/books"
// const getBookByIDUrl = "https://api-for-missions-and-railways.herokuapp.com/books"

// const authorizeHeader = { Authorization: `Bearer ${localStorage.getItem("token")}` }
const getAuthorizeHeader = () => {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` }
}

export const fetchBookReview = async (offset) => {
  const authorizeHeader = getAuthorizeHeader()
  try {
    const response = await axios.get(bookRequestUrl + `?offset=${offset}`, { headers : authorizeHeader })
    return response.data
  } catch(err) {
    localStorage.setItem("isSignin", "false")
    console.log(err)
  }
}

export const fetchUserName = async () => {
  try {
    const authorizeHeader = getAuthorizeHeader()
    const response = await axios.get(userNameRequestUrl, { headers: authorizeHeader })
    localStorage.setItem("userName", response.data.name)
    return response.data.name
  } catch(err) {
    console.log(err)
  }
}

export const editUserName = async (newName) => {
  const authorizeHeader = getAuthorizeHeader()
  try {
    axios.put(editUserNameUrl, {
      "name":`${newName}`
    }, { headers: authorizeHeader })
    alert("更新できました！")
    return newName
  } catch(err) {
    console.log(err)
    alert("更新できませんでした")
  }
}

export const postNewReview = async (title, url, detail, review) => {
  const authorizeHeader = getAuthorizeHeader()
  try {
    axios.post(createNewReviewUrl, {
      // まとめて一つに引数にしたほうがいいかも
      "title": `${title}`,
      "url": `${url}`,
      "detail": `${detail}`,
      "review": `${review}`
    }, { headers: authorizeHeader })
    alert("投稿できました！")
    return true
  } catch(err) {
    console.log(err)
    alert("投稿できませんでした")
    return false
  }
}

export const getBookByID = async (id) => {
  const authorizeHeader = getAuthorizeHeader()
  try {
    const response = await axios.get(bookRequestUrl + `/${id}`, { headers: authorizeHeader})
    return response.data
  } catch(err) {
    console.log(err)
  }
}

// edit/id を強引に開いた時に、
// 更新できてなくてもできるって出る。削除も。
export const updateReview = async (id, title, url, detail, review) => {
  const authorizeHeader = getAuthorizeHeader()
  try {
    axios.put(bookRequestUrl + `/${id}`, {
      "title": `${title}`,
      "url": `${url}`,
      "detail": `${detail}`,
      "review": `${review}`
    }, { headers: authorizeHeader })
    alert("更新できました！")
    return true
    // LinkToReviewList()
  } catch(err) {
    console.log(err)
    alert("更新できませんでした")
    return false
  }
}

export const deleteBook = async (id) => {
  const authorizeHeader = getAuthorizeHeader()
  try {
    axios.delete(bookRequestUrl + `/${id}`, { headers: authorizeHeader })
    alert("削除できました！")
    return true
  } catch(err) {
    console.log(err)
    alert("削除できませんでした")
    return false
  }
}