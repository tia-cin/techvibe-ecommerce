import express, { Application, Request, Response, request } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
