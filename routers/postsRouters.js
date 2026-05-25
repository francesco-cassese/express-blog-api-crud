import express from "express";
import { index, show, store, update, modify, destroy } from '../controllers/postsControllers.js'

const router = express.Router()

/* http://localhost:3000 */
router.get('/', index);

/* http://localhost:3000/:id */
router.get('/:id', show);

/* http://localhost:3000 */
router.post('/', store)

/* http://localhost:3000/:id */
router.put('/:id', update)

/* http://localhost:3000/:id */
router.patch('/:id', modify)

/* http://localhost:3000/:id */
router.delete('/:id', destroy)

export default router