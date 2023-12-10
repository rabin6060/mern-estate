import { Listing } from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"
//import { errorHandler } from "../utils/error.js"

export const createListing =async (req,res,next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const DeleteListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing) return next(errorHandler(404,"listing not found"))
    if(req.user.id!==listing.userRef.toString()) {
        return next(errorHandler(401,"you can only delete your own listing."))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("listing deleted successfully.")
    } catch (error) {
        next(error)
    }
    
}
export const UpdateListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing) return next(errorHandler(404,"listing not found"))
    if(req.user.id!==listing.userRef.toString()) {
        return next(errorHandler(401,"you can only update your own listing."))
    }
    try {
       const update = await Listing.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true}
        )
        res.status(200).json(update)
    } catch (error) {
        next(error)
    }
    
}

