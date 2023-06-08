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
  //----------------------------------------------POST--------------------------------
  async AddworkRequestPOST(req, res, next) {
    try {
      const EmployeeID = req.body.EmployeeID;
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("Firstname", sql.VarChar, req.body.Firstname)
        .input("Middlename", sql.VarChar, req.body.Middlename)
        .input("Lastname", sql.VarChar, req.body.Lastname)

        .input("MobileNumber", sql.VarChar, req.body.MobileNumber)
        .input("LandlineNumber", sql.VarChar, req.body.LandlineNumber)

        .query(
          ` 
            INSERT INTO [dbo].[tblEmployeeMaster]
                       ([EmployeeID]
                        ,[Firstname]
                         ,[Middlename]
                          ,[Lastname]
                          
                            ,[MobileNumber]
                             ,[LandlineNumber]
                             
                     
                        )
                 VALUES
                       (@EmployeeID
                       
                               ,@Firstname
                                 ,@Middlename
                                   ,@Lastname
                                   
                                       ,@MobileNumber
                                         ,@LandlineNumber
                                           
                                              
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
  async AddDepartmentInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("DepartmentDesc", sql.VarChar, req.body.DepartmentDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmDepartment]
                       ([DepartmentCode]
                        ,[DepartmentDesc]
                     
                     
                        )
                 VALUES
                       (@DepartmentCode
                       
                               ,@DepartmentDesc
                          
                                           
                                              
                       )
                    

                     
                       
                       
            `
        );
      //

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddBuildingInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("BuildingDesc", sql.VarChar, req.body.BuildingDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmBuilding]
                       ([BuildingCode]
                        ,[BuildingDesc]
                     
                     
                        )
                 VALUES
                       (@BuildingCode
                       
                               ,@BuildingDesc
                          
                                           
                                              
                       )
                    

                     
                       
                       
            `
        );
      //

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddLocationInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("LocationDesc", sql.VarChar, req.body.LocationDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmLocation]
                       ([LocationCode]
                        ,[LocationDesc]
                        )
                 VALUES
                       (@LocationCode
                       
                               ,@LocationDesc                   
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddWorkTypeInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("WorkTypeCode", sql.VarChar, req.body.WorkTypeCode)
        .input("WorkTypeDesc", sql.VarChar, req.body.WorkTypeDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmWorkType]
                       ([WorkTypeCode]
                        ,[WorkTypeDesc]
                        )
                 VALUES
                       (@WorkTypeCode
                       
                               ,@WorkTypeDesc                   
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddWorkPriorityInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("WorkPriorityCode", sql.VarChar, req.body.WorkPriorityCode)
        .input("WorkPriorityDesc", sql.VarChar, req.body.WorkPriorityDesc)
        .input("WorkPrioritySeq", sql.VarChar, req.body.WorkPrioritySeq)

        .query(
          ` 
            INSERT INTO [dbo].[prmWorkPriority]
                       ([WorkPriorityCode]
                        ,[WorkPriorityDesc]
                         ,[WorkPrioritySeq]
                        )
                 VALUES
                       (@WorkPriorityCode
                       
                               ,@WorkPriorityDesc    
                               ,@WorkPrioritySeq                 
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddWorkTradeInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("WorkTypeCode", sql.VarChar, req.body.WorkTypeCode)
        .input("WorkTradeCode", sql.VarChar, req.body.WorkTradeCode)
        .input("WorkTradeDesc", sql.VarChar, req.body.WorkTradeDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmWorkTrade]
                       ([WorkTypeCode]
                        ,[WorkTradeCode]
                         ,[WorkTradeDesc]
                        )
                 VALUES
                       (@WorkTypeCode
                       
                               ,@WorkTradeCode    
                               ,@WorkTradeDesc                 
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddassetItemInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input(
          "AssetItemDescription",
          sql.VarChar,
          req.body.AssetItemDescription
        )
        .input("AssetCategory", sql.VarChar, req.body.AssetCategory)
        .input("Manufacturer", sql.VarChar, req.body.Manufacturer)
        .input("Model", sql.VarChar, req.body.Model)

        .query(
          ` 
            INSERT INTO [dbo].[tblAssetsMaster]
                       ([AssetItemDescription]
                        ,[AssetCategory]
                         ,[Manufacturer]
                          ,[Model]
                      
                        )
                 VALUES
                       (@AssetItemDescription
                       
                               ,@AssetCategory    
                                 ,@Manufacturer 
                                   ,@Model 
                                            
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  //
  //----------------------------------------------POST--------------------------------
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
  async updatesecondWorkRequest(req, res, next) {
    try {
      const EmployeeID = req.params.EmployeeID;
      let pool = await sql.connect(config);

      var today = new Date();

      let data = await pool
        .request()

        .input("RequestDateTime", sql.DateTime, req.body.RequestDateTime)
        .input("WorkType", sql.VarChar, req.body.WorkType)
        .input("WorkTrade", sql.VarChar, req.body.WorkTrade)
        .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
        .input("ProblemCategory", sql.VarChar, req.body.ProblemCategory)
        .input("ProblemDescription", sql.VarChar, req.body.ProblemDescription)
        .input("AssetItemTag", sql.VarChar, req.body.AssetItemTag)
        .input("WorkOrder", sql.VarChar, req.body.WorkOrder)
        .input("CompletedByEmp", sql.VarChar, req.body.CompletedByEmp)
        .input("Feedback_Remarks", sql.VarChar, req.body.Feedback_Remarks)
        .input("FeedbackEmp", sql.VarChar, req.body.FeedbackEmp).query(`

    
   UPDATE [dbo].[tblWorkRequest]
SET
[RequestDateTime] =@RequestDateTime
,[WorkType] =@WorkType
,[WorkTrade] =@WorkTrade
,[WorkPriority] =@WorkPriority
,[ProblemCategory] =@ProblemCategory
,[ProblemDescription] =@ProblemDescription
,[AssetItemTag] =@AssetItemTag

,[WorkOrder] =@WorkOrder
,[CompletedByEmp] =@CompletedByEmp
,[Feedback_Remarks] =@Feedback_Remarks

,[FeedbackEmp] =@FeedbackEmp



 
 



  
  
WHERE EmployeeID='${EmployeeID}'`);
      res.status(202).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async deletesecondWorkRequest(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(`delete from tblWorkRequest where EmployeeID='${EmployeeID}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddworkOrderPOST(req, res, next) {
    try {
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
};
export default FATSDB;
