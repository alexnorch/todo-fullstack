import "./FileUploader.scss";
import { ChangeEvent } from "types";

interface FileUploaderProps {
  text: string,
  onChange: (e: any) => void;
  accepts: string
}

const FileUploader: React.FC<FileUploaderProps> = ({ text, onChange, accepts }) => {
  return (
    <label className="file-uploader">
      {text}
      <input 
        accept={accepts} 
        onChange={onChange} 
        className="file-uploader__input" 
        type="file" />
    </label>
  );
};

export default FileUploader;
