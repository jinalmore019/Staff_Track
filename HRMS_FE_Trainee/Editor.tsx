// import dynamic from "next/dynamic";
// import React, { useEffect, useRef, useState } from "react";
// import { Controller, useController } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const TextEditorElement = ({ name, onChange, value, placeholder }) => {
//   const handleOnChange = (newVal) => {
//     if (
//       newVal.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
//       !value?.includes("<img")
//     ) {
//       newVal = null; 
//     }
//     onChange(newVal);
//   };
//   return (
    

//     <ReactQuill
//       value={value}
//       formats={TextEditorElement.formats}
//       modules={TextEditorElement.modules}
//       theme="snow"
//       className="quill-editor h-60 mb-11"
//       onChange={handleOnChange}
//       placeholder={placeholder}
//     />
   
//   );
// };


// TextEditorElement.modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
    
//     ["clean"],
//   ],
//   clipboard: {
//     matchVisual: false,
//   },
// };

// TextEditorElement.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "video",
// ];
// export default TextEditorElement;
