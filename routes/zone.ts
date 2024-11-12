import { Router} from 'express';
import { zoneController } from '../controller';
import { checkSchema } from "express-validator";
import {validationRules} from "../middleware"
const router = Router();

router.post('/create-zone',checkSchema(validationRules.create),zoneController.create);
router.delete('/delete-zone/:id',checkSchema(validationRules.delete),zoneController.delete);
router.post("/update-zone/:id",checkSchema(validationRules.update),zoneController.update );
router.get('/get-zone/:id',checkSchema(validationRules.get),zoneController.get);
router.get('/get-all-zone',checkSchema(validationRules.getAll),zoneController.getAll);

export default router;