import { Router} from 'express';
import { zoneController } from '../controller';
const router = Router();

router.post('/create-zone',zoneController.create);
router.delete('/delete-zone/:id',zoneController.delete);
// router.post('/update-zone/:id',zoneController.update);
router.get('/get-zone/:id',zoneController.get);
router.get('/get-all-zone',zoneController.getAll);

export default router;
