"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function useCloudinaryMultipleFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleMultipleFileUpload = async (files: FileList) => {
    if (files.length > 0) {
      setUploading(true);
      const formDataArray = Array.from(files).map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "notes-app-unsigned");
        return formData;
      });

      try {
        const uploadPromises = formDataArray.map((formData) =>
          fetch("https://api.cloudinary.com/v1_1/dubzpy7hn/image/upload", {
            method: "POST",
            body: formData,
          }).then((response) => response.json())
        );

        const uploadResults = await Promise.all(uploadPromises);
        const urls = uploadResults.map((data) => data.url);
        setImageUrls(urls);
        toast.success("Images uploaded successfully");
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading images");
      } finally {
        setUploading(false);
      }
    }
  };

  return { uploading, handleMultipleFileUpload, imageUrls };
}
