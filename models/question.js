const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String, required: true}, //validate category
    questionText: { type: String, required: true, unique: true },
    options: { type: Array, required: true },
    difficultyLevel: { type: Number },
    correctOptions: { type: Number, required: true }
}, { timestamps: true });
mongoose.models = {}
export default mongoose.model("question", QuestionSchema);