import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename:(req,file,cb)=>{
    const fileExt = path.extname(file.originalname)
    const filename = file.originalname.replace(fileExt," ").toLocaleLowerCase().split(" ").join("-")+"-"+Date.now()
    cb(null,filename+fileExt)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1000000, // 1mb
  },
  fileFilter: (req, file, cb) => {
    // console.log(file);
    if (
      file?.mimetype === "image/jpg" ||
      file?.mimetype === "image/png" ||
      file?.mimetype === "image/jpeg" ||
      file?.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File format is not valid"));
    }
  },
});

export default upload;
