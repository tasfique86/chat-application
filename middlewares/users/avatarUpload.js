const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, .jpeg, and .png formats allowed!",
  );

  // call the middleware function to handle the file upload
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        errors: {
          avatar: { msg: err.message },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
