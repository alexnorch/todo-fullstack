import "./FileUploader.scss";

const FileUploader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <label className="file-uploader">
      {text}
      <input className="file-uploader__input" type="file" />
    </label>
  );
};

export default FileUploader;
