const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: String,
    image: {
            type: String,
            default: "https://images.unsplash.com/photo-1543306983-a562d8739781?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1543306983-a562d8739781?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                    : v
        
    },
    price:{
        type:Number,
         set: (v) => v === ""? 2300: v

    },
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
            
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;