import express from "express";
import { imageHandler } from "../utilities";
const routes: express.Router = express.Router();

routes.use(express.static("public"));
routes.get("/images", imageHandler);

export default routes;
