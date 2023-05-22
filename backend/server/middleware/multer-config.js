const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, './server/images');
    callback(null, '../frontend/public/assets/uploads');
    // callback(null, path.join(__dirname, "../../frontend/public/assets/uploads"));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } }).single('avatar');