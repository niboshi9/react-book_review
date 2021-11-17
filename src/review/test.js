import * as React from "react";
import { useHistory } from "react-router-dom";

export const LinkToReviewList = () => {
  const history = useHistory()
  return (
    history.push("/")
  )
}