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
router.post("/WorkRequestItems_post", FATSDB.WorkRequestItems_post);
router.post("/Gender_post", FATSDB.Gender_post);
router.post("/Title_post", FATSDB.Title_post);
router.post("/MaritalStatus_post", FATSDB.MaritalStatus_post);
router.post("/Nationality_post", FATSDB.Nationality_post);
router.post("/AssetsMaster_post", FATSDB.AssetsMaster_post);
router.post("/AssetType_post", FATSDB.AssetType_post);
router.post("/AssetCategory_post", FATSDB.AssetCategory_post);
router.post("/AssetSubCategory_post", FATSDB.AssetSubCategory_post);
router.post("/AssetCondition_post", FATSDB.AssetCondition_post);
router.post("/WarrantyPeriod_post", FATSDB.WarrantyPeriod_post);
router.post("/EmployeeMaster_post", FATSDB.EmployeeMaster_post)
router.post("/assetworkrequest_post", FATSDB.assetworkrequest_post)
router.post("/Designation_post",FATSDB.Designation_post)
router.post("/EmployeeStatus_post", FATSDB.EmployeeStatus_post)
router.post("/WorkOrders_post", FATSDB.WorkOrders_post)
router.post("/SystemModules_post", FATSDB.SystemModules_post)
router.post("/VendorMaster_post",FATSDB.VendorMaster_post)
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
router.get("/getworkRequestsecond", FATSDB.getworkRequestsecond);
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
router.get(
  "/WorkRequestItems_GET_BYID/:RequestNumber",
  FATSDB.WorkRequestItems_GET_BYID
);
router.get("/workRequest_GET_LIST", FATSDB.workRequest_GET_LIST);
router.get("/Employeenumber_GET_LIST", FATSDB.Employeenumber_GET_LIST);
router.get("/WorkRequestItems_GET_LIST", FATSDB.WorkRequestItems_GET_LIST);
router.get("/Gender_GET_BYID/:GenderCode", FATSDB.Gender_GET_BYID);
router.get("/Gender_GET_LIST", FATSDB.Gender_GET_LIST);
router.get("/Title_GET_LIST", FATSDB.Title_GET_LIST);
router.get("/Title_GET_BYID/:TitleCode", FATSDB.Title_GET_BYID);
router.get(
  "/MaritalStatus_GET_BYID/:MaritalCode",
  FATSDB.MaritalStatus_GET_BYID
);
router.get("/MaritalStatus_GET_LIST", FATSDB.MaritalStatus_GET_LIST);
router.get(
  "/Nationality_GET_BYID/:NationalityCode",
  FATSDB.Nationality_GET_BYID
);
router.get("/Nationality_GET_LIST", FATSDB.Nationality_GET_LIST);
router.get(
  "/AssetsMaster_GET_BYID/:AssetItemDescription",
  FATSDB.AssetsMaster_GET_BYID
);
router.get("/AssetsMaster_GET_LIST", FATSDB.AssetsMaster_GET_LIST);
router.get("/AssetType_GET_BYID/:AssetTypeCode", FATSDB.AssetType_GET_BYID);
router.get("/AssetType_GET_LIST", FATSDB.AssetType_GET_LIST);
router.get(
  "/AssetCategory_GET_BYID/:AssetCategoryCode",
  FATSDB.AssetCategory_GET_BYID
);
router.get("/AssetCategory_GET_LIST", FATSDB.AssetCategory_GET_LIST);
router.get("/AssetSubCategory_GET_LIST", FATSDB.AssetSubCategory_GET_LIST);
router.get(
  "/AssetSubCategory_GET_BYID/:AssetSubCategoryCode",
  FATSDB.AssetSubCategory_GET_BYID
);
router.get(
  "/AssetCondition_GET_BYID/:AssetConditionCode",
  FATSDB.AssetCondition_GET_BYID
);
router.get("/AssetCondition_GET_LIST", FATSDB.AssetCondition_GET_LIST);
router.get(
  "/WarrantyPeriod_GET_BYID/:WarrantyPeriodCode",
  FATSDB.WarrantyPeriod_GET_BYID
);
router.get("/WarrantyPeriod_GET_LIST", FATSDB.WarrantyPeriod_GET_LIST);
router.get("/EmployeeMaster_GET_BYID/:EmployeeID", FATSDB.EmployeeMaster_GET_BYID);
router.get("/EmployeeMaster_GET_LIST", FATSDB.EmployeeMaster_GET_LIST)
router.get("/assetworkrequest_GET_BYID/:RequestNumber", FATSDB.assetworkrequest_GET_BYID)
router.get("/tblAssetsMaster_GET_BYID/:AssetItemDescription", FATSDB.tblAssetsMaster_GET_BYID)
router.get("/workRequestCount_GET_BYID/:No", FATSDB.workRequestCount_GET_BYID)
router.get("/EmployeeID_GET_LIST", FATSDB.EmployeeID_GET_LIST)
router.get("/Nationality_GET_LIST_Nationality", FATSDB.Nationality_GET_LIST_Nationality)
router.get("/Nationality_GET_LIST_NationalityDES/:NationalityCode", FATSDB.Nationality_GET_LIST_NationalityDES)
router.get("/Designation_GET_LIST", FATSDB.Designation_GET_LIST)
router.get("/Designation_GET_BYID/:DesignationCode",FATSDB.Designation_GET_BYID)
router.post("/getworkRequest_by_EPID", FATSDB.getworkRequest_by_EPID)
router.get("/Filter_WR",FATSDB.Filter_WR)
router.get("/Designation_GET_LIST", FATSDB.Designation_GET_LIST)
router.get("/Designation_GET_BYID/:DesignationCode", FATSDB.Designation_GET_BYID)
router.get("/EmployeeStatus_GET_BYID/:EmployeeStatusCode", FATSDB.EmployeeStatus_GET_BYID)
router.get("/EmployeeStatus_GET_LIST", FATSDB.EmployeeStatus_GET_LIST)
router.get("/WorkCatagres_GET_CODE_LIST", FATSDB.WorkCatagres_GET_CODE_LIST)
router.get("/Failure_GET_CODELIST", FATSDB.Failure_GET_CODELIST)
router.get("/Solution_GET_CODE_LIST", FATSDB.Solution_GET_CODE_LIST)
router.get("/WorkOrders_GET_LIST", FATSDB.WorkOrders_GET_LIST)
router.get("/WorkOrders_GET_BYID/:WorkOrderNumber", FATSDB.WorkOrders_GET_BYID)
router.get("/SystemModules_GET_BYID/:SystemModuleCode", FATSDB.SystemModules_GET_BYID)
router.get("/SystemModules_GET_LIST", FATSDB.SystemModules_GET_LIST)
router.get("/VendorMaster_GET_BYID/:VendorID", FATSDB.VendorMaster_GET_BYID)
router.get("/VendorMaster_GET_LIST",FATSDB.VendorMaster_GET_LIST)
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
router.put("/Gender_Put/:GenderCode", FATSDB.Gender_Put);
router.put("/Title_Put/:TitleCode", FATSDB.Title_Put);
router.put("/MaritalStatus_Put/:MaritalCode", FATSDB.MaritalStatus_Put);
router.put("/Nationality_Put/:NationalityCode", FATSDB.Nationality_Put);
router.put("/AssetsMaster_Put/:AssetItemDescription", FATSDB.AssetsMaster_Put);
router.put("/AssetType_Put/:AssetTypeCode", FATSDB.AssetType_Put);
router.put("/AssetCategory_Put/:AssetCategoryCode", FATSDB.AssetCategory_Put);
router.put(
  "/AssetSubCategory_Put/:AssetSubCategoryCode",
  FATSDB.AssetSubCategory_Put
);
router.put(
  "/AssetCondition_Put/:AssetConditionCode",
  FATSDB.AssetCondition_Put
);
router.put(
  "/WarrantyPeriod_Put/:WarrantyPeriodCode",
  FATSDB.WarrantyPeriod_Put
);
router.put("/EmployeeMaster_Put/:EmployeeID", FATSDB.EmployeeMaster_Put)
router.put("/AssetsMaster_Put_status/:AssetItemDescription", FATSDB.AssetsMaster_Put_status)
router.put("/workRequestCount_Put/:No", FATSDB.workRequestCount_Put)
router.put("/EmployeeIDCount_Put/:No", FATSDB.EmployeeIDCount_Put)
router.put("/Designation_Put/:DesignationCode", FATSDB.Designation_Put)
router.put("/EmployeeStatus_Put/:EmployeeStatusCode", FATSDB.EmployeeStatus_Put)
router.put("/WorkOrderNumberCount_Put/:No", FATSDB.WorkOrderNumberCount_Put)
router.put("/WorkOrders_Put/:WorkOrderNumber", FATSDB.WorkOrders_Put)
router.put("/SystemModules_Put/:SystemModuleCode", FATSDB.SystemModules_Put)
router.put("/VendorMaster_Put/:VendorID",FATSDB.VendorMaster_Put)
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
router.delete("/Gender_DELETE_BYID/:GenderCode", FATSDB.Gender_DELETE_BYID);
router.delete("/Title_DELETE_BYID/:TitleCode", FATSDB.Title_DELETE_BYID);
router.delete(
  "/MaritalStatus_DELETE_BYID/:MaritalCode",
  FATSDB.MaritalStatus_DELETE_BYID
);
router.delete(
  "/Nationality_DELETE_BYID/:NationalityCode",
  FATSDB.Nationality_DELETE_BYID
);
router.delete(
  "/AssetsMaster_DELETE_BYID/:AssetItemDescription",
  FATSDB.AssetsMaster_DELETE_BYID
);
router.delete(
  "/AssetType_DELETE_BYID/:AssetTypeCode",
  FATSDB.AssetType_DELETE_BYID
);
router.delete(
  "/AssetCategory_DELETE_BYID/:AssetCategoryCode",
  FATSDB.AssetCategory_DELETE_BYID
);
router.delete(
  "/AssetSubCategory_DELETE_BYID/:AssetSubCategoryCode",
  FATSDB.AssetSubCategory_DELETE_BYID
);
router.delete(
  "/AssetCondition_DELETE_BYID/:AssetConditionCode",
  FATSDB.AssetCondition_DELETE_BYID
);
router.delete(
  "/WarrantyPeriod_DELETE_BYID/:WarrantyPeriodCode",
  FATSDB.WarrantyPeriod_DELETE_BYID
);
router.delete("/EmployeeMaster_DELETE_BYID/:EmployeeID", FATSDB.EmployeeMaster_DELETE_BYID)
router.delete("/assetworkrequest_DELETE_BYID/:seq", FATSDB.assetworkrequest_DELETE_BYID)
router.delete("/all_work_request_DELETE_BYID/:RequestNumber", FATSDB.all_work_request_DELETE_BYID)
router.delete("/Designation_DELETE_BYID/:DesignationCode", FATSDB.Designation_DELETE_BYID)
router.delete("/EmployeeStatus_DELETE_BYID/:EmployeeStatusCode", FATSDB.EmployeeStatus_DELETE_BYID)
router.delete("/WorkOrders_DELETE_BYID/:WorkOrderNumber", FATSDB.WorkOrders_DELETE_BYID)
router.delete("/SystemModules_DELETE_BYID/:SystemModuleSeq", FATSDB.SystemModules_DELETE_BYID)
router.delete("/VendorMaster_DELETE_BYID/:VendorID",FATSDB.VendorMaster_DELETE_BYID)
//----------------------------------------------------------------------------////
export default router;
