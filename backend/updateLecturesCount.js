// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Course from "./model/courseModel.js";
// dotenv.config();
// const mongoURI = process.env.MONGODB_URL; 
// if (!mongoURI) {
//   throw new Error("MONGODB_URL is not defined in .env");
// }
// const updateLecturesCount = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("MongoDB connected");
//     const courses = await Course.find();
//     let updated = 0;
//     for (const course of courses) {
//       const count = course.lectures ? course.lectures.length : 0;
//       if (course.lecturesCount !== count) {
//         course.lecturesCount = count;
//         await course.save();
//         updated++;
//       }
//     }
//     console.log(`Updated lecturesCount for ${updated} courses`);
//     await mongoose.disconnect();
//     console.log("MongoDB disconnected");
//   } catch (err) {
//     console.error("Error updating lecturesCount:", err);
//     await mongoose.disconnect();
//   }
// };
// updateLecturesCount();
