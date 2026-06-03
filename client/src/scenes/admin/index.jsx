import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

  // Mock data for admins
  const mockAdmins = [
    {
      _id: "1",
      name: "John Smith",
      email: "john.smith@solar.com",
      phoneNumber: "1234567890",
      country: "USA",
      occupation: "System Administrator",
      role: "Admin"
    },
    {
      _id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@solar.com",
      phoneNumber: "2345678901",
      country: "USA",
      occupation: "Database Administrator",
      role: "Admin"
    },
    {
      _id: "3",
      name: "Michael Brown",
      email: "michael.brown@solar.com",
      phoneNumber: "3456789012",
      country: "UK",
      occupation: "Network Administrator",
      role: "Super Admin"
    },
    {
      _id: "4",
      name: "Emily Davis",
      email: "emily.davis@solar.com",
      phoneNumber: "4567890123",
      country: "Canada",
      occupation: "Security Administrator",
      role: "Admin"
    },
    {
      _id: "5",
      name: "David Wilson",
      email: "david.wilson@solar.com",
      phoneNumber: "5678901234",
      country: "Australia",
      occupation: "Cloud Administrator",
      role: "Admin"
    }
  ];

  const displayData = data || mockAdmins;

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
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
          rows={displayData || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
