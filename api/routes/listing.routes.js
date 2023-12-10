import express from 'express'
import { createListing, DeleteListing, UpdateListing } from '../controllers/listing.controller.js'
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,DeleteListing)
router.post('/update/:id',verifyToken,UpdateListing)

export default router