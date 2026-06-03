import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  indianUsers,
  indianProducts,
  indianProductStats,
  indianTransactions,
  indianOverallStats,
  indianAffiliateStats,
} from "./data/indian-data.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

// Only seed data if not in production/Vercel
if (process.env.NODE_ENV !== "production") {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
      app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

      /* CLEAR EXISTING DATA AND INSERT INDIAN DATA */
      // Clear existing collections
      await User.deleteMany({});
      await Product.deleteMany({});
      await ProductStat.deleteMany({});
      await Transaction.deleteMany({});
      await OverallStat.deleteMany({});
      await AffiliateStat.deleteMany({});

      // Insert Indian data
      await AffiliateStat.insertMany(indianAffiliateStats);
      await OverallStat.insertMany(indianOverallStats);
      await Product.insertMany(indianProducts);
      await ProductStat.insertMany(indianProductStats);
      await Transaction.insertMany(indianTransactions);
      await User.insertMany(indianUsers);

      console.log("Indian data seeded successfully!");
    })
    .catch((error) => console.log(`${error} did not connect`));
} else {
  // Production/Vercel: Connect to MongoDB without seeding
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB in production");
    })
    .catch((error) => console.log(`${error} did not connect`));
}

// Export for Vercel serverless
export default app;
