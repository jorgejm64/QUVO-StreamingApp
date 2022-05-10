const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        //MongoDB conexion
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then(()=> console.log("DB Connection Successfull!"))
            .catch((err) => console.log(err));
    } catch (e) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }

}



module.exports = connectDB;