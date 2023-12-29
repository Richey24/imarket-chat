import React, { useCallback, useEffect, useRef, useState } from "react";
import { UseUploadImageUrl } from "../../utils/uploadimage";

const ImagePicker = ({ setFiles, style }) => {
  const imageUploader = useRef(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const getImageUrl = UseUploadImageUrl();

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (images.length > 0) {
        setLoading(true);
        const url = await getImageUrl(images[0]);
        setImageUrl(url);
        setLoading(false);
      }
    };

    fetchImageUrl();
  }, [images]);

  const handleImageUpload = useCallback(
    async (event) => {
      if (event.target.files) {
        setLoading(true);
        const filesArray = Array.from(event.target.files);
        setImages((prev) => [...filesArray, ...prev]);
        const url = await getImageUrl(event.target.files[0]);
        setImageUrl(url);
        setFiles?.(url);
        setLoading(false);
      }
    },
    [images]
  );
  return (
    <div className="imageContainer" style={!style ? {} : style}>
      {!imageUrl && <p>Click here to upload avatar</p>}
      <div
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : {}
        }
        className="imagePicker"
        onClick={() => imageUploader?.current?.click()}
      >
        {loading && <p>Loading...</p>}
        <input
          accept="image/*"
          id="image-upload"
          multiple
          type="file"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImagePicker;
