// import * as React from "react";
import React, { createContext, useState, useContext } from "react"


export const BookReviewsContext = createContext()
export const DetailIdContext = createContext()

export const ContextProvider = ({ children }) => {
  // const [isAuth, setIsAuth] = useState(false)
  const [bookReviews, setBookReviews] = useState([])
  const [detailId, setDetailId] = useState()
  
  return (
    <BookReviewsContext.Provider value={{ bookReviews, setBookReviews }}>
      <DetailIdContext.Provider value={{ detailId, setDetailId }} >
        {children}
      </DetailIdContext.Provider>
    </BookReviewsContext.Provider>
  )
}


