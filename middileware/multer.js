const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

module.exports = {
  multer: upload,
};
//The multer library is imported to handle file uploads.
//A new instance of multer is created with an in-memory storage engine.
//This multer instance is exported, allowing other modules to use it for handling file uploads without storing them on disk.