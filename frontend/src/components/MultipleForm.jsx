import React from "react";

function MultipleForm() {
  return (
    <div>
      <form
        method="POST"
        encType="multipart/form-data"
        action="http://localhost:5000/uploadfiles"
      >
        <input type="file" name="myfiles" multiple />
        <button type="submit"> Send Multiple </button>
      </form>
    </div>
  );
}

export default MultipleForm;
