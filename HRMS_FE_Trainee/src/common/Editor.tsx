// import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// const ReactQuill = dynamic(import("react-quill"), { ssr: false });
const TextEditorElement = ({ name, onChange,control, value, placeholder }) => {
  const handleOnChange = (newVal) => {
    if (
      newVal.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value?.includes("<img")
    ) {
      newVal = null; // that's for handling empty tags
    }
      onChange(newVal);
  };
  return (
    // <Controller
    // name={name}
    // control={control}
    // rules={{ required: `${name} is required !` }}
    // render={({ field }) => (
      // <FormField
      // control={control}
      // name="updateMessage"
      // render={({ field }) => (
      //     <FormItem className="items-center gap-4">
      //         <div className="">
      //             <FormControl>
    <ReactQuill
    //  {...field}
    value={value}
      formats={TextEditorElement.formats}
      modules={TextEditorElement.modules}
      theme="snow"
      className="quill-editor mb-2"
     onChange={handleOnChange}
      placeholder={placeholder}
    />
                // </FormControl>
                //                         <FormMessage />
                //                  </div>
                //              </FormItem>
                //             )}
                //         /> 
  );
}
// TextEditorElement.propTypes = {
//   placeholder: PropTypes.string,
// };

TextEditorElement.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

TextEditorElement.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
export default TextEditorElement;
