import express from 'express'
import { createListing, DeleteListing } from '../controllers/listing.controller.js'
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,DeleteListing)

export default router