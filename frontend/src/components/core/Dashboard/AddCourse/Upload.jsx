import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import ReactPlayer from "react-player";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4", ".mov", ".avi"] },
    onDrop,
    multiple: false,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  // Register field with React Hook Form
  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  // Update form value whenever file changes
  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm text-gray-700 font-medium" htmlFor={name}>
        {label} {!viewData && <sup className="text-red-500">*</sup>}
      </label>

      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed transition-all duration-300 ${
          isDragActive ? "bg-gray-200 border-gray-400" : "bg-gray-100 border-gray-300"
        }`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col p-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-auto w-full rounded-md object-cover"
              />
            ) : (
              <div className="w-full rounded-md overflow-hidden">
                <ReactPlayer
                  url={previewSource}
                  controls
                  width="100%"
                  height="auto"
                />
              </div>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-sm text-gray-600 underline hover:text-gray-800 transition"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6 text-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-gray-200">
              <FiUploadCloud className="text-3xl text-gray-600" />
            </div>

            <p className="mt-3 max-w-[220px] text-sm text-gray-600">
              Drag & drop a {!video ? "photo" : "video"} here, or click{" "}
              <span className="font-semibold text-blue-600">Browse</span> to upload.
            </p>

            <ul className="mt-6 flex flex-col sm:flex-row sm:space-x-10 text-xs text-gray-500 justify-center items-center">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {/* Error message */}
      {errors[name] && (
        <span className="ml-2 text-xs text-red-500">{label} is required</span>
      )}
    </div>
  );
}
