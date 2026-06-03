import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // Mock data for products
  const mockProducts = [
    {
      _id: "1",
      name: "Solar Panel Pro 400W",
      description: "High-efficiency monocrystalline solar panel with 400W output. Perfect for residential and commercial installations.",
      price: 299.99,
      rating: 4.5,
      category: "Solar Panels",
      supply: 150,
      stat: {
        yearlySalesTotal: 450000,
        yearlyTotalSoldUnits: 1500
      }
    },
    {
      _id: "2",
      name: "Solar Inverter 5kW",
      description: "Pure sine wave inverter with 5kW capacity. Compatible with most solar panel systems.",
      price: 899.99,
      rating: 4.7,
      category: "Inverters",
      supply: 75,
      stat: {
        yearlySalesTotal: 675000,
        yearlyTotalSoldUnits: 750
      }
    },
    {
      _id: "3",
      name: "Solar Battery 10kWh",
      description: "Lithium-ion battery storage system with 10kWh capacity. Store excess solar energy for later use.",
      price: 2499.99,
      rating: 4.8,
      category: "Batteries",
      supply: 50,
      stat: {
        yearlySalesTotal: 375000,
        yearlyTotalSoldUnits: 150
      }
    },
    {
      _id: "4",
      name: "Solar Panel Basic 300W",
      description: "Entry-level polycrystalline solar panel with 300W output. Great for small installations.",
      price: 199.99,
      rating: 4.2,
      category: "Solar Panels",
      supply: 200,
      stat: {
        yearlySalesTotal: 300000,
        yearlyTotalSoldUnits: 1500
      }
    },
    {
      _id: "5",
      name: "Complete Solar Kit 5kW",
      description: "All-in-one solar kit including panels, inverter, mounting hardware, and cables.",
      price: 4499.99,
      rating: 4.9,
      category: "Kits",
      supply: 30,
      stat: {
        yearlySalesTotal: 540000,
        yearlyTotalSoldUnits: 120
      }
    },
    {
      _id: "6",
      name: "Solar Charge Controller 60A",
      description: "MPPT charge controller for off-grid solar systems. Handles up to 60A current.",
      price: 349.99,
      rating: 4.4,
      category: "Controllers",
      supply: 100,
      stat: {
        yearlySalesTotal: 175000,
        yearlyTotalSoldUnits: 500
      }
    },
    {
      _id: "7",
      name: "Solar Panel Premium 500W",
      description: "Top-tier monocrystalline panel with 500W output. Maximum efficiency for limited space.",
      price: 449.99,
      rating: 4.6,
      category: "Solar Panels",
      supply: 80,
      stat: {
        yearlySalesTotal: 360000,
        yearlyTotalSoldUnits: 800
      }
    },
    {
      _id: "8",
      name: "Solar Battery 5kWh",
      description: "Compact lithium-ion battery with 5kWh capacity. Ideal for small homes.",
      price: 1499.99,
      rating: 4.5,
      category: "Batteries",
      supply: 90,
      stat: {
        yearlySalesTotal: 270000,
        yearlyTotalSoldUnits: 180
      }
    }
  ];

  const displayData = data || mockProducts;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {displayData || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {displayData.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
