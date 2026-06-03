import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  // Mock data for performance
  const mockPerformance = {
    sales: [
      { _id: "1", userId: "user_001", createdAt: "2024-01-15", products: [{ name: "Solar Panel A" }, { name: "Inverter" }], cost: 25000 },
      { _id: "2", userId: "user_001", createdAt: "2024-01-14", products: [{ name: "Solar Panel B" }], cost: 18000 },
      { _id: "3", userId: "user_001", createdAt: "2024-01-13", products: [{ name: "Battery" }, { name: "Inverter" }], cost: 32000 },
      { _id: "4", userId: "user_001", createdAt: "2024-01-12", products: [{ name: "Solar Panel A" }, { name: "Solar Panel B" }], cost: 45000 },
      { _id: "5", userId: "user_001", createdAt: "2024-01-11", products: [{ name: "Complete System" }], cost: 85000 },
      { _id: "6", userId: "user_001", createdAt: "2024-01-10", products: [{ name: "Solar Panel A" }], cost: 15000 },
      { _id: "7", userId: "user_001", createdAt: "2024-01-09", products: [{ name: "Inverter" }, { name: "Battery" }], cost: 28000 },
      { _id: "8", userId: "user_001", createdAt: "2024-01-08", products: [{ name: "Solar Panel C" }], cost: 22000 },
    ]
  };

  const displayData = data || mockPerformance;

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
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.primary.light,
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
          rows={(displayData && displayData.sales) || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Performance;
