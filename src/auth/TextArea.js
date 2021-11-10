import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  Row,
  Col,
  Button,
  ButtonToolbar
} from 'react-bootstrap';



export const TextArea = React.forwardRef((props, ref) => (
  <Form.Group as={Row} controlId={props.id}>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control
      type="text"
      isInvalid={props.errorsName}
      ref={ref}
    />
    {
      props.errorsName &&
      <Form.Control.Feedback type="invalid">
        {props.errorsMessage}
      </Form.Control.Feedback>
    }
  </Form.Group>
))

// export const TextArea = (props) => {
//   const { register, handleSubmit, formState: { errors }} = useForm()
  
//   return (
//     <p>
//       <label>{props.label}:
//       <input 
//         id={props.id}
//         type="text"
//         {...register(props.id, {required: true})}
//       />
//       {errors.name && <div className="error">{props.errorMessage}</div>}
//     </label>
//   </p>
//   )
// }