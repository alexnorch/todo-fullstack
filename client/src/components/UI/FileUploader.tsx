interface FileUploaderProps {
  text: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ text }) => {
  return (
    <label className="file-uploader">
      {text}
      <input className="file-uploader__input" type="file" />
    </label>
  );
};

export default FileUploader;
