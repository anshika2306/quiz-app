const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String }, //validate category
    slug: { type: String },
    questionId: { type: String },
    questionText: { type: String, required: true, unique: true },
    options: { type: Array, required: true },
    marks: { type: Number, required: true },
    difficultyLevel: { type: Number },
    questionType: { type: String, required: true },
    correctOptions: { type: Array, required: true }
}, { timestamps: true });
mongoose.models = {}
export default mongoose.model("question", QuestionSchema);