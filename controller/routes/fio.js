import fioCtrl from "../api/fio";
import { checkAPIKey } from "./middle";

const route = require("express").Router();

route.get("/nftimage/:domain", checkAPIKey , (req, res) => fioCtrl.getImageUrlWithDomain(req,res));
export default route;