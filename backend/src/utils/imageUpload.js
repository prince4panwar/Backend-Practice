const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");

async function imageUpload(image) {
  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "todos" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
    streamifier.createReadStream(image.buffer).pipe(uploadStream);
  });

  return uploadResult.secure_url;
}

module.exports = { imageUpload };
