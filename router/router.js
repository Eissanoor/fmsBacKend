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
//----------------POST_API---------------------------------------------------------
router.post("/AddworkRequestPOST", FATSDB.AddworkRequestPOST);
router.post(
  "/AddDepartmentInworkRequestPOST",
  FATSDB.AddDepartmentInworkRequestPOST
);
router.post(
  "/AddBuildingInworkRequestPOST",
  FATSDB.AddBuildingInworkRequestPOST
);
router.post(
  "/AddLocationInworkRequestPOST",
  FATSDB.AddLocationInworkRequestPOST
);
router.post(
  "/AddWorkTypeInworkRequestPOST",
  FATSDB.AddWorkTypeInworkRequestPOST
);
router.post(
  "/AddWorkPriorityInworkRequestPOST",
  FATSDB.AddWorkPriorityInworkRequestPOST
);
router.post(
  "/AddWorkTradeInworkRequestPOST",
  FATSDB.AddWorkTradeInworkRequestPOST
);
router.post(
  "/AddassetItemInworkRequestPOST",
  FATSDB.AddassetItemInworkRequestPOST
);
router.post(
  "/AddAssetItemTagIDInworkRequestPOST",
  FATSDB.AddAssetItemTagIDInworkRequestPOST
);
router.post(
  "/AddprmProblemCategoryInworkRequestPOST",
  FATSDB.AddprmProblemCategoryInworkRequestPOST
);
router.post("/WorkType_post", FATSDB.WorkType_post);
router.post("/WorkTrade_post", FATSDB.WorkTrade_post);
//--------------------------------------------------------------------------

//-------------------------------GET_API---------------------------------------------
router.get("/WorkType_GET_BYID/:WorkTypeCode", FATSDB.WorkType_GET_BYID);
router.get("/WorkType_GET_LIST", FATSDB.WorkType_GET_LIST);
router.get("/WorkTRADE_GET_LIST", FATSDB.WorkTRADE_GET_LIST);
//------------------------------------------------------------------------------
//-----------------------------------PUT_API-------------------------------------
router.put("/WorkTrade_Put/:WorkTypeCode", FATSDB.WorkTrade_Put);
router.put("/WorkType_Put/:WorkTypeCode", FATSDB.WorkType_Put);
//--------------------------------------------------------------------------------
//-----------------------------------DELETE_API-----------------------------------------
router.delete(
  "/WORKTYPE_DELETE_BYID/:WorkTypeCode",
  FATSDB.WORKTYPE_DELETE_BYID
);
router.delete(
  "/WORKTRADE_DELETE_BYID/:WorkTypeCode",
  FATSDB.WORKTRADE_DELETE_BYID
);
//----------------------------------------------------------------------------
export default router;
