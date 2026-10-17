const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;