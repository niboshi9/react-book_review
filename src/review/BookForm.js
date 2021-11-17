import * as React from 'react';
import { TextArea } from '../auth/TextArea';

const BookForm = (props) => {
  return (
    <>
      <TextArea
          id="title"
          label="タイトル"
          errorsName={errors.title}
          errorsMessage="タイトルを入力してください"
          validation={register("title", { required: true})}
        />
        
        <TextArea
          id="url"
          label="URL"
          errorsName={errors.url}
          errorsMessage="urlを入力してください"
          validation={register("url", { required: true})}
        />
        
        <TextArea
          id="detail"
          label="詳細"
          errorsName={errors.detail}
          errorsMessage="詳細を入力してください"
          validation={register("detail", { required: true})}
        />
        
        <TextArea
          id="review"
          label="レビュー"
          errorsName={errors.review}
          errorsMessage="レビューを入力してください"
          validation={register("review", { required: true})}
        />
    </>
  )
}

export default BookForm;