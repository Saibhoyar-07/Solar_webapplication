import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  // Mock data for transactions
  const mockTransactions = [
    { _id: "1", userId: "user_001", createdAt: "2024-01-15", products: [{ name: "Solar Panel A" }, { name: "Inverter" }], cost: 25000 },
    { _id: "2", userId: "user_002", createdAt: "2024-01-14", products: [{ name: "Solar Panel B" }], cost: 18000 },
    { _id: "3", userId: "user_003", createdAt: "2024-01-13", products: [{ name: "Battery" }, { name: "Inverter" }], cost: 32000 },
    { _id: "4", userId: "user_004", createdAt: "2024-01-12", products: [{ name: "Solar Panel A" }, { name: "Solar Panel B" }], cost: 45000 },
    { _id: "5", userId: "user_005", createdAt: "2024-01-11", products: [{ name: "Complete System" }], cost: 85000 },
    { _id: "6", userId: "user_006", createdAt: "2024-01-10", products: [{ name: "Solar Panel A" }], cost: 15000 },
    { _id: "7", userId: "user_007", createdAt: "2024-01-09", products: [{ name: "Inverter" }, { name: "Battery" }], cost: 28000 },
    { _id: "8", userId: "user_008", createdAt: "2024-01-08", products: [{ name: "Solar Panel C" }], cost: 22000 },
    { _id: "9", userId: "user_009", createdAt: "2024-01-07", products: [{ name: "Solar Panel A" }, { name: "Battery" }], cost: 38000 },
    { _id: "10", userId: "user_010", createdAt: "2024-01-06", products: [{ name: "Inverter" }], cost: 12000 },
    { _id: "11", userId: "user_011", createdAt: "2024-01-05", products: [{ name: "Solar Panel B" }, { name: "Inverter" }], cost: 30000 },
    { _id: "12", userId: "user_012", createdAt: "2024-01-04", products: [{ name: "Complete System" }], cost: 95000 },
    { _id: "13", userId: "user_013", createdAt: "2024-01-03", products: [{ name: "Solar Panel C" }, { name: "Battery" }], cost: 42000 },
    { _id: "14", userId: "user_014", createdAt: "2024-01-02", products: [{ name: "Solar Panel A" }], cost: 16000 },
    { _id: "15", userId: "user_015", createdAt: "2024-01-01", products: [{ name: "Inverter" }, { name: "Controller" }], cost: 25000 },
  ];

  const displayData = data || { transactions: mockTransactions, total: mockTransactions.length };

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
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
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
          rows={(displayData && displayData.transactions) || []}
          columns={columns}
          rowCount={(displayData && displayData.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
