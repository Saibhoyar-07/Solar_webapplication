import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  // Mock data for dashboard
  const mockData = {
    totalCustomers: 1250,
    todayStats: {
      totalSales: 45600
    },
    thisMonthStats: {
      totalSales: 345000
    },
    yearlySalesTotal: 4200000,
    transactions: [
      { _id: "1", userId: "user_001", createdAt: "2024-01-15", products: [{ name: "Solar Panel A" }, { name: "Inverter" }], cost: 25000 },
      { _id: "2", userId: "user_002", createdAt: "2024-01-14", products: [{ name: "Solar Panel B" }], cost: 18000 },
      { _id: "3", userId: "user_003", createdAt: "2024-01-13", products: [{ name: "Battery" }, { name: "Inverter" }], cost: 32000 },
      { _id: "4", userId: "user_004", createdAt: "2024-01-12", products: [{ name: "Solar Panel A" }, { name: "Solar Panel B" }], cost: 45000 },
      { _id: "5", userId: "user_005", createdAt: "2024-01-11", products: [{ name: "Complete System" }], cost: 85000 },
      { _id: "6", userId: "user_006", createdAt: "2024-01-10", products: [{ name: "Solar Panel A" }], cost: 15000 },
      { _id: "7", userId: "user_007", createdAt: "2024-01-09", products: [{ name: "Inverter" }, { name: "Battery" }], cost: 28000 },
      { _id: "8", userId: "user_008", createdAt: "2024-01-08", products: [{ name: "Solar Panel C" }], cost: 22000 },
    ]
  };

  const displayData = data || mockData;

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `¥${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="aldex Energies" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={displayData && displayData.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={displayData && displayData.todayStats ? displayData.todayStats.totalSales : 0}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={displayData && displayData.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={displayData && displayData.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !displayData}
            getRowId={(row) => row._id}
            rows={(displayData && displayData.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[600], fontWeight: "bold" }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[500] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
      
      {/* Customer Information Table */}
      <Box mt="2rem">
        <Typography variant="h4" sx={{ color: theme.palette.grey[800], mb: "1rem" }}>
          Customer Information
        </Typography>
        <Box
          backgroundColor={theme.palette.background.default}
          borderRadius="0.55rem"
          p="1.5rem"
        >
          <Box
            sx={{
              display: "table",
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <Box
              component="thead"
              sx={{
                display: "table-header-group",
              }}
            >
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                }}
              >
                <Box
                  component="th"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    textAlign: "left",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.grey[700],
                    fontWeight: "bold",
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                  }}
                >
                  Customer Name
                </Box>
                <Box
                  component="th"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    textAlign: "left",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.grey[700],
                    fontWeight: "bold",
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                  }}
                >
                  Email
                </Box>
                <Box
                  component="th"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    textAlign: "left",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.grey[700],
                    fontWeight: "bold",
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                  }}
                >
                  City
                </Box>
                <Box
                  component="th"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    textAlign: "left",
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.grey[700],
                    fontWeight: "bold",
                    borderBottom: `1px solid ${theme.palette.grey[300]}`,
                  }}
                >
                  Occupation
                </Box>
              </Box>
            </Box>
            <Box
              component="tbody"
              sx={{
                display: "table-row-group",
              }}
            >
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Priya Sharma
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  priya.sharma@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Delhi
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Data Analyst
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Amit Patel
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  amit.patel@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Ahmedabad
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Business Analyst
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Vikram Singh
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  vikram.singh@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Jaipur
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Marketing Manager
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Anjali Nair
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  anjali.nair@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Kochi
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Teacher
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Rahul Mehta
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  rahul.mehta@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Mumbai
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Software Engineer
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Sneha Gupta
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  sneha.gupta@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Bangalore
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Doctor
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Karthik Rajan
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  karthik.rajan@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Chennai
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Architect
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Pooja Verma
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  pooja.verma@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Pune
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Financial Analyst
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Arjun Kapoor
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  arjun.kapoor@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Hyderabad
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Project Manager
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Kavita Reddy
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  kavita.reddy@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Lucknow
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Lawyer
                </Box>
              </Box>
              <Box
                component="tr"
                sx={{
                  display: "table-row",
                                  }}
              >
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Deepak Joshi
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  deepak.joshi@email.com
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Indore
                </Box>
                <Box
                  component="td"
                  sx={{
                    display: "table-cell",
                    padding: "0.75rem",
                    color: theme.palette.grey[700],
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  Consultant
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
