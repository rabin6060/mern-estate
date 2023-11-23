import { listingModel } from "../models/listing.model.js"
//import { errorHandler } from "../utils/error.js"

export const createListing =async (req,res,next) => {
    try {
        const listing = await listingModel.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}