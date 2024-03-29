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
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)

        .query(
          ` 
            INSERT INTO [dbo].[tblEmployeeMaster]
                       ([EmployeeID]
                        ,[Firstname]
                         ,[Middlename]
                          ,[Lastname]
                          
                            ,[MobileNumber]
                             ,[LandlineNumber]
                              ,[DepartmentCode]
                               ,[BuildingCode]
                                ,[LocationCode]
                             
                     
                        )
                 VALUES
                       (@EmployeeID
                       
                               ,@Firstname
                                 ,@Middlename
                                   ,@Lastname
                                   
                                       ,@MobileNumber
                                         ,@LandlineNumber
                                            ,@DepartmentCode
                                               ,@BuildingCode
                                                  ,@LocationCode
                                            
                                              
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
  async AddAssetItemTagIDInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)

        .query(
          ` 
            INSERT INTO [dbo].[tblAssetTransactions]
                       ([AssetItemTagID]
                       
                        )
                 VALUES
                       (@AssetItemTagID
                       
                                             
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AddprmProblemCategoryInworkRequestPOST(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("ProblemCategoryCode", sql.VarChar, req.body.ProblemCategoryCode)
        .input("ProblemCategoryDesc", sql.VarChar, req.body.ProblemCategoryDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmProblemCategory]
                       ([ProblemCategoryCode]
                       ,[ProblemCategoryDesc]
                        )
                 VALUES
                       (@ProblemCategoryCode
                       ,@ProblemCategoryDesc
                                             
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkType_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.body.WorkTypeCode;
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
      let data1 = await pool
        .request()

        .query(
          `select * from prmWorkType where WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkTrade_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.body.WorkTypeCode;
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
      let data1 = await pool
        .request()

        .query(
          `select * from prmWorkTrade where WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkStatusCode = req.body.WorkStatusCode;
      let data = await pool
        .request()
        .input("WorkStatusCode", sql.VarChar, req.body.WorkStatusCode)
        .input("WorkStatusDesc", sql.VarChar, req.body.WorkStatusDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmWorkStatus]
                       ([WorkStatusCode]
                       ,[WorkStatusDesc]
                       
                      
                        )
                 VALUES
                       (@WorkStatusCode
                       ,@WorkStatusDesc
                     
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmWorkStatus where WorkStatusCode='${WorkStatusCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Workpriority_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkPriorityCode = req.body.WorkPriorityCode;
      let data = await pool
        .request()
        .input("WorkPriorityCode", sql.VarChar, req.body.WorkPriorityCode)
        .input("WorkPriorityDesc", sql.VarChar, req.body.WorkPriorityDesc)
        .input("WorkPrioritySeq", sql.SmallInt, req.body.WorkPrioritySeq)

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
      let data1 = await pool
        .request()

        .query(
          `select * from prmWorkPriority where WorkPriorityCode='${WorkPriorityCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkCatagres_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkCategoryCode = req.body.WorkCategoryCode;
      let data = await pool
        .request()
        .input("WorkCategoryCode", sql.VarChar, req.body.WorkCategoryCode)
        .input("WorkCategoryDesc", sql.VarChar, req.body.WorkCategoryDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmWorkCategory]
                       ([WorkCategoryCode]
                       ,[WorkCategoryDesc]
                     
                       
                      
                        )
                 VALUES
                       (@WorkCategoryCode
                       ,@WorkCategoryDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmWorkCategory where WorkCategoryCode='${WorkCategoryCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DepartmentCode = req.body.DepartmentCode;
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
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmDepartment where DepartmentCode='${DepartmentCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.body.BuildingCode;
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
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmBuilding where BuildingCode='${BuildingCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const LocationCode = req.body.LocationCode;
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
      let data1 = await pool
        .request()

        .query(
          `select * from prmLocation where LocationCode='${LocationCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const ProblemCategoryCode = req.body.ProblemCategoryCode;
      let data = await pool
        .request()
        .input("ProblemCategoryCode", sql.VarChar, req.body.ProblemCategoryCode)
        .input("ProblemCategoryDesc", sql.VarChar, req.body.ProblemCategoryDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmProblemCategory]
                       ([ProblemCategoryCode]
                       ,[ProblemCategoryDesc]
                     
                       
                      
                        )
                 VALUES
                       (@ProblemCategoryCode
                       ,@ProblemCategoryDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmProblemCategory where ProblemCategoryCode='${ProblemCategoryCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async RequestStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestStatusCode = req.body.RequestStatusCode;
      let data = await pool
        .request()
        .input("RequestStatusCode", sql.VarChar, req.body.RequestStatusCode)
        .input("RequestStatusDesc", sql.VarChar, req.body.RequestStatusDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmRequestStatus]
                       ([RequestStatusCode]
                       ,[RequestStatusDesc]
                     
                       
                      
                        )
                 VALUES
                       (@RequestStatusCode
                       ,@RequestStatusDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmRequestStatus where RequestStatusCode='${RequestStatusCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FailureStatusCode = req.body.FailureStatusCode;
      let data = await pool
        .request()
        .input("FailureStatusCode", sql.VarChar, req.body.FailureStatusCode)
        .input("FailureStatusDesc", sql.VarChar, req.body.FailureStatusDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmFailure]
                       ([FailureStatusCode]
                       ,[FailureStatusDesc]
                     
                       
                      
                        )
                 VALUES
                       (@FailureStatusCode
                       ,@FailureStatusDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmFailure where FailureStatusCode='${FailureStatusCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SolutiontatusCode = req.body.SolutiontatusCode;
      let data = await pool
        .request()
        .input("SolutiontatusCode", sql.VarChar, req.body.SolutiontatusCode)
        .input("SolutionStatusDesc", sql.VarChar, req.body.SolutionStatusDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmSolution]
                       ([SolutiontatusCode]
                       ,[SolutionStatusDesc]
                     
                       
                      
                        )
                 VALUES
                       (@SolutiontatusCode
                       ,@SolutionStatusDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmSolution where SolutiontatusCode='${SolutiontatusCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Days_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DaysCode = req.body.DaysCode;
      let data = await pool
        .request()
        .input("DaysCode", sql.VarChar, req.body.DaysCode)
        .input("DaysDesc", sql.VarChar, req.body.DaysDesc)
        .input("DaysSeq", sql.SmallInt, req.body.DaysSeq)

        .query(
          ` 
            INSERT INTO [dbo].[prmDays]
                       ([DaysCode]
                       ,[DaysDesc]
                        ,[DaysSeq]
                     
                       
                      
                        )
                 VALUES
                       (@DaysCode
                       ,@DaysDesc
                       ,@DaysSeq
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(`select * from prmDays where DaysCode='${DaysCode}'`);
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Frequency_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FreqCode = req.body.FreqCode;
      let data = await pool
        .request()
        .input("FreqCode", sql.VarChar, req.body.FreqCode)
        .input("FreqDesc", sql.VarChar, req.body.FreqDesc)
        .input("FreqSeq", sql.SmallInt, req.body.FreqSeq)

        .query(
          ` 
            INSERT INTO [dbo].[prmFrequency]
                       ([FreqCode]
                       ,[FreqDesc]
                        ,[FreqSeq]
                     
                       
                      
                        )
                 VALUES
                       (@FreqCode
                       ,@FreqDesc
                       ,@FreqSeq
                    
                                           
                       )`
        );

      let data1 = await pool
        .request()

        .query(`select * from prmFrequency where FreqCode='${FreqCode}'`);
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkRequestItems_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.body.RequestNumber;
      let data = await pool
        .request()
        .input("RequestNumber", sql.VarChar, req.body.RequestNumber)
        .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)
        .input("AssetItemQty", sql.Int, req.body.AssetItemQty)
        .input("AssetItemQtyUsed", sql.Int, req.body.AssetItemQtyUsed)
        .query(
          ` 
            INSERT INTO [dbo].[tblWorkRequestItems]
                       ([RequestNumber]
                       ,[AssetItemTagID]
                        ,[AssetItemQty]
                        ,[AssetItemQtyUsed]
                     
                       
                      
                        )
                 VALUES
                       (@RequestNumber
                       ,@AssetItemTagID
                       ,@AssetItemQty
                        ,@AssetItemQtyUsed
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from tblWorkRequestItems where RequestNumber='${RequestNumber}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Gender_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const GenderCode = req.body.GenderCode;
      let data = await pool
        .request()
        .input("GenderCode", sql.VarChar, req.body.GenderCode)
        .input("GenderDesc", sql.VarChar, req.body.GenderDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmGender]
                       ([GenderCode]
                       ,[GenderDesc]
                     
                       
                      
                        )
                 VALUES
                       (@GenderCode
                       ,@GenderDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(`select * from prmGender where GenderCode='${GenderCode}'`);
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Title_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TitleCode = req.body.TitleCode;
      let data = await pool
        .request()
        .input("TitleCode", sql.VarChar, req.body.TitleCode)
        .input("TitleDesc", sql.VarChar, req.body.TitleDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmTitle]
                       ([TitleCode]
                       ,[TitleDesc]
      
                        )
                 VALUES
                       (@TitleCode
                       ,@TitleDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(`select * from prmTitle where TitleCode='${TitleCode}'`);
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaritalStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const MaritalCode = req.body.MaritalCode;
      let data = await pool
        .request()
        .input("MaritalCode", sql.VarChar, req.body.MaritalCode)
        .input("MaritalDesc", sql.VarChar, req.body.MaritalDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmMaritalStatus]
                       ([MaritalCode]
                       ,[MaritalDesc]
      
                        )
                 VALUES
                       (@MaritalCode
                       ,@MaritalDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmMaritalStatus where MaritalCode='${MaritalCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const NationalityCode = req.body.NationalityCode;
      let data = await pool
        .request()
        .input("NationalityCode", sql.VarChar, req.body.NationalityCode)
        .input("NationalityDesc", sql.VarChar, req.body.NationalityDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmNationality]
                       ([NationalityCode]
                       ,[NationalityDesc]
      
                        )
                 VALUES
                       (@NationalityCode
                       ,@NationalityDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmNationality where NationalityCode='${NationalityCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_post(req, res, next) {
    try {
      const file = req.files["AssetImage"];

      const url = file
        ? `http://gs1ksa.org:3021/api/profile/${file[0].filename}`
        : null;
      let pool = await sql.connect(config);
      const AssetItemDescription = req.body.AssetItemDescription;
      if (!req.body.AssetItemDescription) {
        return res
          .status(400)
          .json({ error: "Asset Item Description is required!" });
      }
      const checkQuery = `SELECT * FROM tblAssetsMaster WHERE AssetItemDescription=@AssetItemDescription`;
      const checkResult = await pool
        .request()
        .input("AssetItemDescription", sql.VarChar, AssetItemDescription)
        .query(checkQuery);

      if (checkResult.recordset.length > 0) {
        return res
          .status(400)
          .json({ error: "Asset Item Description already exists!" });
      }
      let data = await pool
        .request()
        .input(
          "AssetItemDescription",
          sql.VarChar,
          req.body.AssetItemDescription
        )
        .input("AssetItemGroup", sql.VarChar, req.body.AssetItemGroup)
        .input("AssetType", sql.VarChar, req.body.AssetType)
        .input("AssetCategory", sql.VarChar, req.body.AssetCategory)
        .input("AssetSubCategory", sql.VarChar, req.body.AssetSubCategory)
        .input("Manufacturer", sql.VarChar, req.body.Manufacturer)
        .input("Model", sql.VarChar, req.body.Model)
        .input("Brand", sql.VarChar, req.body.Brand)
        .input("AssetImage", sql.VarChar, url)
        .input("PurchaseDate", sql.VarChar, req.body.PurchaseDate)
        .input("PurchaseAmount", sql.Numeric, req.body.PurchaseAmount)
        .input("Warranty", sql.Int, req.body.Warranty)
        .input("WarrantyPeriod", sql.VarChar, req.body.WarrantyPeriod)
        .input("WarrantyStartDate", sql.VarChar, req.body.WarrantyStartDate)
        .input("WarrantyEndDate", sql.VarChar, req.body.WarrantyEndDate)
        .input("OnHandQty", sql.Numeric, req.body.OnHandQty)

        .input("ReOrderLevel", sql.Numeric, req.body.ReOrderLevel)
        .input("MinimumOrderLevel", sql.Numeric, req.body.MinimumOrderLevel)
        .input("MaximumOrderLevel", sql.Numeric, req.body.MaximumOrderLevel)
        .input("MaterialUnitCode", sql.VarChar, req.body.MaterialUnitCode)
        .input("LastPurchaseDate", sql.VarChar, req.body.LastPurchaseDate)
        .input("LastPOReference", sql.VarChar, req.body.LastPOReference)
        .input("LastPOAmount", sql.Float, req.body.LastPOAmount)

        .input("LastPOQty", sql.Numeric, req.body.LastPOQty)
        .input("LastVendorID", sql.VarChar, req.body.LastVendorID)
        .input(
          "Details_Remarks_Notes",
          sql.VarChar,
          req.body.Details_Remarks_Notes
        )
        .query(
          ` 
            INSERT INTO [dbo].[tblAssetsMaster]
                       ([AssetItemDescription]
                       ,[AssetItemGroup]
                       ,[AssetType]
                       ,[AssetCategory]
                       ,[AssetSubCategory]
                       ,[Manufacturer]
                       ,[Model]
                       ,[Brand]
,[AssetImage]
                       ,[PurchaseDate]
                       ,[PurchaseAmount]
                       ,[Warranty]
                       ,[WarrantyPeriod]
                       ,[WarrantyStartDate]
                       ,[WarrantyEndDate]
                       ,[OnHandQty]

                       ,[ReOrderLevel]
                       ,[MinimumOrderLevel]
                       ,[MaximumOrderLevel]
                       ,[MaterialUnitCode]
                       ,[LastPurchaseDate]
                       ,[LastPOReference]
                       ,[LastPOAmount]

                        ,[LastPOQty]
                       ,[LastVendorID]
                       ,[Details_Remarks_Notes]
      
                        )
                 VALUES
                       (@AssetItemDescription
                       ,@AssetItemGroup
                        ,@AssetType
                         ,@AssetCategory
                          ,@AssetSubCategory
                           ,@Manufacturer
                            ,@Model
                             ,@Brand
,@AssetImage
                             ,@PurchaseDate
                        ,@PurchaseAmount
                         ,@Warranty
                          ,@WarrantyPeriod
                           ,@WarrantyStartDate
                             ,@WarrantyEndDate
                             ,@OnHandQty

                             ,@ReOrderLevel
                        ,@MinimumOrderLevel
                         ,@MaximumOrderLevel
                          ,@MaterialUnitCode
                           ,@LastPurchaseDate
                             ,@LastPOReference
                             ,@LastPOAmount

                             ,@LastPOQty
                             ,@LastVendorID
                             ,@Details_Remarks_Notes
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from tblAssetsMaster where AssetItemDescription='${AssetItemDescription}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetTypeCode = req.body.AssetTypeCode;
      let data = await pool
        .request()
        .input("AssetTypeCode", sql.VarChar, req.body.AssetTypeCode)
        .input("AssetTypeDesc", sql.VarChar, req.body.AssetTypeDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmAssetType]
                       ([AssetTypeCode]
                       ,[AssetTypeDesc]
      
                        )
                 VALUES
                       (@AssetTypeCode
                       ,@AssetTypeDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmAssetType where AssetTypeCode='${AssetTypeCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCategory_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetCategoryCode = req.body.AssetCategoryCode;
      let data = await pool
        .request()
        .input("AssetCategoryCode", sql.VarChar, req.body.AssetCategoryCode)
        .input("AssetCategoryDesc", sql.VarChar, req.body.AssetCategoryDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmAssetCategory]
                       ([AssetCategoryCode]
                       ,[AssetCategoryDesc]
      
                        )
                 VALUES
                       (@AssetCategoryCode
                       ,@AssetCategoryDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmAssetCategory where AssetCategoryCode='${AssetCategoryCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },

  async AssetSubCategory_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetSubCategoryCode = req.body.AssetSubCategoryCode;
      let data = await pool
        .request()
        .input(
          "AssetSubCategoryCode",
          sql.VarChar,
          req.body.AssetSubCategoryCode
        )
        .input(
          "AssetSubCategoryDesc",
          sql.VarChar,
          req.body.AssetSubCategoryDesc
        )

        .query(
          ` 
            INSERT INTO [dbo].[prmAssetSubCategory]
                       ([AssetSubCategoryCode]
                       ,[AssetSubCategoryDesc]
      
                        )
                 VALUES
                       (@AssetSubCategoryCode
                       ,@AssetSubCategoryDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmAssetSubCategory where AssetSubCategoryCode='${AssetSubCategoryCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCondition_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetConditionCode = req.body.AssetConditionCode;
      let data = await pool
        .request()
        .input("AssetConditionCode", sql.VarChar, req.body.AssetConditionCode)
        .input("AssetConditionDesc", sql.VarChar, req.body.AssetConditionDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmAssetCondition]
                       ([AssetConditionCode]
                       ,[AssetConditionDesc]
      
                        )
                 VALUES
                       (@AssetConditionCode
                       ,@AssetConditionDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmAssetCondition where AssetConditionCode='${AssetConditionCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WarrantyPeriodCode = req.body.WarrantyPeriodCode;
      let data = await pool
        .request()
        .input("WarrantyPeriodCode", sql.VarChar, req.body.WarrantyPeriodCode)
        .input("WarrantyPeriodDesc", sql.VarChar, req.body.WarrantyPeriodDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmWarrantyPeriod]
                       ([WarrantyPeriodCode]
                       ,[WarrantyPeriodDesc]
      
                        )
                 VALUES
                       (@WarrantyPeriodCode
                       ,@WarrantyPeriodDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmWarrantyPeriod where WarrantyPeriodCode='${WarrantyPeriodCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeMaster_post(req, res, next) {
    const EmployeeID = req.body.EmployeeID;
    const file = req.files["EmployeeImage"];

    const url = file
      ? `http://gs1ksa.org:3021/api/profile/${file[0].filename}`
      : null;

    try {
      if (EmployeeID == "") {
        res.status(404).json({ error: "EmployeeID is required" });
      } else {
        let pool = await sql.connect(config);

        let data = await pool
          .request()
          .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
          .input("EmployeeImage", sql.VarChar, url)
          .input("Gender", sql.VarChar, req.body.Gender)
          .input("Title", sql.VarChar, req.body.Title)
          .input("BirthDate", sql.VarChar, req.body.BirthDate)
          .input("Age", sql.SmallInt, req.body.Age)
          .input("Lastname", sql.VarChar, req.body.Lastname)
          .input("Firstname", sql.VarChar, req.body.Firstname)
          .input("Middlename", sql.VarChar, req.body.Middlename)
          .input("NationalityCode", sql.VarChar, req.body.NationalityCode)
          .input("MaritalStatus", sql.VarChar, req.body.MaritalStatus)
          .input("NationalID", sql.VarChar, req.body.NationalID)
          .input("PassportNumber", sql.VarChar, req.body.PassportNumber)
          .input("MobileNumber", sql.VarChar, req.body.MobileNumber)
          .input("LandlineNumber", sql.VarChar, req.body.LandlineNumber)
          .input("DesignationCode", sql.VarChar, req.body.DesignationCode)
          .input("Email", sql.VarChar, req.body.Email)
          .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
          .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
          .input("LocationCode", sql.VarChar, req.body.LocationCode)
          .input("JoiningDate", sql.Date, req.body.JoiningDate)

          .query(
            ` 
            INSERT INTO [dbo].[tblEmployeeMaster]
                       ([EmployeeID]
                      ,[EmployeeImage]
                         ,[Gender]
                        ,[Title]
                         ,[BirthDate]
                         ,[Age]
                        ,[Lastname]
                         ,[Firstname]
                        ,[Middlename]
                         ,[NationalityCode]
                         ,[MaritalStatus]
                        ,[NationalID]
                         ,[PassportNumber]
                         ,[MobileNumber]
                         ,[LandlineNumber]
                         ,[DesignationCode]
                          ,[Email]
                         ,[DepartmentCode]
                        ,[BuildingCode]
                      ,[LocationCode]
                   ,[JoiningDate]
                                                             
      
                        )
                 VALUES
                       (@EmployeeID
                       ,@EmployeeImage
                       ,@Gender
                       ,@Title
                       ,@BirthDate
                       ,@Age
                       ,@Lastname
                       ,@Firstname
                       ,@Middlename
                       ,@NationalityCode
                       ,@MaritalStatus
                       ,@NationalID
                       ,@PassportNumber
                       ,@MobileNumber
                       ,@LandlineNumber
                       ,@DesignationCode
                       ,@Email
                       ,@DepartmentCode
                       ,@BuildingCode
                       ,@LocationCode
                       ,@JoiningDate
                       
                    
                                           
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblEmployeeMaster where EmployeeID='${EmployeeID}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetworkrequest_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.body.RequestNumber;
      const AssetItemDescriptions = req.body.AssetItemDescriptions; // Assuming this is an array

      for (const AssetItemDescription of AssetItemDescriptions) {
        await pool
          .request()
          .input("RequestNumber", sql.VarChar, RequestNumber)
          .input("AssetItemDescription", sql.VarChar, AssetItemDescription)
          .query(
            `INSERT INTO [dbo].[assetworkrequest]
                       ([RequestNumber]
                       ,[AssetItemDescription]
                        )
                 VALUES
                       (@RequestNumber
                       ,@AssetItemDescription)`
          );
      }
      let result = await pool
        .request()
        .query(
          `SELECT * FROM assetworkrequest WHERE RequestNumber='${RequestNumber}'`
        );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetItemRequest_ADD_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseRequestNumber = req.body.PurchaseRequestNumber;
      const AssetItemDescriptions = req.body.AssetItemDescriptions; // Assuming this is an array

      for (const AssetItemDescription of AssetItemDescriptions) {
        await pool
          .request()
          .input("PurchaseRequestNumber", sql.VarChar, PurchaseRequestNumber)
          .input("AssetItemDescription", sql.VarChar, AssetItemDescription)
          .query(
            `INSERT INTO [dbo].[tblPurchaseRequestDetail]
                       ([PurchaseRequestNumber]
                       ,[AssetItemDescription]
                        )
                 VALUES
                       (@PurchaseRequestNumber
                       ,@AssetItemDescription)`
          );
      }
      let result = await pool
        .request()
        .query(
          `SELECT * FROM tblPurchaseRequestDetail WHERE PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetItemOrder_ADD_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.body.PurchaseOrderNumber;
      const AssetItemDescriptions = req.body.AssetItemDescriptions; // Assuming this is an array

      for (const AssetItemDescription of AssetItemDescriptions) {
        await pool
          .request()
          .input("PurchaseOrderNumber", sql.VarChar, PurchaseOrderNumber)
          .input("AssetItemDescription", sql.VarChar, AssetItemDescription)
          .query(
            `INSERT INTO [dbo].[tblPurchaseOrderDetail]
                       ([PurchaseOrderNumber]
                       ,[AssetItemDescription]
                        )
                 VALUES
                       (@PurchaseOrderNumber
                       ,@AssetItemDescription)`
          );
      }
      let result = await pool
        .request()
        .query(
          `SELECT * FROM tblPurchaseOrderDetail WHERE PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetItemGOODS_ADD_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.body.PurchaseOrderNumber;
      const AssetItemDescriptions = req.body.AssetItemDescriptions; // Assuming this is an array

      for (const AssetItemDescription of AssetItemDescriptions) {
        await pool
          .request()
          .input("PurchaseOrderNumber", sql.VarChar, PurchaseOrderNumber)
          .input("AssetItemDescription", sql.VarChar, AssetItemDescription)
          .query(
            `INSERT INTO [dbo].[tblGoodsReceiptDetail]
                       ([PurchaseOrderNumber]
                       ,[AssetItemDescription]
                        )
                 VALUES
                       (@PurchaseOrderNumber
                       ,@AssetItemDescription)`
          );
      }
      let result = await pool
        .request()
        .query(
          `SELECT * FROM tblGoodsReceiptDetail WHERE PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetItemGOODSReturn_ADD_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.body.PurchaseOrderNumber;
      const AssetItemDescriptions = req.body.AssetItemDescriptions; // Assuming this is an array

      for (const AssetItemDescription of AssetItemDescriptions) {
        await pool
          .request()
          .input("PurchaseOrderNumber", sql.VarChar, PurchaseOrderNumber)
          .input("AssetItemDescription", sql.VarChar, AssetItemDescription)
          .query(
            `INSERT INTO [dbo].[tblGoodsReturnDetail]
                       ([PurchaseOrderNumber]
                       ,[AssetItemDescription]
                        )
                 VALUES
                       (@PurchaseOrderNumber
                       ,@AssetItemDescription)`
          );
      }
      let result = await pool
        .request()
        .query(
          `SELECT * FROM tblGoodsReturnDetail WHERE PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async systemaccess_ADD_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.body.EmployeeID;
      const SystemModuleCodes = req.body.SystemModuleCodes; // Assuming this is an array

      for (const SystemModuleCode of SystemModuleCodes) {
        await pool
          .request()
          .input("EmployeeID", sql.VarChar, EmployeeID)
          .input("SystemModuleCode", sql.VarChar, SystemModuleCode)
          .query(
            `INSERT INTO [dbo].[tblUserSystemAccessDetails]
                       ([EmployeeID]
                       ,[SystemModuleCode]
                        )
                 VALUES
                       (@EmployeeID
                       ,@SystemModuleCode)`
          );
      }
      let result = await pool
        .request()
        .query(
          `SELECT * FROM tblUserSystemAccessDetails WHERE EmployeeID='${EmployeeID}'`
        );
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: result.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DesignationCode = req.body.DesignationCode;
      let data = await pool
        .request()
        .input("DesignationCode", sql.VarChar, req.body.DesignationCode)
        .input("DesignationDesc", sql.VarChar, req.body.DesignationDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmDesignation]
                       ([DesignationCode]
                       ,[DesignationDesc]
      
                        )
                 VALUES
                       (@DesignationCode
                       ,@DesignationDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmDesignation where DesignationCode='${DesignationCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeStatusCode = req.body.EmployeeStatusCode;
      let data = await pool
        .request()
        .input("EmployeeStatusCode", sql.VarChar, req.body.EmployeeStatusCode)
        .input("EmployeeStatusDesc", sql.VarChar, req.body.EmployeeStatusDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmEmployeeStatus]
                       ([EmployeeStatusCode]
                       ,[EmployeeStatusDesc]
      
                        )
                 VALUES
                       (@EmployeeStatusCode
                       ,@EmployeeStatusDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmEmployeeStatus where EmployeeStatusCode='${EmployeeStatusCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrders_post(req, res, next) {
    const WorkRequestNumber = req.body.WorkRequestNumber;
    const WorkOrderNumber = req.body.WorkOrderNumber;
    try {
      if (WorkRequestNumber == "") {
        res.status(404).json({ error: "WorkRequestNumber is required" });
      } else {
        let pool = await sql.connect(config);

        let data = await pool
          .request()
          .input("WorkOrderNumber", sql.VarChar, req.body.WorkOrderNumber)

          .input("WorkRequestNumber", sql.VarChar, req.body.WorkRequestNumber)
          .input("WorkStatus", sql.VarChar, req.body.WorkStatus)
          .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
          .input("WorkCategoryCode", sql.VarChar, req.body.WorkCategoryCode)
          .input("WorkDescription", sql.VarChar, req.body.WorkDescription)
          .input("FailureCode", sql.VarChar, req.body.FailureCode)
          .input("SolutionCode", sql.VarChar, req.body.SolutionCode)
          .input(
            "AssignedtoEmployeeID",
            sql.VarChar,
            req.body.AssignedtoEmployeeID
          )
          .input(
            "AppointmentDateTime",
            sql.VarChar,
            req.body.AppointmentDateTime
          )
          .input("ScheduledDateTime", sql.VarChar, req.body.ScheduledDateTime)
          .input(
            "StartWorkOrderDateTime",
            sql.VarChar,
            req.body.StartWorkOrderDateTime
          )
          .input(
            "EndWorkOrderDateTime",
            sql.VarChar,
            req.body.EndWorkOrderDateTime
          )
          .input("TotalDays", sql.Numeric, req.body.TotalDays)
          .input("TotalHours", sql.Numeric, req.body.TotalHours)
          .input("TotalMinutes", sql.Numeric, req.body.TotalMinutes)
          .input("TotalCostofWork", sql.Numeric, req.body.TotalCostofWork)
          .input(
            "CompletedByEmployeeID",
            sql.VarChar,
            req.body.CompletedByEmployeeID
          )
          .input(
            "CompletionDateTime",
            sql.DateTime,
            req.body.CompletionDateTime
          )

          .query(
            ` 
            INSERT INTO [dbo].[tblWorkOrders]
                       ([WorkOrderNumber]
                      
                         ,[WorkRequestNumber]
                        ,[WorkStatus]
                         ,[WorkPriority]
                         ,[WorkCategoryCode]
                        ,[WorkDescription]
                         ,[FailureCode]
                        ,[SolutionCode]
                         ,[AssignedtoEmployeeID]
                         ,[AppointmentDateTime]
                        ,[ScheduledDateTime]
                         ,[EndWorkOrderDateTime]
                         ,[StartWorkOrderDateTime]
                         ,[TotalDays]
                         ,[TotalHours]
                         ,[TotalMinutes]
                          ,[TotalCostofWork]
                         ,[CompletedByEmployeeID]
                        ,[CompletionDateTime]

                        )
                 VALUES
                       (@WorkOrderNumber
                       
                       ,@WorkRequestNumber
                       ,@WorkStatus
                       ,@WorkPriority
                       ,@WorkCategoryCode
                       ,@WorkDescription
                       ,@FailureCode
                       ,@SolutionCode
                       ,@AssignedtoEmployeeID
                       ,@AppointmentDateTime
                       ,@ScheduledDateTime
                        ,@EndWorkOrderDateTime
                       ,@StartWorkOrderDateTime
                       ,@TotalDays
                       ,@TotalHours
                       ,@TotalMinutes
                       ,@TotalCostofWork
                       ,@CompletedByEmployeeID
                       ,@CompletionDateTime
                                   
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblWorkOrders where WorkOrderNumber='${WorkOrderNumber}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async SystemModules_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SystemModuleSeq = req.body.SystemModuleSeq;
      let data = await pool
        .request()
        .input("SystemModuleSeq", sql.SmallInt, req.body.SystemModuleSeq)
        .input("SystemModuleCode", sql.VarChar, req.body.SystemModuleCode)
        .input("SystemModuleDesc", sql.VarChar, req.body.SystemModuleDesc)
        .query(
          ` 
            INSERT INTO [dbo].[prmSystemModules]
                       ([SystemModuleSeq]
                       ,[SystemModuleCode]
                        ,[SystemModuleDesc]
                        )
                 VALUES
                       (@SystemModuleSeq
                       ,@SystemModuleCode
                      ,@SystemModuleDesc

                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmSystemModules where SystemModuleSeq='${SystemModuleSeq}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async VendorMaster_post(req, res, next) {
    const VendorID = req.body.VendorID;

    try {
      if (VendorID == "") {
        res.status(404).json({ error: "VendorID is required" });
      } else {
        let pool = await sql.connect(config);

        let data = await pool
          .request()
          .input("VendorID", sql.VarChar, req.body.VendorID)

          .input("VendorName", sql.VarChar, req.body.VendorName)
          .input("VendorAddress", sql.VarChar, req.body.VendorAddress)
          .input("ContactLastname", sql.VarChar, req.body.ContactLastname)
          .input("ContactFirstname", sql.VarChar, req.body.ContactFirstname)
          .input("ContactMiddlename", sql.VarChar, req.body.ContactMiddlename)
          .input(
            "ContactMobileNumber",
            sql.VarChar,
            req.body.ContactMobileNumber
          )
          .input(
            "ContactLandlineNumber",
            sql.VarChar,
            req.body.ContactLandlineNumber
          )
          .input("ContactEmail", sql.VarChar, req.body.ContactEmail)
          .input("VendorInformation", sql.VarChar, req.body.VendorInformation)

          .query(
            ` 
            INSERT INTO [dbo].[tblVendorMaster]
                       ([VendorID]
                      
                         ,[VendorName]
                        ,[VendorAddress]
                         ,[ContactLastname]
                         ,[ContactFirstname]
                        ,[ContactMiddlename]
                         ,[ContactMobileNumber]
                        ,[ContactLandlineNumber]
                         ,[ContactEmail]
                         ,[VendorInformation]
                       
                                                             
      
                        )
                 VALUES
                       (@VendorID
                       
                       ,@VendorName
                       ,@VendorAddress
                       ,@ContactLastname
                       ,@ContactFirstname
                       ,@ContactMiddlename
                       ,@ContactMobileNumber
                       ,@ContactLandlineNumber
                       ,@ContactEmail
                       ,@VendorInformation
                      
                       
                    
                                           
                       )`
          );
        let data1 = await pool
          .request()

          .query(`select * from tblVendorMaster where VendorID='${VendorID}'`);
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetItemGroup_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemGroupCode = req.body.AssetItemGroupCode;
      let data = await pool
        .request()
        .input("AssetItemGroupCode", sql.VarChar, req.body.AssetItemGroupCode)
        .input(
          "AssetItemGroupCodeDesc",
          sql.VarChar,
          req.body.AssetItemGroupCodeDesc
        )

        .query(
          ` 
            INSERT INTO [dbo].[prmAssetItemGroup]
                       ([AssetItemGroupCode]
                       ,[AssetItemGroupCodeDesc]
      
                        )
                 VALUES
                       (@AssetItemGroupCode
                       ,@AssetItemGroupCodeDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmAssetItemGroup where AssetItemGroupCode='${AssetItemGroupCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PreventiveMaintenance_post(req, res, next) {
    const RequestNumber = req.body.RequestNumber;

    try {
      if (RequestNumber === "") {
        res.status(405).json({ error: "RequestNumber is required" });
      } else {
        let pool = await sql.connect(config);

        // Check if the RequestNumber already exists
        const existingRecord = await pool
          .request()
          .query(
            `SELECT TOP 1 * FROM tblPreventiveMaintenance WHERE RequestNumber = '${RequestNumber}'`
          );

        if (existingRecord.recordset.length > 0) {
          // A record with the same RequestNumber already exists
          res.status(409).json({ error: "RequestNumber already exists" });
        } else {
          let pool = await sql.connect(config);

          let data = await pool
            .request()
            .input("RequestNumber", sql.VarChar, req.body.RequestNumber)

            .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
            .input("RequestDateTime", sql.VarChar, req.body.RequestDateTime)
            .input("WorkType", sql.VarChar, req.body.WorkType)
            .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
            .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)
            .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
            .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
            .input("LocationCode", sql.VarChar, req.body.LocationCode)
            .input(
              "MaintenanceDescription",
              sql.VarChar,
              req.body.MaintenanceDescription
            )
            .input("Frequency", sql.VarChar, req.body.Frequency)
            .input(
              "ScheduleStartDateTime",
              sql.VarChar,
              req.body.ScheduleStartDateTime
            )
            .input(
              "ScheduleEndDateTime",
              sql.VarChar,
              req.body.ScheduleEndDateTime
            )
            .input("ScheduledDay", sql.VarChar, req.body.ScheduledDay)
            .input(
              "SchedulingPriority",
              sql.VarChar,
              req.body.SchedulingPriority
            )

            .query(
              ` 
            INSERT INTO [dbo].[tblPreventiveMaintenance]
                       ([RequestNumber]
                      
                         ,[EmployeeID]
                        ,[RequestDateTime]
                         ,[WorkType]
                         ,[WorkPriority]
                        ,[AssetItemTagID]
                         ,[DepartmentCode]
                        ,[BuildingCode]
                         ,[LocationCode]
                         ,[MaintenanceDescription]
                        ,[Frequency]
                         ,[ScheduleStartDateTime]
                         ,[ScheduleEndDateTime]
                         ,[ScheduledDay]
                         ,[SchedulingPriority]
                         
                                                             
      
                        )
                 VALUES
                       (@RequestNumber
                       
                       ,@EmployeeID
                       ,@RequestDateTime
                       ,@WorkType
                       ,@WorkPriority
                       ,@AssetItemTagID
                       ,@DepartmentCode
                       ,@BuildingCode
                       ,@LocationCode
                       ,@MaintenanceDescription
                       ,@Frequency
                       ,@ScheduleStartDateTime
                       ,@ScheduleEndDateTime
                       ,@ScheduledDay
                       ,@SchedulingPriority
                      
                       
                    
                                           
                       )`
            );
          let data1 = await pool
            .request()

            .query(
              `select * from tblPreventiveMaintenance where RequestNumber='${RequestNumber}'`
            );
          res.status(201).json(data1);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningWorks_post(req, res, next) {
    const RequestNumber = req.body.RequestNumber;

    try {
      if (RequestNumber === "") {
        res.status(405).json({ error: "RequestNumber is required" });
      } else {
        let pool = await sql.connect(config);

        // Check if the RequestNumber already exists
        const existingRecord = await pool
          .request()
          .query(
            `SELECT TOP 1 * FROM tblCleaningWorks WHERE RequestNumber = '${RequestNumber}'`
          );

        if (existingRecord.recordset.length > 0) {
          // A record with the same RequestNumber already exists
          res.status(409).json({ error: "RequestNumber already exists" });
        } else {
          let pool = await sql.connect(config);

          let data = await pool
            .request()
            .input("RequestNumber", sql.VarChar, req.body.RequestNumber)

            .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
            .input("RequestDateTime", sql.VarChar, req.body.RequestDateTime)
            .input("WorkType", sql.VarChar, req.body.WorkType)
            .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
            .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)
            .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
            .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
            .input("LocationCode", sql.VarChar, req.body.LocationCode)
            .input("CleaningGroup", sql.VarChar, req.body.CleaningGroup)
            .input(
              "Intruction_Remarks",
              sql.VarChar,
              req.body.Intruction_Remarks
            )
            .input(
              "ScheduleStartDateTime",
              sql.VarChar,
              req.body.ScheduleStartDateTime
            )
            .input(
              "ScheduleEndDateTime",
              sql.VarChar,
              req.body.ScheduleEndDateTime
            )
            .input("ScheduledDay", sql.VarChar, req.body.ScheduledDay)
            .input(
              "SchedulingPriority",
              sql.VarChar,
              req.body.SchedulingPriority
            )
            .input("Frequency", sql.VarChar, req.body.Frequency)

            .query(
              ` 
            INSERT INTO [dbo].[tblCleaningWorks]
                       ([RequestNumber]
                      
                         ,[EmployeeID]
                        ,[RequestDateTime]
                         ,[WorkType]
                         ,[WorkPriority]
                        ,[AssetItemTagID]
                         ,[DepartmentCode]
                        ,[BuildingCode]
                         ,[LocationCode]
                         ,[CleaningGroup]
                        ,[Intruction_Remarks]
                         ,[ScheduleStartDateTime]
                         ,[ScheduleEndDateTime]
                         ,[ScheduledDay]
                         ,[SchedulingPriority]
                         ,[Frequency]
                                                             
      
                        )
                 VALUES
                       (@RequestNumber
                       
                       ,@EmployeeID
                       ,@RequestDateTime
                       ,@WorkType
                       ,@WorkPriority
                       ,@AssetItemTagID
                       ,@DepartmentCode
                       ,@BuildingCode
                       ,@LocationCode
                       ,@CleaningGroup
                       ,@Intruction_Remarks
                       ,@ScheduleStartDateTime
                       ,@ScheduleEndDateTime
                       ,@ScheduledDay
                       ,@SchedulingPriority
                      ,@Frequency
                       
                    
                                           
                       )`
            );
          let data1 = await pool
            .request()

            .query(
              `select * from tblCleaningWorks where RequestNumber='${RequestNumber}'`
            );
          res.status(201).json(data1);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetTransactions_post(req, res, next) {
    const AssetItemTagID = req.body.AssetItemTagID;

    try {
      if (AssetItemTagID === "") {
        res.status(405).json({ error: "AssetItemTagID is required" });
      } else {
        let pool = await sql.connect(config);

        // Check if the RequestNumber already exists
        const existingRecord = await pool
          .request()
          .query(
            `SELECT TOP 1 * FROM tblAssetTransactions WHERE AssetItemTagID = '${AssetItemTagID}'`
          );

        if (existingRecord.recordset.length > 0) {
          // A record with the same RequestNumber already exists
          res.status(409).json({ error: "AssetItemTagID already exists" });
        } else {
          let pool = await sql.connect(config);

          let data = await pool
            .request()
            .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)

            .input("AssetCondition", sql.VarChar, req.body.AssetCondition)
            .input(
              "AssetItemDescription",
              sql.VarChar,
              req.body.AssetItemDescription
            )
            .input("SerialNumber", sql.VarChar, req.body.SerialNumber)
            .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
            .input("CaptureDateTime", sql.VarChar, req.body.CaptureDateTime)
            .input("ScannedDateTime", sql.VarChar, req.body.ScannedDateTime)
            .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
            .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
            .input("LocationCode", sql.VarChar, req.body.LocationCode)

            .query(
              ` 
            INSERT INTO [dbo].[tblAssetTransactions]
                       ([AssetItemTagID]
                      
                         ,[AssetCondition]
                        ,[AssetItemDescription]
                         ,[SerialNumber]
                         ,[EmployeeID]
                        ,[CaptureDateTime]
                         ,[ScannedDateTime]
                        ,[BuildingCode]
                         ,[DepartmentCode]
                         ,[LocationCode]
                                              
      
                        )
                 VALUES
                       (@AssetItemTagID
                       
                       ,@AssetCondition
                       ,@AssetItemDescription
                       ,@SerialNumber
                       ,@EmployeeID
                       ,@CaptureDateTime
                       ,@ScannedDateTime
                       ,@BuildingCode
                       ,@DepartmentCode
                       ,@LocationCode
                      
                       
                    
                                           
                       )`
            );
          let data1 = await pool
            .request()

            .query(
              `select * from tblAssetTransactions where AssetItemTagID='${AssetItemTagID}'`
            );
          res.status(201).json(data1);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserAuthority_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const UserAuthorityCode = req.body.UserAuthorityCode;
      if (!UserAuthorityCode) {
        return res
          .status(400)
          .json({ error: "UserAuthorityCode is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("UserAuthorityCode", sql.VarChar, UserAuthorityCode)
        .query(
          "SELECT TOP 1 * FROM prmUserAuthority WHERE UserAuthorityCode = @UserAuthorityCode"
        );

      if (existingRecord.recordset.length > 0) {
        return res
          .status(409)
          .json({ error: "UserAuthorityCode already exists" });
      }
      let data = await pool
        .request()
        .input("UserAuthoritySeq", sql.SmallInt, req.body.UserAuthoritySeq)
        .input("UserAuthorityCode", sql.VarChar, req.body.UserAuthorityCode)
        .input("UserAuthorityDesc", sql.VarChar, req.body.UserAuthorityDesc)
        .query(
          ` 
            INSERT INTO [dbo].[prmUserAuthority]
                       ([UserAuthoritySeq]
                       ,[UserAuthorityCode]
                        ,[UserAuthorityDesc]
                        )
                 VALUES
                       (@UserAuthoritySeq
                       ,@UserAuthorityCode
                      ,@UserAuthorityDesc

                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmUserAuthority where UserAuthorityCode='${UserAuthorityCode}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserCredentials_post(req, res, next) {
    let pool = await sql.connect(config);
    const EmployeeID = req.body.EmployeeID;

    try {
      if (!EmployeeID) {
        return res.status(400).json({ error: "EmployeeID is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("EmployeeID", sql.VarChar, EmployeeID)
        .query(
          "SELECT TOP 1 * FROM tblUserCredentials WHERE EmployeeID = @EmployeeID"
        );

      if (existingRecord.recordset.length > 0) {
        return res.status(409).json({ error: "EmployeeID already exists" });
      } else {
        let data = await pool
          .request()
          .input("EmployeeID", sql.VarChar, req.body.EmployeeID)

          .input("UserAuthorityCode", sql.VarChar, req.body.UserAuthorityCode)
          .input("UserID", sql.VarChar, req.body.UserID)
          .input("UserPassword", sql.VarChar, req.body.UserPassword)
          .input("WindowsID", sql.VarChar, req.body.WindowsID)
          .input("WindowsPassword", sql.VarChar, req.body.WindowsPassword)
          .input("CreatedByAdminID", sql.VarChar, req.body.CreatedByAdminID)
          .input(
            "CreationDateTime",
            sql.VarChar,
            req.body.ContactLandlineNumber
          )

          .query(
            ` 
            INSERT INTO [dbo].[tblUserCredentials]
                       ([EmployeeID]
                      
                         ,[UserAuthorityCode]
                        ,[UserID]
                         ,[UserPassword]
                         ,[WindowsID]
                        ,[WindowsPassword]
                         ,[CreatedByAdminID]
                        ,[CreationDateTime]

                        )
                 VALUES
                       (@EmployeeID
                       
                       ,@UserAuthorityCode
                       ,@UserID
                       ,@UserPassword
                       ,@WindowsID
                       ,@WindowsPassword
                       ,@CreatedByAdminID
                       ,@CreationDateTime
                     
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblUserCredentials where EmployeeID='${EmployeeID}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserSystemAccess_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.body.EmployeeID;
      const UserAuthorityCode = req.body.UserAuthorityCode;
      if (!EmployeeID) {
        return res.status(400).json({ error: "EmployeeID is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("EmployeeID", sql.VarChar, EmployeeID)
        .query(
          "SELECT TOP 1 * FROM tblUserSystemAccess WHERE EmployeeID = @EmployeeID"
        );

      if (existingRecord.recordset.length > 0) {
        return res.status(409).json({ error: "EmployeeID already exists" });
      }

      if (!UserAuthorityCode) {
        return res
          .status(400)
          .json({ error: "UserAuthorityCode is required!" });
      }

      const existingRecord2 = await pool
        .request()
        .input("UserAuthorityCode", sql.VarChar, UserAuthorityCode)
        .query(
          "SELECT TOP 1 * FROM tblUserSystemAccess WHERE UserAuthorityCode = @UserAuthorityCode"
        );

      if (existingRecord2.recordset.length > 0) {
        return res
          .status(409)
          .json({ error: "UserAuthorityCode already exists" });
      }
      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("UserAuthorityCode", sql.VarChar, req.body.UserAuthorityCode)
        .input(
          "UserAuthorityAccessYN",
          sql.VarChar,
          req.body.UserAuthorityAccessYN
        )

        .input("AddedByAdminID", sql.VarChar, req.body.AddedByAdminID)
        .input("AddedDateTime", sql.VarChar, req.body.AddedDateTime)
        .query(
          ` 
            INSERT INTO [dbo].[tblUserSystemAccess]
                       ([EmployeeID]
                       ,[UserAuthorityCode]
                        ,[UserAuthorityAccessYN]

                        ,[AddedByAdminID]
                        ,[AddedDateTime]
                        )
                 VALUES
                       (@EmployeeID
                       ,@UserAuthorityCode
                      ,@UserAuthorityAccessYN

                      ,@AddedByAdminID
                      ,@AddedDateTime
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from tblUserSystemAccess where EmployeeID='${EmployeeID}'`
        );
      res.status(201).json(data1);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequest_post(req, res, next) {
    let pool = await sql.connect(config);
    const PurchaseRequestNumber = req.body.PurchaseRequestNumber;

    try {
      if (!PurchaseRequestNumber) {
        return res
          .status(400)
          .json({ error: "PurchaseRequestNumber is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("PurchaseRequestNumber", sql.VarChar, PurchaseRequestNumber)
        .query(
          "SELECT TOP 1 * FROM tblPurchaseRequest WHERE PurchaseRequestNumber = @PurchaseRequestNumber"
        );

      if (existingRecord.recordset.length > 0) {
        return res
          .status(409)
          .json({ error: "PurchaseRequestNumber already exists" });
      } else {
        let data = await pool
          .request()
          .input(
            "PurchaseRequestNumber",
            sql.VarChar,
            req.body.PurchaseRequestNumber
          )

          .input("RequestDate", sql.VarChar, req.body.RequestDate)
          .input("RequiredDate", sql.VarChar, req.body.RequiredDate)
          .input(
            "RequestByEmployeeID",
            sql.VarChar,
            req.body.RequestByEmployeeID
          )
          .input("Purpose", sql.VarChar, req.body.Purpose)
          .input("VATInclude", sql.VarChar, req.body.VATInclude)
          .input("VendorID", sql.VarChar, req.body.VendorID)
          .input("VerifiedByEmpl", sql.VarChar, req.body.VerifiedByEmpl)
          .input("VAT", sql.Numeric, req.body.VAT)
          .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)

          .query(
            ` 
            INSERT INTO [dbo].[tblPurchaseRequest]
                       ([PurchaseRequestNumber]
                      
                         ,[RequestDate]
                        ,[RequiredDate]
                         ,[RequestByEmployeeID]
                         ,[Purpose]
                        ,[VATInclude]
                         ,[VendorID]
                        ,[VerifiedByEmpl]

                        ,[VAT]
                        ,[TOTAL_AMOUNT]
                        )
                 VALUES
                       (@PurchaseRequestNumber
                       
                       ,@RequestDate
                       ,@RequiredDate
                       ,@RequestByEmployeeID
                       ,@Purpose
                       ,@VATInclude
                       ,@VendorID
                       ,@VerifiedByEmpl
                     
                       ,@VAT
                       ,@TOTAL_AMOUNT
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblPurchaseRequest where PurchaseRequestNumber='${PurchaseRequestNumber}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrder_post(req, res, next) {
    let pool = await sql.connect(config);
    const PurchaseOrderNumber = req.body.PurchaseOrderNumber;

    try {
      if (!PurchaseOrderNumber) {
        return res
          .status(400)
          .json({ error: "PurchaseOrderNumber is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("PurchaseOrderNumber", sql.VarChar, PurchaseOrderNumber)
        .query(
          "SELECT TOP 1 * FROM tblPurchaseOrder WHERE PurchaseOrderNumber = @PurchaseOrderNumber"
        );

      if (existingRecord.recordset.length > 0) {
        return res
          .status(409)
          .json({ error: "PurchaseOrderNumber already exists" });
      } else {
        let data = await pool
          .request()
          .input(
            "PurchaseOrderNumber",
            sql.VarChar,
            req.body.PurchaseOrderNumber
          )

          .input(
            "PurchaseRequestNumber",
            sql.VarChar,
            req.body.PurchaseRequestNumber
          )
          .input("PODate", sql.VarChar, req.body.PODate)
          .input("DeliveryDate", sql.VarChar, req.body.DeliveryDate)
          .input(
            "ProcessedByEmployeeID",
            sql.VarChar,
            req.body.ProcessedByEmployeeID
          )
          .input("VATInclude", sql.VarChar, req.body.VATInclude)
          .input("ApprovedByEmpl", sql.VarChar, req.body.ApprovedByEmpl)
          .input("ApprovalDate", sql.VarChar, req.body.ApprovalDate)

          .input("VendorID", sql.VarChar, req.body.VendorID)
          .input("VendorConfirm", sql.VarChar, req.body.VendorConfirm)
          .input("ConfirmationDate", sql.VarChar, req.body.ConfirmationDate)
          .input("Comments", sql.VarChar, req.body.Comments)
          .input("VAT", sql.Numeric, req.body.VAT)
          .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)

          .query(
            ` 
            INSERT INTO [dbo].[tblPurchaseOrder]
                       ([PurchaseOrderNumber]
                      
                         ,[PurchaseRequestNumber]
                        ,[PODate]
                         ,[DeliveryDate]
                         ,[ProcessedByEmployeeID]
                        ,[VATInclude]
                         ,[ApprovedByEmpl]
                        ,[ApprovalDate]

                        ,[VendorID]
                        ,[VendorConfirm]
                         ,[ConfirmationDate]
                        ,[Comments]
                        ,[VAT]
                        ,[TOTAL_AMOUNT]
                        )
                 VALUES
                       (@PurchaseOrderNumber
                       
                       ,@PurchaseRequestNumber
                       ,@PODate
                       ,@DeliveryDate
                       ,@ProcessedByEmployeeID
                       ,@VATInclude
                       ,@ApprovedByEmpl
                       ,@ApprovalDate
                     
                       ,@VendorID
                       ,@VendorConfirm
                       ,@ConfirmationDate
                       ,@Comments
                       ,@VAT
                       ,@TOTAL_AMOUNT
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblPurchaseOrder where PurchaseOrderNumber='${PurchaseOrderNumber}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReceipt_post(req, res, next) {
    let pool = await sql.connect(config);
    const PurchaseOrderNumber = req.body.PurchaseOrderNumber;

    try {
      if (!PurchaseOrderNumber) {
        return res
          .status(400)
          .json({ error: "PurchaseOrderNumber is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("PurchaseOrderNumber", sql.VarChar, PurchaseOrderNumber)
        .query(
          "SELECT TOP 1 * FROM tblGoodsReceipt WHERE PurchaseOrderNumber = @PurchaseOrderNumber"
        );

      if (existingRecord.recordset.length > 0) {
        return res
          .status(409)
          .json({ error: "PurchaseOrderNumber already exists" });
      } else {
        let data = await pool
          .request()
          .input(
            "PurchaseOrderNumber",
            sql.VarChar,
            req.body.PurchaseOrderNumber
          )

          .input("InvoiceNumber", sql.VarChar, req.body.InvoiceNumber)
          .input("InvoiceDate", sql.VarChar, req.body.InvoiceDate)
          .input("ActualDeliveryDate", sql.VarChar, req.body.ActualDeliveryDate)
          .input(
            "RecievedByEmployeeID",
            sql.VarChar,
            req.body.RecievedByEmployeeID
          )

          .input("VendorID", sql.VarChar, req.body.VendorID)
          .input("FeedbackOrComments", sql.VarChar, req.body.FeedbackOrComments)
          .input("DiscountAmount", sql.VarChar, req.body.DiscountAmount)

          .input("VAT", sql.Numeric, req.body.VAT)
          .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)

          .query(
            ` 
            INSERT INTO [dbo].[tblGoodsReceipt]
                       ([PurchaseOrderNumber]
                      
                         ,[InvoiceNumber]
                        ,[InvoiceDate]
                         ,[ActualDeliveryDate]
                         ,[RecievedByEmployeeID]
                       
                        

                        ,[VendorID]
                        ,[FeedbackOrComments]
                         ,[DiscountAmount]
                       ,[VAT]
                         ,[TOTAL_AMOUNT]
                        )
                 VALUES
                       (@PurchaseOrderNumber
                       
                       ,@InvoiceNumber
                       ,@InvoiceDate
                       ,@ActualDeliveryDate
                       ,@RecievedByEmployeeID
                      
                       
                     
                       ,@VendorID
                       ,@FeedbackOrComments
                       ,@DiscountAmount
                      ,@VAT
                       ,@TOTAL_AMOUNT
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblGoodsReceipt where PurchaseOrderNumber='${PurchaseOrderNumber}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReturn_post(req, res, next) {
    let pool = await sql.connect(config);
    const PurchaseOrderNumber = req.body.PurchaseOrderNumber;

    try {
      if (!PurchaseOrderNumber) {
        return res
          .status(400)
          .json({ error: "PurchaseOrderNumber is required!" });
      }

      const existingRecord = await pool
        .request()
        .input("PurchaseOrderNumber", sql.VarChar, PurchaseOrderNumber)
        .query(
          "SELECT TOP 1 * FROM tblGoodsReturn WHERE PurchaseOrderNumber = @PurchaseOrderNumber"
        );

      if (existingRecord.recordset.length > 0) {
        return res
          .status(409)
          .json({ error: "PurchaseOrderNumber already exists" });
      } else {
        let data = await pool
          .request()
          .input(
            "PurchaseOrderNumber",
            sql.VarChar,
            req.body.PurchaseOrderNumber
          )

          .input("InvoiceNumber", sql.VarChar, req.body.InvoiceNumber)
          .input("ReturnDate", sql.VarChar, req.body.ReturnDate)

          .input(
            "RecievedByEmployeeID",
            sql.VarChar,
            req.body.RecievedByEmployeeID
          )

          .input("VendorID", sql.VarChar, req.body.VendorID)
          .input("ReasonOrComments", sql.VarChar, req.body.ReasonOrComments)

          .input("VAT", sql.Numeric, req.body.VAT)
          .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)

          .query(
            ` 
            INSERT INTO [dbo].[tblGoodsReturn]
                       ([PurchaseOrderNumber]
                      
                         ,[InvoiceNumber]
                        ,[ReturnDate]
                        
                         ,[RecievedByEmployeeID]
                       
                        

                        ,[VendorID]
                        ,[ReasonOrComments]
                       ,[VAT]
                        ,[TOTAL_AMOUNT]
                        )
                 VALUES
                       (@PurchaseOrderNumber
                       
                       ,@InvoiceNumber
                       ,@ReturnDate
                       
                       ,@RecievedByEmployeeID
                      
                       
                     
                       ,@VendorID
                       ,@ReasonOrComments
                       
                      ,@VAT
                       ,@TOTAL_AMOUNT
                       )`
          );
        let data1 = await pool
          .request()

          .query(
            `select * from tblGoodsReturn where PurchaseOrderNumber='${PurchaseOrderNumber}'`
          );
        res.status(201).json(data1);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Floor_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FloorCode = req.body.FloorCode;
      const existingRecord = await pool
        .request()
        .input("FloorCode", sql.VarChar, FloorCode)
        .query(`SELECT * FROM prmFloor WHERE FloorCode = '${FloorCode}'`);

      if (existingRecord.recordset.length > 0) {
        // A record with the same FloorCode already exists
        return res.status(400).json({
          status: 400,
          message: "already exists",
          error: " FloorCode already exists",
        });
      }
      let data = await pool
        .request()
        .input("FloorCode", sql.VarChar, req.body.FloorCode)
        .input("FloorDesc", sql.VarChar, req.body.FloorDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmFloor]
                       ([FloorCode]
                       ,[FloorDesc]
                        )
                 VALUES
                       (@FloorCode
                       ,@FloorDesc                   
                       )`
        );
      let data1 = await pool
        .request()

        .query(`select * from prmFloor where FloorCode='${FloorCode}'`);
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: data1.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_newpage_post(req, res, next) {
    try {
      const file = req.files["BuildingImage"];

      const url = file
        ? `http://gs1ksa.org:3021/api/profile/${file[0].filename}`
        : null;
      let pool = await sql.connect(config);
      const BuildingCode = req.body.BuildingCode;
      if (!BuildingCode) {
        return res.status(400).json({
          status: 400,
          message: "BuildingCode is required",
          error: "BuildingCode is required",
        });
      }
      const existingRecord = await pool
        .request()
        .input("BuildingCode", sql.VarChar, BuildingCode)
        .query(
          `SELECT * FROM prmBuilding WHERE BuildingCode = '${BuildingCode}'`
        );

      if (existingRecord.recordset.length > 0) {
        // A record with the same BuildingCode already exists
        return res.status(400).json({
          status: 400,
          message: "already exists",
          error: " BuildingCode already exists",
        });
      }
      let data = await pool
        .request()
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("BuildingDesc", sql.VarChar, req.body.BuildingDesc)
        .input("Latitude", sql.VarChar, req.body.Latitude)
        .input("Longtitude", sql.VarChar, req.body.Longtitude)

        .input("BuildingImage", sql.VarChar, url)
        .input("Capacity", sql.Numeric, req.body.Capacity)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .query(
          ` 
            INSERT INTO [dbo].[prmBuilding]
                       ([BuildingCode]
                       ,[BuildingDesc]
                       ,[Latitude]
                       ,[Longtitude]

                       ,[BuildingImage]
                       ,[Capacity]
                       ,[LocationCode]
                        )
                 VALUES
                       (@BuildingCode
                       ,@BuildingDesc
                       ,@Latitude
                       ,@Longtitude
                       
                       ,@BuildingImage
                       ,@Capacity
                       ,@LocationCode 
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from prmBuilding where BuildingCode='${BuildingCode}'`
        );
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: data1.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.body.RoomCode;
      if (!RoomCode) {
        return res.status(400).json({
          status: 400,
          message: "RoomCode is required",
          error: "RoomCode is required",
        });
      }
      const existingRecord = await pool
        .request()
        .input("RoomCode", sql.VarChar, RoomCode)
        .query(`SELECT * FROM prmRooms WHERE RoomCode = '${RoomCode}'`);

      if (existingRecord.recordset.length > 0) {
        // A record with the same RoomCode already exists
        return res.status(400).json({
          status: 400,
          message: "RoomCode already exists",
          error: "RoomCode already exists",
        });
      }
      let data = await pool
        .request()
        .input("RoomCode", sql.VarChar, req.body.RoomCode)
        .input("RoomDesc", sql.VarChar, req.body.RoomDesc)

        .query(
          ` 
            INSERT INTO [dbo].[prmRooms]
                       ([RoomCode]
                       ,[RoomDesc]
                     
                       
                      
                        )
                 VALUES
                       (@RoomCode
                       ,@RoomDesc
                    
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(`select * from prmRooms where RoomCode='${RoomCode}'`);
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: data1.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_newpage_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.body.RoomCode;
      if (!RoomCode) {
        return res.status(400).json({
          status: 400,
          message: "RoomCode is required",
          error: "RoomCode is required",
        });
      }
      const existingRecord = await pool
        .request()
        .input("RoomCode", sql.VarChar, RoomCode)
        .query(`SELECT * FROM prmRooms WHERE RoomCode = '${RoomCode}'`);

      if (existingRecord.recordset.length > 0) {
        // A record with the same RoomCode already exists
        return res.status(400).json({
          status: 400,
          message: "already exists",
          error: " RoomCode already exists",
        });
      }
      let data = await pool
        .request()
        .input("RoomCode", sql.VarChar, req.body.RoomCode)
        .input("RoomDesc", sql.VarChar, req.body.RoomDesc)
        .input("Area", sql.VarChar, req.body.Area)
        .input("FloorCode", sql.VarChar, req.body.FloorCode)

        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("Capacity", sql.VarChar, req.body.Capacity)
        .input("Occupants", sql.VarChar, req.body.Occupants)
        .input("VacancyFlag", sql.VarChar, req.body.VacancyFlag)
        .query(
          ` 
            INSERT INTO [dbo].[prmRooms]
                       ([RoomCode]
                       ,[RoomDesc]
                       ,[Area]
                       ,[FloorCode]

                       ,[BuildingCode]
                       ,[LocationCode]
                       ,[Capacity]
                       ,[Occupants]
                       ,[VacancyFlag]
                        )
                 VALUES
                       (@RoomCode
                       ,@RoomDesc
                       ,@Area
                       ,@FloorCode
                       
                       ,@BuildingCode
                       ,@LocationCode
                       ,@Capacity
                       ,@Occupants
                       ,@VacancyFlag 
                       )`
        );

      let data1 = await pool
        .request()

        .query(`select * from prmRooms where RoomCode='${RoomCode}'`);
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: data1.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRooms_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.body.EmployeeID;
      if (!EmployeeID) {
        return res.status(400).json({
          status: 400,
          message: "EmployeeID is required",
          error: "EmployeeID is required",
        });
      }
      const existingRecord = await pool
        .request()
        .input("EmployeeID", sql.VarChar, EmployeeID)
        .query(
          `SELECT * FROM tblEmployeeRooms WHERE EmployeeID = '${EmployeeID}'`
        );

      if (existingRecord.recordset.length > 0) {
        // A record with the same EmployeeID already exists
        return res.status(400).json({
          status: 400,
          message: "EmployeeID already exists",
          error: "EmployeeID already exists",
        });
      }
      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("RoomCode", sql.VarChar, req.body.RoomCode)
        .input("DateAssigned", sql.VarChar, req.body.DateAssigned)
        .query(
          ` 
            INSERT INTO [dbo].[tblEmployeeRooms]
                       ([EmployeeID]
                       ,[RoomCode]
                     ,[DateAssigned]
                       
                      
                        )
                 VALUES
                       (@EmployeeID
                       ,@RoomCode
                    ,@DateAssigned
                                           
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from tblEmployeeRooms where EmployeeID='${EmployeeID}'`
        );
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: data1.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRoomTransfers_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TransferRequestNumber = req.body.TransferRequestNumber;
      if (!TransferRequestNumber) {
        return res.status(400).json({
          status: 400,
          message: "TransferRequestNumber is required",
          error: "TransferRequestNumber is required",
        });
      }
      const existingRecord = await pool
        .request()
        .input("TransferRequestNumber", sql.VarChar, TransferRequestNumber)
        .query(
          `SELECT * FROM tblEmployeeRoomTransfers WHERE TransferRequestNumber = '${TransferRequestNumber}'`
        );

      if (existingRecord.recordset.length > 0) {
        // A record with the same TransferRequestNumber already exists
        return res.status(400).json({
          status: 400,
          message: "TransferRequestNumber already exists",
          error: "TransferRequestNumber already exists",
        });
      }
      let data = await pool
        .request()
        .input(
          "TransferRequestNumber",
          sql.VarChar,
          req.body.TransferRequestNumber
        )
        .input("TransferRequestDate", sql.VarChar, req.body.TransferRequestDate)
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("FROM_RoomCode", sql.VarChar, req.body.FROM_RoomCode)
        .input("TO_RoomCode", sql.VarChar, req.body.TO_RoomCode)

        .input(
          "EmployeeID_Approval_1",
          sql.VarChar,
          req.body.EmployeeID_Approval_1
        )
        .input(
          "DateApproved_Approval_1",
          sql.VarChar,
          req.body.DateApproved_Approval_1
        )
        .input(
          "ApprovedFlag_Approval_1",
          sql.VarChar,
          req.body.ApprovedFlag_Approval_1
        )

        .input(
          "EmployeeID_Approval_2",
          sql.VarChar,
          req.body.EmployeeID_Approval_2
        )
        .input(
          "DateApproved_Approval_2",
          sql.VarChar,
          req.body.DateApproved_Approval_2
        )
        .input(
          "ApprovedFlag_Approval_2",
          sql.VarChar,
          req.body.ApprovedFlag_Approval_2
        )

        .input(
          "EmployeeID_Approval_3",
          sql.VarChar,
          req.body.EmployeeID_Approval_3
        )
        .input(
          "DateApproved_Approval_3",
          sql.VarChar,
          req.body.DateApproved_Approval_3
        )
        .input(
          "ApprovedFlag_Approval_3",
          sql.VarChar,
          req.body.ApprovedFlag_Approval_3
        )
        .query(
          ` 
            INSERT INTO [dbo].[tblEmployeeRoomTransfers]
                       ([TransferRequestNumber]
                       ,[TransferRequestDate]
                       ,[EmployeeID]
                      ,[FROM_RoomCode]
                       ,[TO_RoomCode]

                       ,[EmployeeID_Approval_1]
                       ,[DateApproved_Approval_1]
                       ,[ApprovedFlag_Approval_1]


                       ,[EmployeeID_Approval_2]
                        ,[DateApproved_Approval_2]
                       ,[ApprovedFlag_Approval_2]

                       ,[EmployeeID_Approval_3]
                       ,[DateApproved_Approval_3]
                       ,[ApprovedFlag_Approval_3]
                        )
                 VALUES
                       (@TransferRequestNumber
                       ,@TransferRequestDate
                       ,@EmployeeID
                       ,@FROM_RoomCode
                       ,@TO_RoomCode

                       ,@EmployeeID_Approval_1
                       ,@DateApproved_Approval_1
                       ,@ApprovedFlag_Approval_1


                       ,@EmployeeID_Approval_2
                       ,@DateApproved_Approval_2
                       ,@ApprovedFlag_Approval_2

                       ,@EmployeeID_Approval_3
                       ,@DateApproved_Approval_3
                       ,@ApprovedFlag_Approval_3                 
                       )`
        );
      let data1 = await pool
        .request()

        .query(
          `select * from tblEmployeeRoomTransfers where TransferRequestNumber='${TransferRequestNumber}'`
        );
      res.status(201).json({
        status: 201,
        successfully: "data created successfully",
        data: data1.recordsets[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Wordorder_post_week(req, res, next) {
    try {
      // Establish a connection to the SQL database using the `mssql` package.
      let pool = await sql.connect(config);

      // Extract data from the request, including `WorkRequestNumber`, `WorkOrderNumbers`, `StartWorkOrderDateTime`, and `EndWorkOrderDateTime`.
      const WorkRequestNumber = req.body.WorkRequestNumber;
      let WorkOrderNumbers = req.body.WorkOrderNumbers;
      let StartWorkOrderDateTimes = req.body.StartWorkOrderDateTime; // Assuming it's an array
      let EndWorkOrderDateTimes = req.body.EndWorkOrderDateTime; // Assuming it's an array

      // Ensure `WorkOrderNumbers` is treated as an array, even if it's a single value.
      if (!Array.isArray(WorkOrderNumbers)) {
        WorkOrderNumbers = [WorkOrderNumbers];
      }

      // Use a `for...of` loop to iterate through `WorkOrderNumbers`, inserting each work order into the `tblWorkOrders` table.
      for (let i = 0; i < WorkOrderNumbers.length; i++) {
        const WorkOrderNumber = WorkOrderNumbers[i];
        const StartWorkOrderDateTime = StartWorkOrderDateTimes[i]; // Corresponding `StartWorkOrderDateTime` for the current work order
        const EndWorkOrderDateTime = EndWorkOrderDateTimes[i]; // Corresponding `EndWorkOrderDateTime` for the current work order

        await pool
          .request()
          .input("WorkRequestNumber", sql.VarChar, WorkRequestNumber)
          .input("WorkOrderNumber", sql.VarChar, WorkOrderNumber)
          .input("WorkStatus", sql.VarChar, "Open")
          .input("StartWorkOrderDateTime", sql.VarChar, StartWorkOrderDateTime)
          .input("EndWorkOrderDateTime", sql.VarChar, EndWorkOrderDateTime)
          .query(`
                    INSERT INTO [dbo].[tblWorkOrders]
                    ([WorkRequestNumber]
                    ,[WorkOrderNumber]
                    ,[WorkStatus]
                    ,[StartWorkOrderDateTime]
                    ,[EndWorkOrderDateTime]
                    )
                    VALUES
                    (@WorkRequestNumber, @WorkOrderNumber, @WorkStatus, @StartWorkOrderDateTime, @EndWorkOrderDateTime)
                `);
      }

      // Retrieve the inserted records from the table based on `WorkRequestNumber`.
      const result = await pool
        .request()
        .input("WorkRequestNumber", sql.VarChar, WorkRequestNumber).query(`
                SELECT * FROM tblWorkOrders WHERE WorkRequestNumber = @WorkRequestNumber
            `);

      // Respond with the inserted records in JSON format, and return a 201 status code to indicate that a resource has been created.
      res.status(201).json(result.recordset);
    } catch (error) {
      // Handle any errors that occur during the process.
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  //
  //-----------------------------------------------------------------------------------

  //---------------------------PUT--------------------------------------------------------

  async EmployeeMaster_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      const file = req.files["EmployeeImage"];

      let url = ""; // Initialize the URL variable

      if (file && file.length > 0) {
        url = `http://gs1ksa.org:3021/api/profile/${file[0].filename}`;
      }
      if (typeof req.body.EmployeeImage === "string" || !url) {
        // No new EmployeeImage provided or it's an empty string, keep the old one
        const existingData = await pool
          .request()
          .query(
            `SELECT [EmployeeImage] FROM [dbo].[tblEmployeeMaster] WHERE EmployeeID='${EmployeeID}'`
          );

        if (existingData.recordset.length > 0) {
          url = existingData.recordset[0].EmployeeImage;
        }
      }
      let data = await pool
        .request()

        .input("Gender", sql.VarChar, req.body.Gender)
        .input("Title", sql.VarChar, req.body.Title)
        .input("EmployeeImage", sql.VarChar, url)
        .input("BirthDate", sql.VarChar, req.body.BirthDate)
        .input("Age", sql.SmallInt, req.body.Age)
        .input("Lastname", sql.VarChar, req.body.Lastname)
        .input("Firstname", sql.VarChar, req.body.Firstname)
        .input("Middlename", sql.VarChar, req.body.Middlename)
        .input("NationalityCode", sql.VarChar, req.body.NationalityCode)
        .input("MaritalStatus", sql.VarChar, req.body.MaritalStatus)
        .input("NationalID", sql.VarChar, req.body.NationalID)
        .input("PassportNumber", sql.VarChar, req.body.PassportNumber)
        .input("MobileNumber", sql.VarChar, req.body.MobileNumber)
        .input("LandlineNumber", sql.VarChar, req.body.LandlineNumber)
        .input("DesignationCode", sql.VarChar, req.body.DesignationCode)
        .input("Email", sql.VarChar, req.body.Email)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("JoiningDate", sql.Date, req.body.JoiningDate)

        .query(
          ` 
          UPDATE [dbo].[tblEmployeeMaster]
SET


[Gender] =@Gender
,[Title] =@Title
,[EmployeeImage] =@EmployeeImage
,[BirthDate] =@BirthDate
,[Age] =@Age
,[Lastname] =@Lastname
,[Firstname] =@Firstname
,[Middlename] =@Middlename
,[NationalityCode] =@NationalityCode
,[MaritalStatus] =@MaritalStatus
,[NationalID] =@NationalID
,[PassportNumber] =@PassportNumber
,[MobileNumber] =@MobileNumber
,[LandlineNumber] =@LandlineNumber
,[DesignationCode] =@DesignationCode
,[Email] =@Email
,[DepartmentCode] =@DepartmentCode
,[BuildingCode] =@BuildingCode
,[LocationCode] =@LocationCode
,[JoiningDate] =@JoiningDate
WHERE EmployeeID='${EmployeeID}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkType_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()

        .input("WorkTypeDesc", sql.VarChar, req.body.WorkTypeDesc)

        .query(
          ` 
          UPDATE [dbo].[prmWorkType]
SET

[WorkTypeDesc] =@WorkTypeDesc
WHERE WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkTrade_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()

        .input("WorkTradeDesc", sql.VarChar, req.body.WorkTradeDesc)

        .query(
          ` 
          UPDATE [dbo].[prmWorkTrade]
SET

[WorkTradeDesc] =@WorkTradeDesc
WHERE WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkStatus_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkStatusCode = req.params.WorkStatusCode;
      let data = await pool
        .request()

        .input("WorkStatusDesc", sql.VarChar, req.body.WorkStatusDesc)

        .query(
          ` 
          UPDATE [dbo].[prmWorkStatus]
SET

[WorkStatusDesc] =@WorkStatusDesc
WHERE WorkStatusCode='${WorkStatusCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkPriority_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkPriorityCode = req.params.WorkPriorityCode;
      let data = await pool
        .request()

        .input("WorkPriorityDesc", sql.VarChar, req.body.WorkPriorityDesc)
        .input("WorkPrioritySeq", sql.SmallInt, req.body.WorkPrioritySeq)
        .query(
          ` 
          UPDATE [dbo].[prmWorkPriority]
SET

[WorkPriorityDesc] =@WorkPriorityDesc
,[WorkPrioritySeq] =@WorkPrioritySeq
WHERE WorkPriorityCode='${WorkPriorityCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkCatagres_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkCategoryCode = req.params.WorkCategoryCode;
      let data = await pool
        .request()

        .input("WorkCategoryDesc", sql.VarChar, req.body.WorkCategoryDesc)

        .query(
          ` 
          UPDATE [dbo].[prmWorkCategory]
SET

[WorkCategoryDesc] =@WorkCategoryDesc
WHERE WorkCategoryCode='${WorkCategoryCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DepartmentCode = req.params.DepartmentCode;
      let data = await pool
        .request()

        .input("DepartmentDesc", sql.VarChar, req.body.DepartmentDesc)

        .query(
          ` 
          UPDATE [dbo].[prmDepartment]
SET

[DepartmentDesc] =@DepartmentDesc
WHERE DepartmentCode='${DepartmentCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.params.BuildingCode;
      let data = await pool
        .request()

        .input("BuildingDesc", sql.VarChar, req.body.BuildingDesc)

        .query(
          ` 
          UPDATE [dbo].[prmBuilding]
SET

[BuildingDesc] =@BuildingDesc
WHERE BuildingCode='${BuildingCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const LocationCode = req.params.LocationCode;
      let data = await pool
        .request()

        .input("LocationDesc", sql.VarChar, req.body.LocationDesc)

        .query(
          ` 
          UPDATE [dbo].[prmLocation]
SET

[LocationDesc] =@LocationDesc
WHERE LocationCode='${LocationCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const ProblemCategoryCode = req.params.ProblemCategoryCode;
      let data = await pool
        .request()

        .input("ProblemCategoryDesc", sql.VarChar, req.body.ProblemCategoryDesc)

        .query(
          ` 
          UPDATE [dbo].[prmProblemCategory]
SET

[ProblemCategoryDesc] =@ProblemCategoryDesc
WHERE ProblemCategoryCode='${ProblemCategoryCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async RequestStatus_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestStatusCode = req.params.RequestStatusCode;
      let data = await pool
        .request()

        .input("RequestStatusDesc", sql.VarChar, req.body.RequestStatusDesc)

        .query(
          ` 
          UPDATE [dbo].[prmRequestStatus]
SET

[RequestStatusDesc] =@RequestStatusDesc
WHERE RequestStatusCode='${RequestStatusCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FailureStatusCode = req.params.FailureStatusCode;
      let data = await pool
        .request()

        .input("FailureStatusDesc", sql.VarChar, req.body.FailureStatusDesc)

        .query(
          ` 
          UPDATE [dbo].[prmFailure]
SET

[FailureStatusDesc] =@FailureStatusDesc
WHERE FailureStatusCode='${FailureStatusCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SolutiontatusCode = req.params.SolutiontatusCode;
      let data = await pool
        .request()

        .input("SolutionStatusDesc", sql.VarChar, req.body.SolutionStatusDesc)

        .query(
          ` 
          UPDATE [dbo].[prmSolution]
SET

[SolutionStatusDesc] =@SolutionStatusDesc
WHERE SolutiontatusCode='${SolutiontatusCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Days_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DaysCode = req.params.DaysCode;
      let data = await pool
        .request()

        .input("DaysDesc", sql.VarChar, req.body.DaysDesc)
        .input("DaysSeq", sql.SmallInt, req.body.DaysSeq)

        .query(
          ` 
          UPDATE [dbo].[prmDays]
SET

[DaysDesc] =@DaysDesc
,[DaysSeq] =@DaysSeq
WHERE DaysCode='${DaysCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Frequency_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FreqCode = req.params.FreqCode;
      let data = await pool
        .request()

        .input("FreqDesc", sql.VarChar, req.body.FreqDesc)
        .input("FreqSeq", sql.SmallInt, req.body.FreqSeq)

        .query(
          ` 
          UPDATE [dbo].[prmFrequency]
SET

[FreqDesc] =@FreqDesc
,[FreqSeq] =@FreqSeq
WHERE FreqCode='${FreqCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Gender_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const GenderCode = req.params.GenderCode;
      let data = await pool
        .request()

        .input("GenderDesc", sql.VarChar, req.body.GenderDesc)

        .query(
          ` 
          UPDATE [dbo].[prmGender]
SET

[GenderDesc] =@GenderDesc
WHERE GenderCode='${GenderCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Title_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TitleCode = req.params.TitleCode;
      let data = await pool
        .request()

        .input("TitleDesc", sql.VarChar, req.body.TitleDesc)

        .query(
          ` 
          UPDATE [dbo].[prmTitle]
SET

[TitleDesc] =@TitleDesc
WHERE TitleCode='${TitleCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaritalStatus_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const MaritalCode = req.params.MaritalCode;
      let data = await pool
        .request()

        .input("MaritalDesc", sql.VarChar, req.body.MaritalDesc)

        .query(
          ` 
          UPDATE [dbo].[prmMaritalStatus]
SET

[MaritalDesc] =@MaritalDesc
WHERE MaritalCode='${MaritalCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const NationalityCode = req.params.NationalityCode;
      let data = await pool
        .request()

        .input("NationalityDesc", sql.VarChar, req.body.NationalityDesc)

        .query(
          ` 
          UPDATE [dbo].[prmNationality]
SET

[NationalityDesc] =@NationalityDesc
WHERE NationalityCode='${NationalityCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;

      const file = req.files["AssetImage"];

      let url = ""; // Initialize the URL variable

      if (file && file.length > 0) {
        url = `http://gs1ksa.org:3021/api/profile/${file[0].filename}`;
      }
      if (typeof req.body.AssetItemDescription === "string" || !url) {
        // No new EmployeeImage provided or it's an empty string, keep the old one
        const existingData = await pool
          .request()
          .query(
            `SELECT [AssetImage] FROM [dbo].[tblAssetsMaster] WHERE AssetItemDescription='${AssetItemDescription}'`
          );

        if (existingData.recordset.length > 0) {
          url = existingData.recordset[0].AssetImage;
        }
      }
      let data = await pool
        .request()

        .input("AssetItemGroup", sql.VarChar, req.body.AssetItemGroup)
        .input("AssetType", sql.VarChar, req.body.AssetType)
        .input("AssetCategory", sql.VarChar, req.body.AssetCategory)
        .input("AssetSubCategory", sql.VarChar, req.body.AssetSubCategory)
        .input("Manufacturer", sql.VarChar, req.body.Manufacturer)
        .input("Model", sql.VarChar, req.body.Model)
        .input("Brand", sql.VarChar, req.body.Brand)
        .input("AssetImage", sql.VarChar, url)
        .input("PurchaseDate", sql.VarChar, req.body.PurchaseDate)
        .input("PurchaseAmount", sql.Numeric, req.body.PurchaseAmount)
        .input("Warranty", sql.Int, req.body.Warranty)
        .input("WarrantyPeriod", sql.VarChar, req.body.WarrantyPeriod)
        .input("WarrantyStartDate", sql.VarChar, req.body.WarrantyStartDate)
        .input("WarrantyEndDate", sql.VarChar, req.body.WarrantyEndDate)
        .input("OnHandQty", sql.Numeric, req.body.OnHandQty)

        .input("ReOrderLevel", sql.Numeric, req.body.ReOrderLevel)
        .input("MinimumOrderLevel", sql.Numeric, req.body.MinimumOrderLevel)
        .input("MaximumOrderLevel", sql.Numeric, req.body.MaximumOrderLevel)
        .input("MaterialUnitCode", sql.VarChar, req.body.MaterialUnitCode)
        .input("LastPurchaseDate", sql.VarChar, req.body.LastPurchaseDate)
        .input("LastPOReference", sql.VarChar, req.body.LastPOReference)
        .input("LastPOAmount", sql.Float, req.body.LastPOAmount)

        .input("LastPOQty", sql.Numeric, req.body.LastPOQty)
        .input("LastVendorID", sql.VarChar, req.body.LastVendorID)
        .input(
          "Details_Remarks_Notes",
          sql.VarChar,
          req.body.Details_Remarks_Notes
        )

        .query(
          ` 
          UPDATE [dbo].[tblAssetsMaster]
SET

[AssetItemGroup] =@AssetItemGroup
,[AssetType] =@AssetType
,[AssetCategory] =@AssetCategory
,[AssetSubCategory] =@AssetSubCategory
,[Manufacturer] =@Manufacturer
,[Model] =@Model
,[Brand] =@Brand
,[AssetImage] =@AssetImage
,[PurchaseDate] =@PurchaseDate
,[PurchaseAmount] =@PurchaseAmount
,[Warranty] =@Warranty
,[WarrantyPeriod] =@WarrantyPeriod
,[WarrantyStartDate] =@WarrantyStartDate
,[WarrantyEndDate] =@WarrantyEndDate
,[OnHandQty] =@OnHandQty

,[ReOrderLevel] =@ReOrderLevel
,[MinimumOrderLevel] =@MinimumOrderLevel
,[MaximumOrderLevel] =@MaximumOrderLevel
,[MaterialUnitCode] =@MaterialUnitCode
,[LastPurchaseDate] =@LastPurchaseDate
,[LastPOReference] =@LastPOReference
,[LastPOAmount] =@LastPOAmount

,[LastPOQty] =@LastPOQty
,[LastVendorID] =@LastVendorID
,[Details_Remarks_Notes] =@Details_Remarks_Notes

WHERE AssetItemDescription='${AssetItemDescription}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_Put_status(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;
      let data = await pool
        .request()

        .input("status", sql.Numeric, 1)

        .query(
          ` 
          UPDATE [dbo].[tblAssetsMaster]
SET

[status] =@status

WHERE AssetItemDescription='${AssetItemDescription}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetTypeCode = req.params.AssetTypeCode;
      let data = await pool
        .request()

        .input("AssetTypeDesc", sql.VarChar, req.body.AssetTypeDesc)

        .query(
          ` 
          UPDATE [dbo].[prmAssetType]
SET

[AssetTypeDesc] =@AssetTypeDesc
WHERE AssetTypeCode='${AssetTypeCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCategory_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetCategoryCode = req.params.AssetCategoryCode;
      let data = await pool
        .request()

        .input("AssetCategoryDesc", sql.VarChar, req.body.AssetCategoryDesc)

        .query(
          ` 
          UPDATE [dbo].[prmAssetCategory]
SET

[AssetCategoryDesc] =@AssetCategoryDesc
WHERE AssetCategoryCode='${AssetCategoryCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetSubCategory_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetSubCategoryCode = req.params.AssetSubCategoryCode;
      let data = await pool
        .request()

        .input(
          "AssetSubCategoryDesc",
          sql.VarChar,
          req.body.AssetSubCategoryDesc
        )

        .query(
          ` 
          UPDATE [dbo].[prmAssetSubCategory]
SET

[AssetSubCategoryDesc] =@AssetSubCategoryDesc
WHERE AssetSubCategoryCode='${AssetSubCategoryCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCondition_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetConditionCode = req.params.AssetConditionCode;
      let data = await pool
        .request()

        .input("AssetConditionDesc", sql.VarChar, req.body.AssetConditionDesc)

        .query(
          ` 
          UPDATE [dbo].[prmAssetCondition]
SET

[AssetConditionDesc] =@AssetConditionDesc
WHERE AssetConditionCode='${AssetConditionCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WarrantyPeriodCode = req.params.WarrantyPeriodCode;
      let data = await pool
        .request()

        .input("WarrantyPeriodDesc", sql.VarChar, req.body.WarrantyPeriodDesc)

        .query(
          ` 
          UPDATE [dbo].[prmWarrantyPeriod]
SET

[WarrantyPeriodDesc] =@WarrantyPeriodDesc
WHERE WarrantyPeriodCode='${WarrantyPeriodCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async workRequestCount_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input("RequestNumber", sql.Numeric, req.body.RequestNumber)

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[RequestNumber] =@RequestNumber
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeIDCount_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input("EmployeeID", sql.Numeric, req.body.EmployeeID)

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[EmployeeID] =@EmployeeID
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrderNumberCount_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input("WorkOrderNumber", sql.Numeric, req.body.WorkOrderNumber)

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[WorkOrderNumber] =@WorkOrderNumber
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrderNumberCount_Puts(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input("WorkOrderNumber", sql.Numeric, req.body.WorkOrderNumber)

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[WorkOrderNumber] =@WorkOrderNumber
WHERE No='${No}'`
        );
      let data1 = await pool
        .request()

        .query(`select * from workRequestCount where No='${No}'`);
      res.status(201).json({ data1: data1 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async VendorIDCount_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input("VendorID", sql.Numeric, req.body.VendorID)

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[VendorID] =@VendorID
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async TransferRequestNumber_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input(
          "TransferRequestNumber",
          sql.Numeric,
          req.body.TransferRequestNumber
        )

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[TransferRequestNumber] =@TransferRequestNumber
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DesignationCode = req.params.DesignationCode;
      let data = await pool
        .request()

        .input("DesignationDesc", sql.VarChar, req.body.DesignationDesc)

        .query(
          ` 
          UPDATE [dbo].[prmDesignation]
SET

[DesignationDesc] =@DesignationDesc
WHERE DesignationCode='${DesignationCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeStatus_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeStatusCode = req.params.EmployeeStatusCode;
      let data = await pool
        .request()

        .input("EmployeeStatusDesc", sql.VarChar, req.body.EmployeeStatusDesc)

        .query(
          ` 
          UPDATE [dbo].[prmEmployeeStatus]
SET

[EmployeeStatusDesc] =@EmployeeStatusDesc
WHERE EmployeeStatusCode='${EmployeeStatusCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrders_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkOrderNumber = req.params.WorkOrderNumber;
      let data = await pool
        .request()

        .input("WorkRequestNumber", sql.VarChar, req.body.WorkRequestNumber)
        .input("WorkStatus", sql.VarChar, req.body.WorkStatus)
        .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
        .input("WorkCategoryCode", sql.VarChar, req.body.WorkCategoryCode)
        .input("WorkDescription", sql.VarChar, req.body.WorkDescription)
        .input("FailureCode", sql.VarChar, req.body.FailureCode)
        .input("SolutionCode", sql.VarChar, req.body.SolutionCode)
        .input(
          "AssignedtoEmployeeID",
          sql.VarChar,
          req.body.AssignedtoEmployeeID
        )
        .input("AppointmentDateTime", sql.VarChar, req.body.AppointmentDateTime)
        .input("ScheduledDateTime", sql.VarChar, req.body.ScheduledDateTime)
        .input(
          "StartWorkOrderDateTime",
          sql.VarChar,
          req.body.StartWorkOrderDateTime
        )
        .input(
          "EndWorkOrderDateTime",
          sql.VarChar,
          req.body.EndWorkOrderDateTime
        )
        .input("TotalDays", sql.Numeric, req.body.TotalDays)
        .input("TotalHours", sql.Numeric, req.body.TotalHours)
        .input("TotalMinutes", sql.Numeric, req.body.TotalMinutes)
        .input("TotalCostofWork", sql.Numeric, req.body.TotalCostofWork)
        .input(
          "CompletedByEmployeeID",
          sql.VarChar,
          req.body.CompletedByEmployeeID
        )
        .input("CompletionDateTime", sql.DateTime, req.body.CompletionDateTime)

        .query(
          ` 
          UPDATE [dbo].[tblWorkOrders]
SET


[WorkRequestNumber] =@WorkRequestNumber
,[WorkStatus] =@WorkStatus
,[WorkPriority] =@WorkPriority
,[WorkCategoryCode] =@WorkCategoryCode
,[WorkDescription] =@WorkDescription
,[FailureCode] =@FailureCode
,[SolutionCode] =@SolutionCode
,[AssignedtoEmployeeID] =@AssignedtoEmployeeID
,[AppointmentDateTime] =@AppointmentDateTime
,[ScheduledDateTime] =@ScheduledDateTime
,[StartWorkOrderDateTime] =@StartWorkOrderDateTime
,[EndWorkOrderDateTime] =@EndWorkOrderDateTime
,[TotalDays] =@TotalDays
,[TotalHours] =@TotalHours
,[TotalMinutes] =@TotalMinutes
,[TotalCostofWork] =@TotalCostofWork
,[CompletedByEmployeeID] =@CompletedByEmployeeID
,[CompletionDateTime] =@CompletionDateTime

WHERE WorkOrderNumber='${WorkOrderNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async SystemModules_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SystemModuleCode = req.params.SystemModuleCode;
      let data = await pool
        .request()

        .input("SystemModuleSeq", sql.SmallInt, req.body.SystemModuleSeq)
        .input("SystemModuleDesc", sql.VarChar, req.body.SystemModuleDesc)
        .query(
          ` 
          UPDATE [dbo].[prmSystemModules]
SET

[SystemModuleSeq] =@SystemModuleSeq
,[SystemModuleDesc] =@SystemModuleDesc
WHERE SystemModuleCode='${SystemModuleCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async VendorMaster_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const VendorID = req.params.VendorID;
      let data = await pool
        .request()

        .input("VendorName", sql.VarChar, req.body.VendorName)
        .input("VendorAddress", sql.VarChar, req.body.VendorAddress)
        .input("ContactLastname", sql.VarChar, req.body.ContactLastname)
        .input("ContactFirstname", sql.VarChar, req.body.ContactFirstname)
        .input("ContactMiddlename", sql.VarChar, req.body.ContactMiddlename)
        .input("ContactMobileNumber", sql.VarChar, req.body.ContactMobileNumber)
        .input(
          "ContactLandlineNumber",
          sql.VarChar,
          req.body.ContactLandlineNumber
        )
        .input("ContactEmail", sql.VarChar, req.body.ContactEmail)
        .input("VendorInformation", sql.VarChar, req.body.VendorInformation)

        .query(
          ` 
          UPDATE [dbo].[tblVendorMaster]
SET


[VendorName] =@VendorName
,[VendorAddress] =@VendorAddress
,[ContactLastname] =@ContactLastname
,[ContactFirstname] =@ContactFirstname
,[ContactMiddlename] =@ContactMiddlename
,[ContactMobileNumber] =@ContactMobileNumber
,[ContactLandlineNumber] =@ContactLandlineNumber
,[ContactEmail] =@ContactEmail
,[VendorInformation] =@VendorInformation

WHERE VendorID='${VendorID}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetItemGroup_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemGroupCode = req.params.AssetItemGroupCode;
      let data = await pool
        .request()

        .input(
          "AssetItemGroupCodeDesc",
          sql.VarChar,
          req.body.AssetItemGroupCodeDesc
        )

        .query(
          ` 
          UPDATE [dbo].[prmAssetItemGroup]
SET

[AssetItemGroupCodeDesc] =@AssetItemGroupCodeDesc
WHERE AssetItemGroupCode='${AssetItemGroupCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PreventiveMaintenance_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("RequestDateTime", sql.VarChar, req.body.RequestDateTime)
        .input("WorkType", sql.VarChar, req.body.WorkType)
        .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
        .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input(
          "MaintenanceDescription",
          sql.VarChar,
          req.body.MaintenanceDescription
        )
        .input("Frequency", sql.VarChar, req.body.Frequency)
        .input(
          "ScheduleStartDateTime",
          sql.VarChar,
          req.body.ScheduleStartDateTime
        )
        .input("ScheduleEndDateTime", sql.VarChar, req.body.ScheduleEndDateTime)
        .input("ScheduledDay", sql.VarChar, req.body.ScheduledDay)
        .input("SchedulingPriority", sql.VarChar, req.body.SchedulingPriority)

        .query(
          ` 
          UPDATE [dbo].[tblPreventiveMaintenance]
SET


[EmployeeID] =@EmployeeID
,[RequestDateTime] =@RequestDateTime
,[WorkType] =@WorkType
,[WorkPriority] =@WorkPriority
,[AssetItemTagID] =@AssetItemTagID
,[DepartmentCode] =@DepartmentCode
,[BuildingCode] =@BuildingCode
,[LocationCode] =@LocationCode
,[MaintenanceDescription] =@MaintenanceDescription
,[Frequency] =@Frequency
,[ScheduleStartDateTime] =@ScheduleStartDateTime
,[ScheduleEndDateTime] =@ScheduleEndDateTime
,[ScheduledDay] =@ScheduledDay
,[SchedulingPriority] =@SchedulingPriority

WHERE RequestNumber='${RequestNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningWorks_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("RequestDateTime", sql.VarChar, req.body.RequestDateTime)
        .input("WorkType", sql.VarChar, req.body.WorkType)
        .input("WorkPriority", sql.VarChar, req.body.WorkPriority)
        .input("AssetItemTagID", sql.VarChar, req.body.AssetItemTagID)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("CleaningGroup", sql.VarChar, req.body.CleaningGroup)
        .input("Intruction_Remarks", sql.VarChar, req.body.Intruction_Remarks)
        .input(
          "ScheduleStartDateTime",
          sql.VarChar,
          req.body.ScheduleStartDateTime
        )
        .input("ScheduleEndDateTime", sql.VarChar, req.body.ScheduleEndDateTime)
        .input("ScheduledDay", sql.VarChar, req.body.ScheduledDay)
        .input("SchedulingPriority", sql.VarChar, req.body.SchedulingPriority)
        .input("Frequency", sql.VarChar, req.body.Frequency)

        .query(
          ` 
          UPDATE [dbo].[tblCleaningWorks]
SET


[EmployeeID] =@EmployeeID
,[RequestDateTime] =@RequestDateTime
,[WorkType] =@WorkType
,[WorkPriority] =@WorkPriority
,[AssetItemTagID] =@AssetItemTagID
,[DepartmentCode] =@DepartmentCode
,[BuildingCode] =@BuildingCode
,[LocationCode] =@LocationCode
,[CleaningGroup] =@CleaningGroup
,[Frequency] =@Frequency
,[ScheduleStartDateTime] =@ScheduleStartDateTime
,[ScheduleEndDateTime] =@ScheduleEndDateTime
,[ScheduledDay] =@ScheduledDay
,[SchedulingPriority] =@SchedulingPriority
,[Intruction_Remarks] =@Intruction_Remarks
WHERE RequestNumber='${RequestNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetTransactions_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemTagID = req.params.AssetItemTagID;
      let data = await pool
        .request()

        .input("AssetCondition", sql.VarChar, req.body.AssetCondition)
        .input(
          "AssetItemDescription",
          sql.VarChar,
          req.body.AssetItemDescription
        )
        .input("SerialNumber", sql.VarChar, req.body.SerialNumber)
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("CaptureDateTime", sql.VarChar, req.body.CaptureDateTime)
        .input("ScannedDateTime", sql.VarChar, req.body.ScannedDateTime)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)

        .query(
          ` 
          UPDATE [dbo].[tblAssetTransactions]
SET


[AssetCondition] =@AssetCondition
,[AssetItemDescription] =@AssetItemDescription
,[SerialNumber] =@SerialNumber
,[EmployeeID] =@EmployeeID
,[CaptureDateTime] =@CaptureDateTime
,[DepartmentCode] =@DepartmentCode
,[BuildingCode] =@BuildingCode
,[LocationCode] =@LocationCode
,[ScannedDateTime] =@ScannedDateTime

WHERE AssetItemTagID='${AssetItemTagID}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserAuthority_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const UserAuthorityCode = req.params.UserAuthorityCode;
      let data = await pool
        .request()

        .input("UserAuthoritySeq", sql.SmallInt, req.body.UserAuthoritySeq)
        .input("UserAuthorityDesc", sql.VarChar, req.body.UserAuthorityDesc)
        .query(
          ` 
          UPDATE [dbo].[prmUserAuthority]
SET

[UserAuthoritySeq] =@UserAuthoritySeq
,[UserAuthorityDesc] =@UserAuthorityDesc
WHERE UserAuthorityCode='${UserAuthorityCode}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserCredentials_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .input("UserAuthorityCode", sql.VarChar, req.body.UserAuthorityCode)
        .input("UserID", sql.VarChar, req.body.UserID)
        .input("UserPassword", sql.VarChar, req.body.UserPassword)
        .input("WindowsID", sql.VarChar, req.body.WindowsID)
        .input("WindowsPassword", sql.VarChar, req.body.WindowsPassword)
        .input("CreatedByAdminID", sql.VarChar, req.body.CreatedByAdminID)
        .input("CreationDateTime", sql.VarChar, req.body.ContactLandlineNumber)

        .query(
          ` 
          UPDATE [dbo].[tblUserCredentials]
SET


[UserAuthorityCode] =@UserAuthorityCode
,[UserID] =@UserID
,[UserPassword] =@UserPassword
,[WindowsID] =@WindowsID
,[WindowsPassword] =@WindowsPassword
,[CreatedByAdminID] =@CreatedByAdminID
,[CreationDateTime] =@CreationDateTime


WHERE EmployeeID='${EmployeeID}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserSystemAccess_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .input(
          "UserAuthorityAccessYN",
          sql.VarChar,
          req.body.UserAuthorityAccessYN
        )
        .input("AddedByAdminID", sql.VarChar, req.body.AddedByAdminID)
        .query(
          ` 
          UPDATE [dbo].[tblUserSystemAccess]
SET

[UserAuthorityAccessYN] =@UserAuthorityAccessYN
,[AddedByAdminID] =@AddedByAdminID
WHERE EmployeeID='${EmployeeID}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequest_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseRequestNumber = req.params.PurchaseRequestNumber;
      let data = await pool
        .request()

        .input("RequestDate", sql.VarChar, req.body.RequestDate)
        .input("RequiredDate", sql.VarChar, req.body.RequiredDate)
        .input("RequestByEmployeeID", sql.VarChar, req.body.RequestByEmployeeID)
        .input("Purpose", sql.VarChar, req.body.Purpose)
        .input("VATInclude", sql.VarChar, req.body.VATInclude)
        .input("VendorID", sql.VarChar, req.body.VendorID)
        .input("VerifiedByEmpl", sql.VarChar, req.body.VerifiedByEmpl)
        .input("VAT", sql.Numeric, req.body.VAT)
        .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)
        .query(
          ` 
          UPDATE [dbo].[tblPurchaseRequest]
SET


[RequestDate] =@RequestDate
,[RequiredDate] =@RequiredDate
,[RequestByEmployeeID] =@RequestByEmployeeID
,[Purpose] =@Purpose
,[VATInclude] =@VATInclude
,[VendorID] =@VendorID
,[VerifiedByEmpl] =@VerifiedByEmpl
,[VAT] =@VAT
,[TOTAL_AMOUNT] =@TOTAL_AMOUNT

WHERE PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrderNumber_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input("PurchaseOrderNumber", sql.Numeric, req.body.PurchaseOrderNumber)

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[PurchaseOrderNumber] =@PurchaseOrderNumber
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequestNumber_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .input(
          "PurchaseRequestNumber",
          sql.Numeric,
          req.body.PurchaseRequestNumber
        )

        .query(
          ` 
          UPDATE [dbo].[workRequestCount]
SET

[PurchaseRequestNumber] =@PurchaseRequestNumber
WHERE No='${No}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrder_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .input(
          "PurchaseRequestNumber",
          sql.VarChar,
          req.body.PurchaseRequestNumber
        )
        .input("PODate", sql.VarChar, req.body.PODate)
        .input("DeliveryDate", sql.VarChar, req.body.DeliveryDate)
        .input(
          "ProcessedByEmployeeID",
          sql.VarChar,
          req.body.ProcessedByEmployeeID
        )
        .input("VATInclude", sql.VarChar, req.body.VATInclude)
        .input("ApprovedByEmpl", sql.VarChar, req.body.ApprovedByEmpl)
        .input("ApprovalDate", sql.VarChar, req.body.ApprovalDate)

        .input("VendorID", sql.VarChar, req.body.VendorID)
        .input("VendorConfirm", sql.VarChar, req.body.VendorConfirm)
        .input("ConfirmationDate", sql.VarChar, req.body.ConfirmationDate)
        .input("Comments", sql.VarChar, req.body.Comments)
        .input("VAT", sql.Numeric, req.body.VAT)
        .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)
        .query(
          ` 
          UPDATE [dbo].[tblPurchaseOrder]
SET


[PurchaseRequestNumber] =@PurchaseRequestNumber
,[PODate] =@PODate
,[DeliveryDate] =@DeliveryDate
,[ProcessedByEmployeeID] =@ProcessedByEmployeeID
,[VATInclude] =@VATInclude
,[ApprovedByEmpl] =@ApprovedByEmpl
,[ApprovalDate] =@ApprovalDate

,[VendorID] =@VendorID
,[VendorConfirm] =@VendorConfirm
,[ConfirmationDate] =@ConfirmationDate
,[Comments] =@Comments
,[VAT] =@VAT
,[TOTAL_AMOUNT] =@TOTAL_AMOUNT
WHERE PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReceipt_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .input("InvoiceNumber", sql.VarChar, req.body.InvoiceNumber)
        .input("InvoiceDate", sql.VarChar, req.body.InvoiceDate)
        .input("ActualDeliveryDate", sql.VarChar, req.body.ActualDeliveryDate)
        .input(
          "RecievedByEmployeeID",
          sql.VarChar,
          req.body.RecievedByEmployeeID
        )

        .input("VendorID", sql.VarChar, req.body.VendorID)
        .input("FeedbackOrComments", sql.VarChar, req.body.FeedbackOrComments)
        .input("DiscountAmount", sql.VarChar, req.body.DiscountAmount)
        .input("VAT", sql.Numeric, req.body.VAT)
        .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)
        .query(
          ` 
          UPDATE [dbo].[tblGoodsReceipt]
SET


[InvoiceNumber] =@InvoiceNumber
,[InvoiceDate] =@InvoiceDate
,[ActualDeliveryDate] =@ActualDeliveryDate
,[RecievedByEmployeeID] =@RecievedByEmployeeID


,[VendorID] =@VendorID
,[FeedbackOrComments] =@FeedbackOrComments
,[DiscountAmount] =@DiscountAmount
,[VAT] =@VAT
,[TOTAL_AMOUNT] =@TOTAL_AMOUNT
WHERE PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReturn_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .input("InvoiceNumber", sql.VarChar, req.body.InvoiceNumber)
        .input("ReturnDate", sql.VarChar, req.body.ReturnDate)

        .input(
          "RecievedByEmployeeID",
          sql.VarChar,
          req.body.RecievedByEmployeeID
        )

        .input("VendorID", sql.VarChar, req.body.VendorID)
        .input("ReasonOrComments", sql.VarChar, req.body.ReasonOrComments)
        .input("VAT", sql.Numeric, req.body.VAT)
        .input("TOTAL_AMOUNT", sql.Numeric, req.body.TOTAL_AMOUNT)
        .query(
          ` 
          UPDATE [dbo].[tblGoodsReturn]
SET


[InvoiceNumber] =@InvoiceNumber
,[ReturnDate] =@ReturnDate

,[RecievedByEmployeeID] =@RecievedByEmployeeID


,[VendorID] =@VendorID
,[ReasonOrComments] =@ReasonOrComments
,[VAT] =@VAT
,[TOTAL_AMOUNT] =@TOTAL_AMOUNT

WHERE PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Floor_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FloorCode = req.params.FloorCode;
      const existingRecord = await pool
        .request()
        .input("FloorCode", sql.VarChar, FloorCode)
        .query(`SELECT * FROM prmFloor WHERE FloorCode = '${FloorCode}'`);

      if (existingRecord.recordset.length === 0) {
        // No record with the specified FloorCode found in the database
        return res.status(404).json({
          status: 404,
          message: "FloorCode found",
          error: "FloorCode not found",
        });
      }
      let data = await pool
        .request()

        .input("FloorDesc", sql.VarChar, req.body.FloorDesc)

        .query(
          ` 
          UPDATE [dbo].[prmFloor]
SET

[FloorDesc] =@FloorDesc
WHERE FloorCode='${FloorCode}'`
        );
      res.status(200).json({
        status: 200,
        successfully: "data update successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_newpage_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.params.BuildingCode;

      const file = req.files["BuildingImage"];

      let url = ""; // Initialize the URL variable

      if (file && file.length > 0) {
        url = `http://gs1ksa.org:3021/api/profile/${file[0].filename}`;
      }
      if (typeof req.body.BuildingCode === "string" || !url) {
        // No new EmployeeImage provided or it's an empty string, keep the old one
        const existingData = await pool
          .request()
          .query(
            `SELECT [BuildingImage] FROM [dbo].[prmBuilding] WHERE BuildingCode='${BuildingCode}'`
          );

        if (existingData.recordset.length > 0) {
          url = existingData.recordset[0].BuildingImage;
        }
      }
      let data = await pool
        .request()

        .input("BuildingDesc", sql.VarChar, req.body.BuildingDesc)
        .input("Latitude", sql.VarChar, req.body.Latitude)
        .input("Longtitude", sql.VarChar, req.body.Longtitude)

        .input("BuildingImage", sql.VarChar, url)
        .input("Capacity", sql.Numeric, req.body.Capacity)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .query(
          ` 
          UPDATE [dbo].[prmBuilding]
SET

[BuildingDesc] =@BuildingDesc
,[Latitude] =@Latitude
,[Longtitude] =@Longtitude
,[BuildingImage] =@BuildingImage
,[Capacity] =@Capacity
,[LocationCode] =@LocationCode

WHERE BuildingCode='${BuildingCode}'`
        );
      res.status(200).json({
        status: 200,
        message: "data Update successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.params.RoomCode;
      let data = await pool
        .request()

        .input("RoomDesc", sql.VarChar, req.body.RoomDesc)

        .query(
          ` 
          UPDATE [dbo].[prmRooms]
SET

[RoomDesc] =@RoomDesc
WHERE RoomCode='${RoomCode}'`
        );
      res.status(200).json({
        status: 200,
        message: "data Update successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_newpage_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.params.RoomCode;

      let data = await pool
        .request()

        .input("RoomDesc", sql.VarChar, req.body.RoomDesc)
        .input("Area", sql.VarChar, req.body.Area)
        .input("FloorCode", sql.VarChar, req.body.FloorCode)

        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)
        .input("Capacity", sql.VarChar, req.body.Capacity)
        .input("Occupants", sql.VarChar, req.body.Occupants)
        .input("VacancyFlag", sql.VarChar, req.body.VacancyFlag)
        .query(
          ` 
          UPDATE [dbo].[prmRooms]
SET

[RoomDesc] =@RoomDesc
,[Area] =@Area
,[FloorCode] =@FloorCode
,[BuildingCode] =@BuildingCode
,[LocationCode] =@LocationCode
,[Capacity] =@Capacity
,[Occupants] =@Occupants
,[VacancyFlag] =@VacancyFlag
WHERE RoomCode='${RoomCode}'`
        );
      res.status(200).json({
        status: 200,
        message: "data Update successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRooms_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .input("RoomCode", sql.VarChar, req.body.RoomCode)
        .query(
          ` 
          UPDATE [dbo].[tblEmployeeRooms]
SET

[RoomCode] =@RoomCode
WHERE EmployeeID='${EmployeeID}'`
        );
      res.status(200).json({
        status: 200,
        message: "data Update successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRoomTransfers_Put(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TransferRequestNumber = req.params.TransferRequestNumber;
      let data = await pool
        .request()

        .input("TransferRequestDate", sql.VarChar, req.body.TransferRequestDate)
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("FROM_RoomCode", sql.VarChar, req.body.FROM_RoomCode)
        .input("TO_RoomCode", sql.VarChar, req.body.TO_RoomCode)

        .input(
          "EmployeeID_Approval_1",
          sql.VarChar,
          req.body.EmployeeID_Approval_1
        )
        .input(
          "DateApproved_Approval_1",
          sql.VarChar,
          req.body.DateApproved_Approval_1
        )
        .input(
          "ApprovedFlag_Approval_1",
          sql.VarChar,
          req.body.ApprovedFlag_Approval_1
        )

        .input(
          "EmployeeID_Approval_2",
          sql.VarChar,
          req.body.EmployeeID_Approval_2
        )
        .input(
          "DateApproved_Approval_2",
          sql.VarChar,
          req.body.DateApproved_Approval_2
        )
        .input(
          "ApprovedFlag_Approval_2",
          sql.VarChar,
          req.body.ApprovedFlag_Approval_2
        )

        .input(
          "EmployeeID_Approval_3",
          sql.VarChar,
          req.body.EmployeeID_Approval_3
        )
        .input(
          "DateApproved_Approval_3",
          sql.VarChar,
          req.body.DateApproved_Approval_3
        )
        .input(
          "ApprovedFlag_Approval_3",
          sql.VarChar,
          req.body.ApprovedFlag_Approval_3
        )
        .query(
          ` 
          UPDATE [dbo].[tblEmployeeRoomTransfers]
SET

[TransferRequestDate] =@TransferRequestDate
,[EmployeeID] =@EmployeeID
,[FROM_RoomCode] =@FROM_RoomCode
,[TO_RoomCode] =@TO_RoomCode

,[EmployeeID_Approval_1] =@EmployeeID_Approval_1
,[DateApproved_Approval_1] =@DateApproved_Approval_1
,[ApprovedFlag_Approval_1] =@ApprovedFlag_Approval_1

,[EmployeeID_Approval_2] =@EmployeeID_Approval_2
,[DateApproved_Approval_2] =@DateApproved_Approval_2
,[ApprovedFlag_Approval_2] =@ApprovedFlag_Approval_2

,[EmployeeID_Approval_3] =@EmployeeID_Approval_3
,[DateApproved_Approval_3] =@DateApproved_Approval_3
,[ApprovedFlag_Approval_3] =@ApprovedFlag_Approval_3

WHERE TransferRequestNumber='${TransferRequestNumber}'`
        );
      res.status(200).json({
        status: 200,
        message: "data Update successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  //-------------------------------------------------------------------------------------

  //---------------------------GET--------------------------------------------------------
  async EmployeeMaster_GET_BYID(req, res, next) {
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
  async EmployeeMaster_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblEmployeeMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WarrantyPeriodCode = req.params.WarrantyPeriodCode;
      let data = await pool
        .request()

        .query(
          `select * from prmWarrantyPeriod where WarrantyPeriodCode='${WarrantyPeriodCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_GET_LISTS(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmWarrantyPeriod`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCondition_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetConditionCode = req.params.AssetConditionCode;
      let data = await pool
        .request()

        .query(
          `select * from prmAssetCondition where AssetConditionCode='${AssetConditionCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCondition_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmAssetCondition`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetSubCategory_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select * from prmAssetSubCategory`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetSubCategory_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetSubCategoryCode = req.params.AssetSubCategoryCode;
      let data = await pool
        .request()

        .query(
          `select * from prmAssetSubCategory where AssetSubCategoryCode='${AssetSubCategoryCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCategory_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetCategoryCode = req.params.AssetCategoryCode;
      let data = await pool
        .request()

        .query(
          `select * from prmAssetCategory where AssetCategoryCode='${AssetCategoryCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCategory_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmAssetCategory`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetTypeCode = req.params.AssetTypeCode;
      let data = await pool
        .request()

        .query(
          `select * from prmAssetType where AssetTypeCode='${AssetTypeCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmAssetType`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;
      let data = await pool
        .request()

        .query(
          `select * from tblAssetsMaster where AssetItemDescription='${AssetItemDescription}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblAssetsMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const NationalityCode = req.params.NationalityCode;
      let data = await pool
        .request()

        .query(
          `select * from prmNationality where NationalityCode='${NationalityCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmNationality`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_GET_LIST_Nationality(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select NationalityCode from prmNationality`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_GET_LIST_NationalityDES(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const NationalityCode = req.params.NationalityCode;
      let data = await pool
        .request()

        .query(
          `select NationalityDesc from prmNationality where NationalityCode='${NationalityCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkType_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()

        .query(
          `select * from prmWorkType where WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkType_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmWorkType`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkTRADE_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmWorkTrade`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkTRADE_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()

        .query(
          `select * from prmWorkTrade where WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkStatus_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmWorkStatus`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkStatus_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkStatusCode = req.params.WorkStatusCode;
      let data = await pool
        .request()

        .query(
          `select * from prmWorkStatus where WorkStatusCode='${WorkStatusCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkPriority_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmWorkPriority`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkPriority_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkPriorityCode = req.params.WorkPriorityCode;
      let data = await pool
        .request()

        .query(
          `select * from prmWorkPriority where WorkPriorityCode='${WorkPriorityCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkCatagres_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmWorkCategory`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkCatagres_GET_CODE_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select WorkCategoryCode from prmWorkCategory`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkCatagres_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkCategoryCode = req.params.WorkCategoryCode;
      let data = await pool
        .request()

        .query(
          `select * from prmWorkCategory where WorkCategoryCode='${WorkCategoryCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmDepartment`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DepartmentCode = req.params.DepartmentCode;
      let data = await pool
        .request()

        .query(
          `select * from prmDepartment where DepartmentCode='${DepartmentCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmBuilding`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.params.BuildingCode;
      let data = await pool
        .request()

        .query(
          `select * from prmBuilding where BuildingCode='${BuildingCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmLocation`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const LocationCode = req.params.LocationCode;
      let data = await pool
        .request()

        .query(
          `select * from prmLocation where LocationCode='${LocationCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmProblemCategory`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const ProblemCategoryCode = req.params.ProblemCategoryCode;
      let data = await pool
        .request()

        .query(
          `select * from prmProblemCategory where ProblemCategoryCode='${ProblemCategoryCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async RequestStatus_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmRequestStatus`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async RequestStatus_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestStatusCode = req.params.RequestStatusCode;
      let data = await pool
        .request()

        .query(
          `select * from prmRequestStatus where RequestStatusCode='${RequestStatusCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmFailure`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_GET_CODELIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select FailureStatusCode from prmFailure`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FailureStatusCode = req.params.FailureStatusCode;
      let data = await pool
        .request()

        .query(
          `select * from prmFailure where FailureStatusCode='${FailureStatusCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmSolution`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_GET_CODE_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select SolutiontatusCode from prmSolution`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SolutiontatusCode = req.params.SolutiontatusCode;
      let data = await pool
        .request()

        .query(
          `select * from prmSolution where SolutiontatusCode='${SolutiontatusCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select DepartmentCode from prmDepartment`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_desc_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DepartmentCode = req.params.DepartmentCode;
      let data = await pool
        .request()
        .query(
          `select DepartmentDesc from prmDepartment where DepartmentCode= '${DepartmentCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select BuildingCode from prmBuilding`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select LocationCode from prmLocation`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkType_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select WorkTypeCode from prmWorkType`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkType_descri_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()
        .query(
          `select WorkTypeDesc from prmWorkType where  WorkTypeCode= '${WorkTypeCode}' `
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkPriority_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select WorkPriorityCode from prmWorkPriority`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkTrade_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()
        .query(
          `select WorkTradeCode from prmWorkTrade where  WorkTypeCode='${WorkTypeCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkTrade_descri_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTradeCode = req.params.WorkTradeCode;
      let data = await pool
        .request()
        .query(
          `select WorkTradeDesc from prmWorkTrade where WorkTradeCode= '${WorkTradeCode}' `
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select AssetItemTagID from tblAssetTransactions`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_descrip_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemTagID = req.params.AssetItemTagID;
      let data = await pool
        .request()
        .query(
          `select AssetItemDescription from tblAssetTransactions where AssetItemTagID= '${AssetItemTagID}' `
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_model_all_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;
      let data = await pool
        .request()
        .query(
          `select * from tblAssetsMaster where AssetItemDescription= '${AssetItemDescription}' `
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select ProblemCategoryCode from prmProblemCategory`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_descrip_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const ProblemCategoryCode = req.params.ProblemCategoryCode;
      let data = await pool
        .request()
        .query(
          `select ProblemCategoryDesc from prmProblemCategory where  ProblemCategoryCode= '${ProblemCategoryCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async RequestStatus_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select RequestStatusCode from prmRequestStatus`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Transactions_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()
        .query(
          `select * from tblAssetTransactions where EmployeeID= '${EmployeeID}' `
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Days_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmDays`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Days_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DaysCode = req.params.DaysCode;
      let data = await pool
        .request()

        .query(`select * from prmDays where DaysCode='${DaysCode}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Frequency_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmFrequency`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Frequency_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FreqCode = req.params.FreqCode;
      let data = await pool
        .request()

        .query(`select * from prmFrequency where FreqCode='${FreqCode}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkRequestItems_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblWorkRequestItems where RequestNumber='${RequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async workRequest_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`SELECT * FROM tblWorkRequest`);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async workRequest_WTD(req, res, next) {
    try {
      let pool = await sql.connect(config);

      // Calculate the start and end dates of the current week in a format SQL Server can understand.
      const currentDate = new Date();
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(currentDate);
      endOfWeek.setHours(23, 59, 59, 999);
      endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

      const formattedStartOfWeek = startOfWeek.toISOString();
      const formattedEndOfWeek = endOfWeek.toISOString();

      // Execute a SQL query to count records for the current week where 'RequestStatus' is 'Open' or 'RequestDateTime' is empty.
      const query = `
            SELECT
                COUNT(*) AS Count
            FROM tblWorkRequest
            WHERE RequestStatus = 'Open'
            AND (RequestDateTime >= '${formattedStartOfWeek}' AND RequestDateTime <= '${formattedEndOfWeek}')
        `;

      let data = await pool.request().query(query);

      res.status(200).json(data.recordset);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },

  async Employeenumber_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblEmployeeMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkRequestItems_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select * from tblWorkRequestItems`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Gender_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const GenderCode = req.params.GenderCode;
      let data = await pool
        .request()

        .query(`select * from prmGender where GenderCode='${GenderCode}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Gender_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmGender`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Title_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmTitle`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Title_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TitleCode = req.params.TitleCode;
      let data = await pool
        .request()

        .query(`select * from prmTitle where TitleCode='${TitleCode}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaritalStatus_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmMaritalStatus`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmDesignation`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DesignationCode = req.params.DesignationCode;
      let data = await pool
        .request()

        .query(
          `select DesignationDesc from prmDesignation where DesignationCode='${DesignationCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaritalStatus_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const MaritalCode = req.params.MaritalCode;
      let data = await pool
        .request()

        .query(
          `select * from prmMaritalStatus where MaritalCode='${MaritalCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetworkrequest_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from assetworkrequest where RequestNumber='${RequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async tblAssetsMaster_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;
      let data = await pool
        .request()

        .query(
          `select * from tblAssetsMaster where AssetItemDescription='${AssetItemDescription}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async workRequestCount_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const No = req.params.No;
      let data = await pool
        .request()

        .query(`select * from workRequestCount where No='${No}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeID_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select EmployeeID , Firstname from tblEmployeeMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmDesignation`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DesignationCode = req.params.DesignationCode;
      let data = await pool
        .request()

        .query(
          `select * from prmDesignation where DesignationCode='${DesignationCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeStatus_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeStatusCode = req.params.EmployeeStatusCode;
      let data = await pool
        .request()

        .query(
          `select * from prmEmployeeStatus where EmployeeStatusCode='${EmployeeStatusCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeStatus_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmEmployeeStatus`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrders_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblWorkOrders`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrders_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkOrderNumber = req.params.WorkOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblWorkOrders where WorkOrderNumber='${WorkOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async SystemModules_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SystemModuleCode = req.params.SystemModuleCode;
      let data = await pool
        .request()

        .query(
          `select * from prmSystemModules where SystemModuleCode='${SystemModuleCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async SystemModules_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmSystemModules`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async VendorMaster_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const VendorID = req.params.VendorID;
      let data = await pool
        .request()

        .query(`select * from tblVendorMaster where VendorID='${VendorID}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async VendorMaster_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblVendorMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetItemGroup_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmAssetItemGroup`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetItemGroup_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemGroupCode = req.params.AssetItemGroupCode;
      let data = await pool
        .request()

        .query(
          `select * from prmAssetItemGroup where AssetItemGroupCode='${AssetItemGroupCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaterialUnits_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const MaterialUnitCode = req.params.MaterialUnitCode;
      let data = await pool
        .request()

        .query(
          `select MaterialUnitDesc from prmMaterialUnits where MaterialUnitCode='${MaterialUnitCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaterialUnits_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select MaterialUnitCode from prmMaterialUnits`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select WarrantyPeriodCode from prmWarrantyPeriod`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WarrantyPeriodCode = req.params.WarrantyPeriodCode;
      let data = await pool
        .request()

        .query(
          `select WarrantyPeriodDesc from prmWarrantyPeriod where WarrantyPeriodCode='${WarrantyPeriodCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetTransactions_GET_ItemDescription(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;
      let data = await pool
        .request()

        .query(
          `select AssetItemTagID from tblAssetTransactions where AssetItemDescription='${AssetItemDescription}'`
        );

      res.status(200).json(data); // Respond with data
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PreventiveMaintenance_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblPreventiveMaintenance where RequestNumber='${RequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PreventiveMaintenance_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select * from tblPreventiveMaintenance`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningWorks_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblCleaningWorks`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningWorks_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblCleaningWorks where RequestNumber='${RequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async SchedPriority_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select SchedPriorityCode from prmSchedPriority`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningGroup_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select CleaningGroupCode from prmCleaningGroup`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningGroup_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const CleaningGroupCode = req.params.CleaningGroupCode;
      let data = await pool
        .request()

        .query(
          `select * from prmCleaningGroup where CleaningGroupCode='${CleaningGroupCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetTransactions_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemTagID = req.params.AssetItemTagID;
      let data = await pool
        .request()

        .query(
          `select * from tblAssetTransactions where AssetItemTagID='${AssetItemTagID}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetTransactions_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select * from tblAssetTransactions`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserAuthority_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmUserAuthority`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserAuthority_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const UserAuthorityCode = req.params.UserAuthorityCode;
      let data = await pool
        .request()

        .query(
          `select * from prmUserAuthority where UserAuthorityCode='${UserAuthorityCode}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserCredentials_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `select * from tblUserCredentials where EmployeeID='${EmployeeID}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserCredentials_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblUserCredentials`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async usersystemAccess_get_Em_id(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `select * from tblUserSystemAccessDetails where EmployeeID='${EmployeeID}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserSystemAccess_GET_LIST(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select * from tblUserSystemAccess`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserSystemAccess_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `select * from tblUserSystemAccess where EmployeeID='${EmployeeID}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserAuthority_GET_DropdownList(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select UserAuthorityCode from prmUserAuthority`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequest_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblPurchaseRequest`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequest_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseRequestNumber = req.params.PurchaseRequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblPurchaseRequest where PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrder_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblPurchaseOrder where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrder_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblPurchaseOrder`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReceipt_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblGoodsReceipt`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReceipt_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblGoodsReceipt where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReturn_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblGoodsReturn where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReturn_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblGoodsReturn`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequestDetail_GET_BY_PurchaseRequestNumber(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseRequestNumber = req.params.PurchaseRequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblPurchaseRequestDetail where PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequestDetail_GET_BY_PurchaseOrderNumber(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblPurchaseOrderDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GET_BY_PurchaseOrderNumber_GoodsReceiptDetail(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblGoodsReceiptDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GET_BY_PurchaseOrderNumber_GoodsReturn(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblGoodsReturnDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_GET_BYAssetType(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetType = req.params.AssetType;
      let data = await pool
        .request()

        .query(`select * from tblAssetsMaster where AssetType='${AssetType}'`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Asset_WarrantyEndDate(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const currentDate = new Date();
      let data = await pool
        .request()

        .query(
          `SELECT * FROM tblAssetsMaster WHERE WarrantyEndDate <= '${currentDate.toISOString()}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async location_managment_All(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(
          `SELECT tblWorkOrders.*, tblWorkRequest.*
FROM tblWorkOrders
INNER JOIN tblWorkRequest ON tblWorkOrders.WorkRequestNumber = tblWorkRequest.RequestNumber`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Floor_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FloorCode = req.params.FloorCode;
      const existingRecord = await pool
        .request()
        .input("FloorCode", sql.VarChar, FloorCode)
        .query(`SELECT * FROM prmFloor WHERE FloorCode = '${FloorCode}'`);

      if (existingRecord.recordset.length === 0) {
        // No record with the specified FloorCode found in the database
        return res.status(404).json({
          status: 404,
          message: "FloorCode found",
          error: "FloorCode not found",
        });
      }
      let data = await pool
        .request()

        .query(`select * from prmFloor where FloorCode='${FloorCode}'`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Floor_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmFloor`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_newpage_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmBuilding`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_newpage_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.params.BuildingCode;
      const existingRecord = await pool
        .request()
        .input("BuildingCode", sql.VarChar, BuildingCode)
        .query(
          `SELECT * FROM prmBuilding WHERE BuildingCode = '${BuildingCode}'`
        );

      if (existingRecord.recordset.length === 0) {
        // No record with the specified BuildingCode found in the database
        return res.status(404).json({
          status: 404,
          message: "BuildingCode found",
          error: "BuildingCode not found",
        });
      }
      let data = await pool
        .request()

        .query(
          `select * from prmBuilding where BuildingCode='${BuildingCode}'`
        );
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.params.RoomCode;
      const existingRecord = await pool
        .request()
        .input("RoomCode", sql.VarChar, RoomCode)
        .query(`SELECT * FROM prmRooms WHERE RoomCode = '${RoomCode}'`);

      if (existingRecord.recordset.length === 0) {
        // No record with the specified RoomCode found in the database
        return res.status(404).json({
          status: 404,
          message: "RoomCode found",
          error: "RoomCode not found",
        });
      }
      let data = await pool
        .request()

        .query(`select * from prmRooms where RoomCode='${RoomCode}'`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmRooms`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_newpage_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from prmRooms`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_newpage_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.params.RoomCode;
      const existingRecord = await pool
        .request()
        .input("RoomCode", sql.VarChar, RoomCode)
        .query(`SELECT * FROM prmRooms WHERE RoomCode = '${RoomCode}'`);

      if (existingRecord.recordset.length === 0) {
        // No record with the specified RoomCode found in the database
        return res.status(404).json({
          status: 404,
          message: "RoomCode found",
          error: "RoomCode not found",
        });
      }
      let data = await pool
        .request()

        .query(`select * from prmRooms where RoomCode='${RoomCode}'`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRooms_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      const existingRecord = await pool
        .request()
        .input("EmployeeID", sql.VarChar, EmployeeID)
        .query(
          `SELECT * FROM tblEmployeeRooms WHERE EmployeeID = '${EmployeeID}'`
        );

      if (existingRecord.recordset.length === 0) {
        // No record with the specified EmployeeID found in the database
        return res.status(404).json({
          status: 404,
          message: "EmployeeID found",
          error: "EmployeeID not found",
        });
      }
      let data = await pool
        .request()

        .query(
          `select * from tblEmployeeRooms where EmployeeID='${EmployeeID}'`
        );
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRooms_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request().query(`select * from tblEmployeeRooms`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRoomTransfers_GET_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TransferRequestNumber = req.params.TransferRequestNumber;
      const existingRecord = await pool
        .request()
        .input("TransferRequestNumber", sql.VarChar, TransferRequestNumber)
        .query(
          `SELECT * FROM tblEmployeeRoomTransfers WHERE TransferRequestNumber = '${TransferRequestNumber}'`
        );

      if (existingRecord.recordset.length === 0) {
        // No record with the specified TransferRequestNumber found in the database
        return res.status(404).json({
          status: 404,
          message: "TransferRequestNumber found",
          error: "TransferRequestNumber not found",
        });
      }
      let data = await pool
        .request()

        .query(
          `select * from tblEmployeeRoomTransfers where TransferRequestNumber='${TransferRequestNumber}'`
        );
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRoomTransfers_GET_List(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool
        .request()
        .query(`select * from tblEmployeeRoomTransfers`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Total_Capacity(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request()
        .query(`SELECT SUM(Capacity) AS total_Capacity
FROM prmRooms;`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Total_Occupants(req, res, next) {
    try {
      let pool = await sql.connect(config);
      let data = await pool.request()
        .query(`SELECT SUM(Occupants) AS total_Occupants
FROM prmRooms;`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  //-----------------------------------------------------------------------------------

  //---------------------------DELETE--------------------------------------------------------

  async AssetType_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetTypeCode = req.params.AssetTypeCode;
      let data = await pool
        .request()

        .query(
          `delete from prmAssetType where AssetTypeCode='${AssetTypeCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemDescription = req.params.AssetItemDescription;
      let data = await pool
        .request()

        .query(
          `delete from tblAssetsMaster where AssetItemDescription='${AssetItemDescription}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const NationalityCode = req.params.NationalityCode;
      let data = await pool
        .request()

        .query(
          `delete from prmNationality where NationalityCode='${NationalityCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WORKTYPE_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()

        .query(`delete from prmWorkType where WorkTypeCode='${WorkTypeCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WORKTRADE_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkTypeCode = req.params.WorkTypeCode;
      let data = await pool
        .request()

        .query(`delete from prmWorkTrade where WorkTypeCode='${WorkTypeCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WORKStatus_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkStatusCode = req.params.WorkStatusCode;
      let data = await pool
        .request()

        .query(
          `delete from prmWorkStatus where WorkStatusCode='${WorkStatusCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WORKPriority_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkPriorityCode = req.params.WorkPriorityCode;
      let data = await pool
        .request()

        .query(
          `delete from prmWorkPriority where WorkPriorityCode='${WorkPriorityCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WORKCatagres_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkCategoryCode = req.params.WorkCategoryCode;
      let data = await pool
        .request()

        .query(
          `delete from prmWorkCategory where WorkCategoryCode='${WorkCategoryCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DepartmentCode = req.params.DepartmentCode;
      let data = await pool
        .request()

        .query(
          `delete from prmDepartment where DepartmentCode='${DepartmentCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.params.BuildingCode;
      let data = await pool
        .request()

        .query(`delete from prmBuilding where BuildingCode='${BuildingCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const LocationCode = req.params.LocationCode;
      let data = await pool
        .request()

        .query(`delete from prmLocation where LocationCode='${LocationCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async ProblemCategory_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const ProblemCategoryCode = req.params.ProblemCategoryCode;
      let data = await pool
        .request()

        .query(
          `delete from prmProblemCategory where ProblemCategoryCode='${ProblemCategoryCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async RequestStatus_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestStatusCode = req.params.RequestStatusCode;
      let data = await pool
        .request()

        .query(
          `delete from prmRequestStatus where RequestStatusCode='${RequestStatusCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FailureStatusCode = req.params.FailureStatusCode;
      let data = await pool
        .request()

        .query(
          `delete from prmFailure where FailureStatusCode='${FailureStatusCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SolutiontatusCode = req.params.SolutiontatusCode;
      let data = await pool
        .request()

        .query(
          `delete from prmSolution where SolutiontatusCode='${SolutiontatusCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async DAYS_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DaysCode = req.params.DaysCode;
      let data = await pool
        .request()

        .query(`delete from prmDays where DaysCode='${DaysCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Frequency_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FreqCode = req.params.FreqCode;
      let data = await pool
        .request()

        .query(`delete from prmFrequency where FreqCode='${FreqCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Gender_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const GenderCode = req.params.GenderCode;
      let data = await pool
        .request()

        .query(`delete from prmGender where GenderCode='${GenderCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Title_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TitleCode = req.params.TitleCode;
      let data = await pool
        .request()

        .query(`delete from prmTitle where TitleCode='${TitleCode}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaritalStatus_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const MaritalCode = req.params.MaritalCode;
      let data = await pool
        .request()

        .query(
          `delete from prmMaritalStatus where MaritalCode='${MaritalCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCategory_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetCategoryCode = req.params.AssetCategoryCode;
      let data = await pool
        .request()

        .query(
          `delete from prmAssetCategory where AssetCategoryCode='${AssetCategoryCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetSubCategory_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetSubCategoryCode = req.params.AssetSubCategoryCode;
      let data = await pool
        .request()

        .query(
          `delete from prmAssetSubCategory where AssetSubCategoryCode='${AssetSubCategoryCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCondition_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetConditionCode = req.params.AssetConditionCode;
      let data = await pool
        .request()

        .query(
          `delete from prmAssetCondition where AssetConditionCode='${AssetConditionCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WarrantyPeriodCode = req.params.WarrantyPeriodCode;
      let data = await pool
        .request()

        .query(
          `delete from prmWarrantyPeriod where WarrantyPeriodCode='${WarrantyPeriodCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeMaster_DELETE_BYID(req, res, next) {
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
  },
  async assetworkrequest_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const seq = req.params.seq;
      let data = await pool
        .request()

        .query(`delete from assetworkrequest where seq='${seq}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async all_work_request_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `DELETE FROM tblWorkRequest
WHERE RequestNumber = '${RequestNumber}'`
        );
      let data1 = await pool
        .request()

        .query(
          `DELETE FROM assetworkrequest
WHERE RequestNumber = '${RequestNumber}'`
        );

      console.log(data);
      res.status(200).json("Work Request has been deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Designation_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const DesignationCode = req.params.DesignationCode;
      let data = await pool
        .request()

        .query(
          `delete from prmDesignation where DesignationCode='${DesignationCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeStatus_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeStatusCode = req.params.EmployeeStatusCode;
      let data = await pool
        .request()

        .query(
          `delete from prmEmployeeStatus where EmployeeStatusCode='${EmployeeStatusCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkOrders_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const WorkOrderNumber = req.params.WorkOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblWorkOrders where WorkOrderNumber='${WorkOrderNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async SystemModules_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const SystemModuleCode = req.params.SystemModuleCode;
      let data = await pool
        .request()

        .query(
          `delete from prmSystemModules where SystemModuleCode='${SystemModuleCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async VendorMaster_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const VendorID = req.params.VendorID;
      let data = await pool
        .request()

        .query(`delete from tblVendorMaster where VendorID='${VendorID}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetItemGroup_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemGroupCode = req.params.AssetItemGroupCode;
      let data = await pool
        .request()

        .query(
          `delete from prmAssetItemGroup where AssetItemGroupCode='${AssetItemGroupCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PreventiveMaintenance_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblPreventiveMaintenance where RequestNumber='${RequestNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async CleaningWorks_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblCleaningWorks where RequestNumber='${RequestNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetTransactions_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const AssetItemTagID = req.params.AssetItemTagID;
      let data = await pool
        .request()

        .query(
          `delete from tblAssetTransactions where AssetItemTagID='${AssetItemTagID}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserAuthority_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const UserAuthorityCode = req.params.UserAuthorityCode;
      let data = await pool
        .request()

        .query(
          `delete from prmUserAuthority where UserAuthorityCode='${UserAuthorityCode}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserCredentials_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `delete from tblUserCredentials where EmployeeID='${EmployeeID}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async UserSystemAccess_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `delete from tblUserSystemAccess where EmployeeID='${EmployeeID}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequest_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseRequestNumber = req.params.PurchaseRequestNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblPurchaseRequest where PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      let data1 = await pool
        .request()

        .query(
          `delete from tblPurchaseRequestDetail where PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrder_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblPurchaseOrder where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      let data1 = await pool
        .request()

        .query(
          `delete from tblPurchaseOrderDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReceipt_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblGoodsReceipt where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReturn_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblGoodsReturn where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequestAsset_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const seq = req.params.seq;
      let data = await pool
        .request()

        .query(`delete from tblPurchaseRequestDetail where seq='${seq}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrderAsset_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const seq = req.params.seq;
      let data = await pool
        .request()

        .query(`delete from tblPurchaseOrderDetail where seq='${seq}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseGOODSAsset_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const seq = req.params.seq;
      let data = await pool
        .request()

        .query(`delete from tblGoodsReceiptDetail where seq='${seq}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GOODSReturnAsset_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const seq = req.params.seq;
      let data = await pool
        .request()

        .query(`delete from tblGoodsReturnDetail where seq='${seq}'`);
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrderNumber_GOODSReturnAsset_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblGoodsReturnDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrderNumber_GOODSRecipt_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblGoodsReceiptDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async usersystem_access_DELETE_BY_emid(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `delete from tblUserSystemAccessDetails where EmployeeID='${EmployeeID}'`
        );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Floor_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const FloorCode = req.params.FloorCode;
      let data = await pool
        .request()

        .query(`delete from prmFloor where FloorCode='${FloorCode}'`);
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_newpage_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const BuildingCode = req.params.BuildingCode;
      let data = await pool
        .request()

        .query(`delete from prmBuilding where BuildingCode='${BuildingCode}'`);
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.params.RoomCode;
      let data = await pool
        .request()

        .query(`delete from prmRooms where RoomCode='${RoomCode}'`);
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Rooms_newpage_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RoomCode = req.params.RoomCode;
      let data = await pool
        .request()

        .query(`delete from prmRooms where RoomCode='${RoomCode}'`);
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRooms_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(`delete from tblEmployeeRooms where EmployeeID='${EmployeeID}'`);
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeRoomTransfers_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const TransferRequestNumber = req.params.TransferRequestNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblEmployeeRoomTransfers where TransferRequestNumber='${TransferRequestNumber}'`
        );
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkRequest_count_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const RequestNumber = req.params.RequestNumber;
      let data = await pool
        .request()

        .query(
          `delete from assetworkrequest where RequestNumber='${RequestNumber}'`
        );
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseRequest_count_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseRequestNumber = req.params.PurchaseRequestNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblPurchaseRequestDetail where PurchaseRequestNumber='${PurchaseRequestNumber}'`
        );
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async PurchaseOrder_count_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblPurchaseOrderDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReturn_count_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblGoodsReturnDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async GoodsReceipt_count_DELETE_BYID(req, res, next) {
    try {
      let pool = await sql.connect(config);
      const PurchaseOrderNumber = req.params.PurchaseOrderNumber;
      let data = await pool
        .request()

        .query(
          `delete from tblGoodsReceiptDetail where PurchaseOrderNumber='${PurchaseOrderNumber}'`
        );
      console.log(data);
      res.status(200).json({
        status: 200,
        successfully: "Data delete successfully",
        data: data.rowsAffected[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  //------------------------------------------------------------------------------------------
  async getworkRequest(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .query(`select * from tblEmployeeMaster where EmployeeID=@EmployeeID`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async getworkRequest_by_EPID(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .query(`select * from tblEmployeeMaster where EmployeeID=@EmployeeID`);
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
      // const file = req.files["EmployeeImage"];

      // const url = `http://gs1ksa.org:3021/api/profile/${file[0].filename}`;
      const EmployeeID = req.body.EmployeeID;
      let pool = await sql.connect(config);

      var today = new Date();

      let data = await pool
        .request()

        .input("Firstname", sql.VarChar, req.body.Firstname)
        .input("Middlename", sql.VarChar, req.body.Middlename)
        .input("Lastname", sql.VarChar, req.body.Lastname)

        .input("MobileNumber", sql.VarChar, req.body.MobileNumber)
        .input("LandlineNumber", sql.VarChar, req.body.LandlineNumber)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode).query(`

    
   UPDATE [dbo].[tblEmployeeMaster]
SET

[Firstname] =@Firstname
,[Middlename] =@Middlename
,[Lastname] =@Lastname

,[MobileNumber] =@MobileNumber
,[LandlineNumber] =@LandlineNumber

,[DepartmentCode] =@DepartmentCode
,[LocationCode] =@LocationCode
,[BuildingCode] =@BuildingCode

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

      const RequestNumber = req.body.RequestNumber;
      let data = await pool
        .request()
        .input("RequestNumber", sql.VarChar, req.body.RequestNumber)
        .input("WorkType", sql.VarChar, req.body.WorkType)
        .input("WorkTrade", sql.VarChar, req.body.WorkTrade)

        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("RequestStatus", sql.VarChar, req.body.RequestStatus)
        .input("DepartmentCode", sql.VarChar, req.body.DepartmentCode)
        .input("BuildingCode", sql.VarChar, req.body.BuildingCode)
        .input("LocationCode", sql.VarChar, req.body.LocationCode)

        .input("WorkPriority", sql.VarChar, req.body.WorkPriority)

        .input("ProblemCategory", sql.VarChar, req.body.ProblemCategory)
        .input("ProblemDescription", sql.VarChar, req.body.ProblemDescription)
        .input("RequestDateTime", sql.DateTime, req.body.RequestDateTime)
        .query(
          ` 
            INSERT INTO [dbo].[tblWorkRequest]
                    ([RequestNumber]
                        ,[WorkType]
                         ,[WorkTrade]
                          ,[WorkPriority]
                           

                               ,[EmployeeID]
                                ,[RequestStatus]
                                 ,[DepartmentCode]
                                  ,[BuildingCode]
                                   ,[LocationCode]
                                     ,[ProblemCategory]
                                       ,[ProblemDescription]
                                        ,[RequestDateTime]
                          
                     
                        )
                 VALUES
                       (@RequestNumber
                       
                              
                                 ,@WorkType
                                   ,@WorkTrade
                                     ,@WorkPriority
                                     
                                       ,@EmployeeID
                                        ,@RequestStatus
                                         ,@DepartmentCode
                                          ,@BuildingCode
                                           ,@LocationCode
                                      ,@ProblemCategory
                                      ,@ProblemDescription
                                       ,@RequestDateTime
                                              
                       )
                    

                     
                       
                       
            `
        );
      //
      let dataaa = await pool
        .request()
        .input("RequestNumber", sql.VarChar, RequestNumber)
        .query(
          `select * from tblWorkRequest where RequestNumber='${RequestNumber}'`
        );
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
      const RequestNumber = req.body.RequestNumber;
      let data = await pool
        .request()

        .query(
          `select * from tblWorkRequest where RequestNumber='${RequestNumber}'`
        );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_WR(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select RequestStatus , RequestNumber from tblWorkRequest`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_VendorMaster(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select VendorID , VendorName from tblVendorMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_AssetsMaster(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select AssetItemDescription from tblAssetsMaster`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_PurchaseRequestNumber(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select PurchaseRequestNumber from tblPurchaseRequest`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_PurchaseOrderNumber(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select PurchaseOrderNumber from tblPurchaseOrder`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_Rooms(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(`select RoomDesc , RoomCode from prmRooms`);
      res.status(200).json({ status: 200, data: data.recordsets[0] });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Filter_Approval_Employees(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()

        .query(
          `
        SELECT EM.EmployeeID, CONCAT(EM.Firstname, ' ', EM.Middlename, ' ', EM.Lastname) AS Fullname
        FROM tblEmployeeMaster AS EM
        INNER JOIN tblEmployeeRooms AS ER ON EM.EmployeeID = ER.EmployeeID
      `
        );

      res.status(200).json({ status: 200, data: data.recordsets[0] });
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
      const RequestNumber = req.body.RequestNumber;
      const RequestStatus = req.body.RequestStatus;
      if (RequestStatus == "Closed") {
        let pool = await sql.connect(config);

        var today = new Date();

        let data = await pool
          .request()

          .input("RequestStatus", sql.VarChar, req.body.RequestStatus)
          .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
          .input("WorkType", sql.VarChar, req.body.WorkType)
          .input("WorkTrade", sql.VarChar, req.body.WorkTrade)
          .input("WorkPriority", sql.VarChar, req.body.WorkPriority).query(`

    
   UPDATE [dbo].[tblWorkRequest]
SET

[WorkType] =@WorkType
,[WorkTrade] =@WorkTrade
,[WorkPriority] =@WorkPriority
,[RequestStatus] =@RequestStatus
 ,[EmployeeID] =@EmployeeID
WHERE RequestNumber='${RequestNumber}'`);
        res.status(202).json({
          message: `Work Request no.'${RequestNumber}'  has been closed`,
        });
      } else {
        let pool = await sql.connect(config);

        var today = new Date();

        let data = await pool
          .request()

          .input("RequestStatus", sql.VarChar, req.body.RequestStatus)
          .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
          .input("WorkType", sql.VarChar, req.body.WorkType)
          .input("WorkTrade", sql.VarChar, req.body.WorkTrade)
          .input("WorkPriority", sql.VarChar, req.body.WorkPriority).query(`

    
   UPDATE [dbo].[tblWorkRequest]
SET

[WorkType] =@WorkType
,[WorkTrade] =@WorkTrade
,[WorkPriority] =@WorkPriority
,[RequestStatus] =@RequestStatus
 ,[EmployeeID] =@EmployeeID
WHERE RequestNumber='${RequestNumber}'`);
        res.status(202).json({
          message: `Work Request no.'${RequestNumber}'  has been updated`,
        });
      }
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
  //
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
