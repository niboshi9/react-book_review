import React from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@mui/material";

import {
  Form,
  Row,
  Col,
  Button,
  ButtonToolbar
} from 'react-bootstrap';
import { getThemeProps } from "@mui/system";



// export const TextArea = React.forwardRef((props, ref) => (
//   <Form.Group as={Row} controlId={props.id}>
//     <Form.Label>{props.label}</Form.Label>
//     <Form.Control
//       type="text"
//       isInvalid={props.errorsName}
//       {...ref}
//       // {...props.set}
//     />
//     {
//       props.errorsName &&
//       <Form.Control.Feedback type="invalid">
//         {props.errorsMessage}
//       </Form.Control.Feedback>
//     }
//   </Form.Group>
// ))


// export const TextArea2 = React.forwardRef((props, ref) => (
//     <TextField
//       id={props.id}
//       label={props.label}
//       isInvalid={props.errorsName}
//       {...ref}
//       // {...props.set}
//       error={props.errorsName}
//       helperText={props.errorsName && props.errorsMessage}
//     />
// ))

// hook-form の yup やる？
export const TextArea = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      error={Boolean(props.errorsName)}
      helperText={Boolean(props.errorsName) && props.errorsMessage}
      {...props.validation}
      
      defaultValue={props.value}
      
      margin="normal"
      fullWidth
    />
  )
}

// export const BookTextArea = (props) => {
//   return (
//     <>
//       <TextArea
//           id="title"
//           label="タイトル"
//           errorsName={props.errorsName}
//           errorsMessage={props.errorsMessage}
//           validation={props.validation}
//         />
        
//         <TextArea
//           id="url"
//           label="URL"
//           errorsName={errors.url}
//           errorsMessage="urlを入力してください"
//           validation={register("url", { required: true})}
//         />
        
//         <TextArea
//           id="detail"
//           label="詳細"
//           errorsName={errors.detail}
//           errorsMessage="詳細を入力してください"
//           validation={register("detail", { required: true})}
//         />
        
//         <TextArea
//           id="review"
//           label="レビュー"
//           errorsName={errors.review}
//           errorsMessage="レビューを入力してください"
//           validation={register("review", { required: true})}
//         />
//     </>
//   )
// }