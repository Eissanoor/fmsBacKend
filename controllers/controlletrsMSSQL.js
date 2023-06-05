// using mssql .....................................................................................
import jwt from "jsonwebtoken";
import sql from "mssql";
import config from "../config/dbconfig.js";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
let jwtSecret = process.env.JWT_SECRET;
let jwtExpiration = process.env.JWT_EXPIRATION;
//get all data
function generateUpdateQuery(fields, tableName) {
  const updateFields = Object.keys(fields)
    .map((key) => `${key}=@${key}`)
    .join(",");

  return `UPDATE ${tableName} SET ${updateFields}`;
}
const FATSDB = {
  async AddworkRequestPOST(req, res, next) {
    try {
      const file = req.files["EmployeeImage"];

      const url = `http://gs1ksa.org:3021/api/profile/${file[0].filename}`;
      const EmployeeID = req.body.EmployeeID;
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("Firstname", sql.VarChar, req.body.Firstname)
        .input("Middlename", sql.VarChar, req.body.Middlename)
        .input("Lastname", sql.VarChar, req.body.Lastname)
        .input("EmployeeImage", sql.VarChar, url)
        .input("MobileaNumber", sql.VarChar, req.body.MobileaNumber)
        .input("LandlineNumber", sql.VarChar, req.body.LandlineNumber)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("HiringDate", sql.Date, req.body.HiringDate)

        .query(
          ` 
            INSERT INTO [dbo].[tblEmployeeMaster]
                       ([EmployeeID]
                        ,[Firstname]
                         ,[Middlename]
                          ,[Lastname]
                           ,[EmployeeImage]
                            ,[MobileaNumber]
                             ,[LandlineNumber]
                               ,[BuildingCode]
                              ,[DepartmentCode]
                               ,[LocationCode]
                                ,[HiringDate]
                     
                        )
                 VALUES
                       (@EmployeeID
                       
                               ,@Firstname
                                 ,@Middlename
                                   ,@Lastname
                                     ,@EmployeeImage
                                       ,@MobileaNumber
                                         ,@LandlineNumber
                                             ,@BuildingCode
                                           ,@DepartmentCode
                                             ,@LocationCode
                                               ,@HiringDate
                                              
                       )
                    

                     
                       
                       
            `
        );
      //
      let dataaa = await pool
        .request()
        .input("EmployeeID", sql.VarChar, EmployeeID)
        .query(`select * from tblEmployeeMaster where EmployeeID=@EmployeeID`);
      res.status(201).json(dataaa);
      console.log(dataaa);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async getworkRequest(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `select * from tblEmployeeMaster where EmployeeID='${EmployeeID}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async getAllLISTworkRequest(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select * from tblEmployeeMaster `);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async updateWorkRequest(req, res, next) {
    try {
      const file = req.files["EmployeeImage"];

      const url = `http://gs1ksa.org:3021/api/profile/${file[0].filename}`;
      const EmployeeID = req.params.EmployeeID;
      let pool = await sql.connect(config);

      var today = new Date();

      let data = await pool
        .request()

        .input("Firstname", sql.VarChar, req.body.Firstname)
        .input("Middlename", sql.VarChar, req.body.Middlename)
        .input("Lastname", sql.VarChar, req.body.Lastname)
        .input("EmployeeImage", sql.VarChar, url)
        .input("MobileaNumber", sql.VarChar, req.body.MobileaNumber)
        .input("LandlineNumber", sql.VarChar, req.body.LandlineNumber)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("HiringDate", sql.Date, today).query(`

    
   UPDATE [dbo].[tblEmployeeMaster]
SET
[Firstname] =@Firstname
,[Middlename] =@Middlename
,[Lastname] =@Lastname
,[EmployeeImage] =@EmployeeImage
,[MobileaNumber] =@MobileaNumber
,[LandlineNumber] =@LandlineNumber

,[DepartmentCode] =@DepartmentCode
,[LocationCode] =@LocationCode
,[BuildingCode] =@BuildingCode

,[HiringDate] =@HiringDate



 
 



  
  
WHERE EmployeeID='${EmployeeID}'`);
      res.status(202).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async deleteWorkRequest(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `delete from tblEmployeeMaster where EmployeeID='${EmployeeID}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  }, //

  async AddworkRequestsecondPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.body.EmployeeID;
      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("RequestDateTime", sql.DateTime, req.body.RequestDateTime)
        .input("WorkType", sql.VarChar, req.body.WorkType)
        .input("WorkTrade", sql.VarChar, req.body.WorkTrade)
        .input("WorkOrder", sql.VarChar, req.body.WorkOrder)
        .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
        .input("ProblemCategory", sql.VarChar, req.body.ProblemCategory)
        .input("ProblemDescription", sql.VarChar, req.body.ProblemDescription)
        .input("AssetItemTag", sql.VarChar, req.body.AssetItemTag)
        .input("CompletedByEmp", sql.VarChar, req.body.CompletedByEmp)
        .input("FeedbackEmp", sql.VarChar, req.body.FeedbackEmp)
        .input("Feedback_Remarks", sql.VarChar, req.body.Feedback_Remarks)

        .query(
          ` 
            INSERT INTO [dbo].[tblWorkRequest]
                       ([EmployeeID]
                        ,[RequestDateTime]
                        ,[WorkType]
                         ,[WorkTrade]
                          ,[WorkPriority]
                            ,[WorkOrder]
                           ,[ProblemCategory]
                            ,[ProblemDescription]
                             ,[AssetItemTag]
                               ,[CompletedByEmp]
                              ,[FeedbackEmp]
                             
                                ,[Feedback_Remarks]
                     
                        )
                 VALUES
                       (@EmployeeID
                       
                               ,@RequestDateTime
                                 ,@WorkType
                                   ,@WorkTrade
                                     ,@WorkPriority
                                       ,@WorkOrder
                                       ,@ProblemCategory
                                         ,@ProblemDescription
                                             ,@AssetItemTag
                                           ,@CompletedByEmp
                                             ,@FeedbackEmp
                                               ,@Feedback_Remarks
                                              
                       )
                    

                     
                       
                       
            `
        );
      //
      let dataaa = await pool
        .request()
        .input("EmployeeID", sql.VarChar, EmployeeID)
        .query(`select * from tblWorkRequest where EmployeeID=@EmployeeID`);
      res.status(201).json(dataaa);
      console.log(dataaa);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async getworkRequestsecond(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(`select * from tblWorkRequest where EmployeeID='${EmployeeID}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async getAllLISTworkRequestSecondWork(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select * from tblWorkRequest `);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
};
export default FATSDB;
