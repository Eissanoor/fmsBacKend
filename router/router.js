import express from "express";
import upload from "../config/multerConfig.js";
import multer from "multer";
const router = express.Router();

import FATSDBODBC from "../controllers/controllersODBC.js";

import FATSDB from "../controllers/controlletrsMSSQL.js";
import {
  checkAuthentication,
  checkRole,
  generateToken,
} from "../helpers/apiAuth.js";
import logoUpload from "../config/multerLogoConfig.js";

const storage = multer.diskStorage({
  destination: "../uploads",
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
var uploadee = multer({
  storage: storage,
  limits: { fileSize: 1000000000000000000000 },
});
router.use("/profile", express.static("uploads"));
const cpUpload = upload.fields([
  { name: "EmployeeImage" },
  { name: "selfieIDImage" },
]);
router.post("/AddworkRequestPOST", cpUpload, FATSDB.AddworkRequestPOST);
router.get("/getworkRequest/:EmployeeID", FATSDB.getworkRequest);
router.get("/getAllLISTworkRequest", FATSDB.getAllLISTworkRequest);
router.put(
  "/updateWorkRequest/:EmployeeID",
  cpUpload,
  FATSDB.updateWorkRequest
);
router.delete("/deleteWorkRequest/:EmployeeID", FATSDB.deleteWorkRequest);
export default router;
