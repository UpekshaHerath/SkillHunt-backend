const fs = require("fs");
const multer = require("multer");

// Ensure uploads folder structure exists
const createFolderStructure = () => {
  const folders = ["uploads/images", "uploads/documents", "uploads/others"];
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  });
};

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('File Type:', file.mimetype);
    const fileType = file.mimetype.split("/")[0]; // e.g., 'image', 'application'
    let folder = "uploads/others"; 
    if (fileType === "image") {
      folder = "uploads/images";
    } else if (fileType === "application") {
      folder = "uploads/documents";
    } 
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

module.exports = {
  createFolderStructure,
  upload,
};
