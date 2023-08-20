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
  async WorkTrade_post(req, res, next) {
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
  async WorkStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Workpriority_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkCatagres_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Department_post(req, res, next) {
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
                    
                                           
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Building_post(req, res, next) {
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
                    
                                           
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Location_post(req, res, next) {
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
  async ProblemCategory_post(req, res, next) {
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
  async RequestStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Failure_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Solution_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Days_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Frequency_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WorkRequestItems_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Gender_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Title_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async MaritalStatus_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async Nationality_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetsMaster_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
                    
                                           
                       )`
        );
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetType_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCategory_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },

  async AssetSubCategory_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async AssetCondition_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async WarrantyPeriod_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async EmployeeMaster_post(req, res, next) {
    try {
      let pool = await sql.connect(config);

      let data = await pool
        .request()
        .input("EmployeeID", sql.VarChar, req.body.EmployeeID)
        .input("EmployeeStatus", sql.VarChar, req.body.EmployeeStatus)
        .input("Gender", sql.VarChar, req.body.Gender)
        .input("Title", sql.VarChar, req.body.Title)
        .input("BirthDate", sql.Date, req.body.BirthDate)
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
                       ,[EmployeeStatus]
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
                       ,@EmployeeStatus
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
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `${error}` });
    }
  },
  async assetworkrequest_post(req, res, next) {
    try {
      let pool = await sql.connect(config);
const RequestNumber =req.body.RequestNumber
      let data = await pool
        .request()
        .input("RequestNumber", sql.VarChar, req.body.RequestNumber)
        .input("AssetItemDescription", sql.VarChar, req.body.AssetItemDescription)
        

        .query(
          ` 
            INSERT INTO [dbo].[assetworkrequest]
                       ([RequestNumber]
                       ,[AssetItemDescription]
                        )
                 VALUES
                       (@RequestNumber
                       ,@AssetItemDescription                
                       )`
      )
        
        let result = await pool
        .request().query(
          `select * from assetworkrequest where RequestNumber='${RequestNumber}'`
        );
      res.status(201).json(result);
    } catch (error) {
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
      let data = await pool
        .request()

        .input("EmployeeStatus", sql.VarChar, req.body.EmployeeStatus)
        .input("Gender", sql.VarChar, req.body.Gender)
        .input("Title", sql.VarChar, req.body.Title)
        .input("BirthDate", sql.Date, req.body.BirthDate)
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

[EmployeeStatus] =@EmployeeStatus
,[Gender] =@Gender
,[Title] =@Title
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
      let data = await pool
        .request()

        .input("AssetItemGroup", sql.VarChar, req.body.AssetItemGroup)
        .input("AssetType", sql.VarChar, req.body.AssetType)

        .input("AssetCategory", sql.VarChar, req.body.AssetCategory)
        .input("AssetSubCategory", sql.VarChar, req.body.AssetSubCategory)
        .input("Manufacturer", sql.VarChar, req.body.Manufacturer)
        .input("Model", sql.VarChar, req.body.Model)
        .input("Brand", sql.VarChar, req.body.Brand)

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
  async WarrantyPeriod_GET_LIST(req, res, next) {
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
      let data = await pool.request().query(`SELECT *
FROM tblWorkRequest o
INNER JOIN tblEmployeeMaster i
ON o.EmployeeID=i.EmployeeID`);

      res.status(200).json(data);
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

        .query(
          `select * from workRequestCount where No='${No}'`
        );
      res.status(200).json(data);
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

        .query(
          `delete from assetworkrequest where seq='${seq}'`
        );
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
      const EmployeeID = req.params.EmployeeID;
      let data = await pool
        .request()

        .query(
          `DELETE FROM tblWorkRequest
WHERE EmployeeID = '${EmployeeID}'`
      );
      let data2 = await pool
        .request()

        .query(
          `DELETE FROM tblEmployeeMaster
WHERE EmployeeID = '${EmployeeID}'`
      );
      
      console.log(data);
      res.status(200).json("Work Request has been deleted");
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
      let pool = await sql.connect(config);

      var today = new Date();

      let data = await pool
        .request()

        .input("WorkType", sql.VarChar, req.body.WorkType)
        .input("WorkTrade", sql.VarChar, req.body.WorkTrade)
        .input("WorkPriority", sql.VarChar, req.body.WorkPriority).query(`

    
   UPDATE [dbo].[tblWorkRequest]
SET

[WorkType] =@WorkType
,[WorkTrade] =@WorkTrade
,[WorkPriority] =@WorkPriority




 
 



  
  
WHERE RequestNumber='${RequestNumber}'`);
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

