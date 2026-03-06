import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "../config/s3.js";
import { fileTypeFromBuffer } from "file-type";



// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     //  Compress & Resize using Sharp
//     const optimizedImage = await sharp(req.file.buffer)
//       .resize(800, 800, { fit: "inside" })
//       .webp({ quality: 80 })
//       .toBuffer();

//     //  Generate unique filename
//     const fileName = `products/${uuidv4()}.webp`;

//     //  Upload to S3
//     await s3.send(
//       new PutObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: fileName,
//         Body: optimizedImage,
//         ContentType: "image/webp",
//          CacheControl: "public, max-age=31536000" // CDN caching
//       })
//     );

//     // // Construct Image URL
//     // const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

//        // cdn url (instead of direct S3 URL)
//     const imageUrl = `${process.env.CDN_BASE_URL}/${fileName}`;

//     return res.status(200).json({
//       message: "Image uploaded successfully",
//       imageUrl,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Upload failed" });
//   }
// };

export const uploadProductImage= async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {

        const type = await fileTypeFromBuffer(file.buffer);
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!type || !allowedTypes.includes(type.mime)) {
          throw new Error("Invalid image detected");
        }

        const optimizedImage = await sharp(file.buffer)
          .resize(1200, 1200, { fit: "inside" })
          .webp({ quality: 85 })
          .toBuffer();

        const fileName = `products/${uuidv4()}.webp`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: optimizedImage,
            ContentType: "image/webp",
            ServerSideEncryption: "AES256",
            CacheControl: "public, max-age=31536000",
          })
        );

        return `${process.env.CDN_BASE_URL}/${fileName}`;
      })
    );

    return res.status(200).json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });

  } catch (error) {
   
    return res.status(500).json({ message: error.message });
  }
};