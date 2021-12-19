import * as React from "react";
import { Alert } from "@mui/material";

const ShowErrorMessage = (props) => {
  return (
    <Alert severity="error">{props.message}</Alert>
    // <div>
    //   <p>{props.message}</p>
    // </div>
  )
}

export default ShowErrorMessage