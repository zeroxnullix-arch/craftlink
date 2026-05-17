import mongoose from "mongoose"

const lectureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    },
    isPreviewFree: {
        type: Boolean
    },
    duration: {
        type: Number,
        default: 0
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            userName: String,
            text: String,
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, { timestamps: true })

const Lecture = mongoose.model("Lecture", lectureSchema)

export default Lecture