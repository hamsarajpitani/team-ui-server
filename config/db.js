const mongoose = require("mongoose");
const { database } = require("./keys");

exports.connectDB = async () => {
  try {
    const connected = await mongoose.connect(database.connectURL, {
      useUnifiedTopology: true,
      //useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser
      useNewUrlParser: true,
    });
    console.log(`connected to database ${connected.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};
