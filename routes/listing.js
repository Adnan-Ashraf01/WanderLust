const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const { storage } = require("../cloudConfig.js");




const upload=multer({
    storage,
     limits: {
        fileSize: 300 * 1024 
    },
     fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpeg"];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only PNG and JPG images are allowed."));
        }

        cb(null, true);
    }

});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));


//new route 
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;