const mongoose = require("mongoose")

mongoose.connect(process.env.DB).then(() => {
console.log("DB is connnected...")
}).catch((err) => {
console.error("Something went wrong..."+ err)
})

