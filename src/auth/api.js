import axios from "axios";

const bookRequestUrl = "https://api-for-missions-and-railways.herokuapp.com/books"
const userNameRequestUrl = "https://api-for-missions-and-railways.herokuapp.com/users"

const authorizeHeader = { Authorization: `Bearer ${localStorage.getItem("token")}` }

export const fetchBookReview = async (offset) => {
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
      const response = await axios.get(userNameRequestUrl, { headers: authorizeHeader })
      return response.data.name
    } catch(err) {
      console.log(err)
    }
}
