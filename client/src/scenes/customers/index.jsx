import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);

  // Mock data for customers
  const mockCustomers = [
    {
      _id: "1",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phoneNumber: "9876543210",
      country: "India",
      occupation: "Data Analyst",
      role: "User"
    },
    {
      _id: "2",
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phoneNumber: "9876543211",
      country: "India",
      occupation: "Business Analyst",
      role: "User"
    },
    {
      _id: "3",
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phoneNumber: "9876543212",
      country: "India",
      occupation: "Marketing Manager",
      role: "User"
    },
    {
      _id: "4",
      name: "Anjali Nair",
      email: "anjali.nair@email.com",
      phoneNumber: "9876543213",
      country: "India",
      occupation: "Teacher",
      role: "User"
    },
    {
      _id: "5",
      name: "Rahul Mehta",
      email: "rahul.mehta@email.com",
      phoneNumber: "9876543214",
      country: "India",
      occupation: "Software Engineer",
      role: "User"
    },
    {
      _id: "6",
      name: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phoneNumber: "9876543215",
      country: "India",
      occupation: "Doctor",
      role: "User"
    },
    {
      _id: "7",
      name: "Karthik Rajan",
      email: "karthik.rajan@email.com",
      phoneNumber: "9876543216",
      country: "India",
      occupation: "Architect",
      role: "User"
    },
    {
      _id: "8",
      name: "Pooja Verma",
      email: "pooja.verma@email.com",
      phoneNumber: "9876543217",
      country: "India",
      occupation: "Financial Analyst",
      role: "User"
    },
    {
      _id: "9",
      name: "Arjun Kapoor",
      email: "arjun.kapoor@email.com",
      phoneNumber: "9876543218",
      country: "India",
      occupation: "Project Manager",
      role: "User"
    },
    {
      _id: "10",
      name: "Kavita Reddy",
      email: "kavita.reddy@email.com",
      phoneNumber: "9876543219",
      country: "India",
      occupation: "Lawyer",
      role: "User"
    },
    {
      _id: "11",
      name: "Deepak Joshi",
      email: "deepak.joshi@email.com",
      phoneNumber: "9876543220",
      country: "India",
      occupation: "Consultant",
      role: "User"
    },
    {
      _id: "12",
      name: "Meera Krishnan",
      email: "meera.krishnan@email.com",
      phoneNumber: "9876543221",
      country: "India",
      occupation: "Engineer",
      role: "User"
    }
  ];

  const displayData = data || mockCustomers;

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
      <Header title="CUSTOMERS" subtitle="List of Customers" />
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
        />
      </Box>
    </Box>
  );
};

export default Customers;
