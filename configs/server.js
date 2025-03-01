"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import companyRoutes from "../src/company/company.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
    app.use('/public', express.static(path.join(__dirname, 'public')));
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

const routes = (app) => {
    app.use("/lab#3-coperex/v1/auth", authRoutes);
    app.use("/lab#3-coperex/v1/company", companyRoutes);
};

export const initServer = async () => {
    const app = express();
    try {
        middlewares(app);
        await conectarDB();
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};