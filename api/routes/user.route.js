import express from 'express'
import { deleteUser,  signout,  updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',signout)

export default router