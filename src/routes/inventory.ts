import { Router, request, response } from 'express';
import { checkOrderFullfilment, getArticles, updateArticle } from '../controllers/inventory';


const router = Router();

router.get('/list', getArticles);
router.post('/update', updateArticle);
router.post('/checkOrderFullfillment', checkOrderFullfilment);

export default router;