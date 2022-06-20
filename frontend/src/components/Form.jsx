/* eslint-disable react/button-has-type */
import React from "react";

function Form() {
  return (
    <div>
      <form
        method="POST"
        encType="multipart/form-data"
        action="http://localhost:5000/uploadfile"
      >
        <input type="file" name="myfile" />
        <button> send </button>
      </form>
    </div>
  );
}

export default Form;
