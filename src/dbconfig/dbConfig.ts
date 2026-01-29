import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    console.log(connection);

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error. PLease make sure MongoDB is running');
      console.log(err);
      process.exit();
    })
  } catch (err) {
    console.log('Something went wrong!!');
    console.log(err);
  }
}