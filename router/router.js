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
router.post("/WorkStatus_post", FATSDB.WorkStatus_post);
router.post("/Workpriority_post", FATSDB.Workpriority_post);
router.post("/WorkCatagres_post", FATSDB.WorkCatagres_post);
router.post("/Department_post", FATSDB.Department_post);
router.post("/Building_post", FATSDB.Building_post);
router.post("/Location_post", FATSDB.Location_post);
router.post("/ProblemCategory_post", FATSDB.ProblemCategory_post);
router.post("/RequestStatus_post", FATSDB.RequestStatus_post);
router.post("/Failure_post", FATSDB.Failure_post);
router.post("/Solution_post", FATSDB.Solution_post);
router.post("/AddworkRequestsecondPOST", FATSDB.AddworkRequestsecondPOST);
router.post("/Days_post", FATSDB.Days_post);
router.post("/Frequency_post", FATSDB.Frequency_post);
//--------------------------------------------------------------------------

//-------------------------------GET_API---------------------------------------------
router.get("/WorkType_GET_BYID/:WorkTypeCode", FATSDB.WorkType_GET_BYID);
router.get("/WorkType_GET_LIST", FATSDB.WorkType_GET_LIST);
router.get("/WorkTRADE_GET_LIST", FATSDB.WorkTRADE_GET_LIST);
router.get("/WorkTRADE_GET_BYID/:WorkTypeCode", FATSDB.WorkTRADE_GET_BYID);
router.get("/WorkStatus_GET_LIST", FATSDB.WorkStatus_GET_LIST);
router.get("/WorkStatus_GET_BYID/:WorkStatusCode", FATSDB.WorkStatus_GET_BYID);
router.get("/WorkPriority_GET_LIST", FATSDB.WorkPriority_GET_LIST);
router.get(
  "/WorkPriority_GET_BYID/:WorkPriorityCode",
  FATSDB.WorkPriority_GET_BYID
);
router.get("/WorkCatagres_GET_LIST", FATSDB.WorkCatagres_GET_LIST);
router.get(
  "/WorkCatagres_GET_BYID/:WorkCategoryCode",
  FATSDB.WorkCatagres_GET_BYID
);
router.get("/Department_GET_LIST", FATSDB.Department_GET_LIST);
router.get("/Department_GET_BYID/:DepartmentCode", FATSDB.Department_GET_BYID);
router.get("/Building_GET_LIST", FATSDB.Building_GET_LIST);
router.get("/Building_GET_BYID/:BuildingCode", FATSDB.Building_GET_BYID);
router.get("/Location_GET_LIST", FATSDB.Location_GET_LIST);
router.get("/Location_GET_BYID/:LocationCode", FATSDB.Location_GET_BYID);
router.get("/ProblemCategory_GET_LIST", FATSDB.ProblemCategory_GET_LIST);
router.get(
  "/ProblemCategory_GET_BYID/:ProblemCategoryCode",
  FATSDB.ProblemCategory_GET_BYID
);
router.get("/RequestStatus_GET_LIST", FATSDB.RequestStatus_GET_LIST);
router.get(
  "/RequestStatus_GET_BYID/:RequestStatusCode",
  FATSDB.RequestStatus_GET_BYID
);
router.get("/Failure_GET_LIST", FATSDB.Failure_GET_LIST);
router.get("/Failure_GET_BYID/:FailureStatusCode", FATSDB.Failure_GET_BYID);
router.get("/Solution_GET_LIST", FATSDB.Solution_GET_LIST);
router.get("/Solution_GET_BYID/:SolutiontatusCode", FATSDB.Solution_GET_BYID);
router.post("/getworkRequest", FATSDB.getworkRequest);
router.post("/getworkRequestsecond", FATSDB.getworkRequestsecond);
router.get("/Department_LIST", FATSDB.Department_LIST);
router.get("/Building_LIST", FATSDB.Building_LIST);
router.get("/Location_LIST", FATSDB.Location_LIST);
router.get("/WorkType_LIST", FATSDB.WorkType_LIST);
router.get("/WorkPriority_LIST", FATSDB.WorkPriority_LIST);
router.get("/WorkTrade_LIST/:WorkTypeCode", FATSDB.WorkTrade_LIST);
router.get("/AssetType_LIST", FATSDB.AssetType_LIST);
router.get("/ProblemCategory_LIST", FATSDB.ProblemCategory_LIST);
router.get("/RequestStatus_LIST", FATSDB.RequestStatus_LIST);
router.get(
  "/Department_desc_LIST/:DepartmentCode",
  FATSDB.Department_desc_LIST
);
router.get("/WorkType_descri_LIST/:WorkTypeCode", FATSDB.WorkType_descri_LIST);
router.get(
  "/WorkTrade_descri_LIST/:WorkTradeCode",
  FATSDB.WorkTrade_descri_LIST
);
router.get(
  "/AssetType_descrip_LIST/:AssetItemTagID",
  FATSDB.AssetType_descrip_LIST
);
router.get(
  "/ProblemCategory_descrip_LIST/:ProblemCategoryCode",
  FATSDB.ProblemCategory_descrip_LIST
);
router.get(
  "/AssetType_model_all_LIST/:AssetItemDescription",
  FATSDB.AssetType_model_all_LIST
);
router.get("/Transactions_LIST/:EmployeeID", FATSDB.Transactions_LIST);
router.get("/Days_GET_LIST", FATSDB.Days_GET_LIST);
router.get("/Days_GET_BYID/:DaysCode", FATSDB.Days_GET_BYID);
router.get("/Frequency_GET_LIST", FATSDB.Frequency_GET_LIST);
router.get("/Frequency_GET_BYID/:FreqCode", FATSDB.Frequency_GET_BYID);
//------------------------------------------------------------------------------
//-----------------------------------PUT_API-------------------------------------
router.put("/WorkTrade_Put/:WorkTypeCode", FATSDB.WorkTrade_Put);
router.put("/WorkType_Put/:WorkTypeCode", FATSDB.WorkType_Put);
router.put("/WorkStatus_Put/:WorkStatusCode", FATSDB.WorkStatus_Put);
router.put("/WorkPriority_Put/:WorkPriorityCode", FATSDB.WorkPriority_Put);
router.put("/WorkCatagres_Put/:WorkCategoryCode", FATSDB.WorkCatagres_Put);
router.put("/Department_Put/:DepartmentCode", FATSDB.Department_Put);
router.put("/Building_Put/:BuildingCode", FATSDB.Building_Put);
router.put("/Location_Put/:LocationCode", FATSDB.Location_Put);
router.put(
  "/ProblemCategory_Put/:ProblemCategoryCode",
  FATSDB.ProblemCategory_Put
);
router.put("/RequestStatus_Put/:RequestStatusCode", FATSDB.RequestStatus_Put);
router.put("/Failure_Put/:FailureStatusCode", FATSDB.Failure_Put);
router.put("/Solution_Put/:SolutiontatusCode", FATSDB.Solution_Put);
router.put("/updateWorkRequest", FATSDB.updateWorkRequest);
router.put("/updatesecondWorkRequest", FATSDB.updatesecondWorkRequest);
router.put("/Days_Put/:DaysCode", FATSDB.Days_Put);
router.put("/Frequency_Put/:FreqCode", FATSDB.Frequency_Put);
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
router.delete(
  "/WORKStatus_DELETE_BYID/:WorkStatusCode",
  FATSDB.WORKStatus_DELETE_BYID
);
router.delete(
  "/WORKPriority_DELETE_BYID/:WorkPriorityCode",
  FATSDB.WORKPriority_DELETE_BYID
);
router.delete(
  "/WORKCatagres_DELETE_BYID/:WorkCategoryCode",
  FATSDB.WORKCatagres_DELETE_BYID
);
router.delete(
  "/Department_DELETE_BYID/:DepartmentCode",
  FATSDB.Department_DELETE_BYID
);
router.delete(
  "/Building_DELETE_BYID/:BuildingCode",
  FATSDB.Building_DELETE_BYID
);
router.delete(
  "/Location_DELETE_BYID/:LocationCode",
  FATSDB.Location_DELETE_BYID
);
router.delete(
  "/ProblemCategory_DELETE_BYID/:ProblemCategoryCode",
  FATSDB.ProblemCategory_DELETE_BYID
);
router.delete(
  "/RequestStatus_DELETE_BYID/:RequestStatusCode",
  FATSDB.RequestStatus_DELETE_BYID
);
router.delete(
  "/Failure_DELETE_BYID/:FailureStatusCode",
  FATSDB.Failure_DELETE_BYID
);
router.delete(
  "/Solution_DELETE_BYID/:SolutiontatusCode",
  FATSDB.Solution_DELETE_BYID
);
router.delete("/DAYS_DELETE_BYID/:DaysCode", FATSDB.DAYS_DELETE_BYID);
router.delete("/Frequency_DELETE_BYID/:FreqCode", FATSDB.Frequency_DELETE_BYID);
//----------------------------------------------------------------------------////
export default router;
