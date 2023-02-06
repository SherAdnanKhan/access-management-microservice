const asyncHandler = require('../../middlewares/async');
var {bpoConnection} = require('../connections/bpoDb');
var sql = require("mssql");

// Get user details from database todo
exports.getUser = asyncHandler(async (id) => {
     const bpoConn = await bpoConnection();
    const rows = await bpoConn.request().input('ntlogin', sql.VarChar, id).query(
            `SELECT 
            top 1
            emp.Employee_OID as employee_id,
            emp.TRGEmpID as trgemp_id,
            emp.DomainName as domain,
            emp.Location_OID as location_oid,
            LOWER(emp.Email) as email,
            LTRIM(RTRIM(LOWER(emp.IbexGlobal_Id))) as ntlogin,
            emp.CellPhone as cellphone,
            emp.Team_OID as team_id,
            emp.Active_f as active,
            LTRIM(RTRIM(emp.Avaya_ID)) as Avaya_ID,
            CONCAT(emp.Last_Name, ', ', emp.First_Name) as name,
            Title.TitleName as bpo_employee_title,
            dpt.DepartmentName as dpt,
            loc.City as site_name,
            LTRIM(RTRIM(loc.location_name)) as location_name,
            loc.Country as country,
            cl.Client_OID as client_id,
            cl.Client_Name as client_name,
            c.Campaign_OID as campaign_id,
            c.Description as campaign_name,
            sup.Employee_OID as actual_supervisor,
            LOWER(sup.Email) as supervisor_email,
            CONCAT(sup.Last_Name, ', ', sup.First_Name) as supervisor_name,
            le.LegalEntityName
            FROM[TRGPayroll].[dbo].[Employee] emp(NOLOCK)
            JOIN[TRGPayroll].[dbo].Location loc(NOLOCK) ON loc.Location_OID = emp.Location_OID
            JOIN[TRGPayroll].[dbo].Department dpt(NOLOCK) ON dpt.Department_OID = emp.Department_OID
            LEFT JOIN[TRGPayroll].[dbo].[Employee] sup(NOLOCK) ON sup.Employee_OID = emp.Supervisor_OID
            JOIN[TRGPayroll].[Core].Title(NOLOCK) on Title.Title_OID = emp.Title_OID
            LEFT JOIN[TRGPayroll].[dbo].campaign_employee e(NOLOCK)ON e.Employee_OID = emp.Employee_OID AND e.Default_f = 1  AND e.Active_f = 'A'
            LEFT JOIN[TRGPayroll].[dbo].Campaign c(NOLOCK) ON e.Campaign_OID = c.Campaign_OID 
            LEFT JOIN[TRGPayroll].[dbo].Client cl(NOLOCK) ON c.Client_OID = cl.Client_OID
            JOIN[TRGPayroll].[dbo].LegalEntity le on le.LegalEntity_OID = emp.LegalEntity_OID
            WHERE emp.IbexGlobal_Id = @ntlogin and emp.Active_f = 'A'`);
            return rows.recordset;

});

// Get the locations 
exports.getLocations = asyncHandler(async (id) => {
        const bpoConn = await bpoConnection();
        const rows = await bpoConn.request().input('ntlogin', sql.VarChar, id).query(
                `SELECT
                LTRIM(RTRIM(loc.Location_OID)) as value,
                LTRIM(RTRIM(loc.Location_Name)) as label
                FROM[TRGPayroll].[dbo].[Location] loc(NOLOCK)
                WHERE loc.Active_f = 'A'`);
        return rows.recordset;    
      });
