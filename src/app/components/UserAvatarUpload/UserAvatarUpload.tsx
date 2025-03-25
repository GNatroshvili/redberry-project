import { useState, useRef } from "react";
import styles from "./UserAvatarUpload.module.css";

export default function UserAvatarUpload() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  return (
    <div>
      <p className={styles.avatarTitle}>ავატარი*</p>
      <div className={styles.container}>
        {avatar ? (
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarPreview}>
              <img src={avatar} alt="Avatar" className={styles.avatarImage} />
            </div>
              <img className={styles.trash} onClick={handleRemoveAvatar} src="/trash.svg" alt="trash" />
          </div>
        ) : (
          <div className={styles.uploadButton} onClick={handleButtonClick}>
            <div className={styles.uploadIcon}>
              <img src="./image-upload.svg" alt="upload-icon" />
            </div>
            <span className={styles.upload}>ატვირთე ფოტო</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}