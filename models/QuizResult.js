const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    quiz_id: {type: String, required: true},
    difficultyLevel: { type: Number, default: 5},
    correct: { type: Number, default: 0 },
    asked: {type: Number, default: 0},
    incorrect: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    finished: { type: Boolean, default: false},
    result: { type: Boolean, default: false} // false - lost, true - win
}, { timestamps: true });
mongoose.models = {}
export default mongoose.model("QuizResult", QuizResultSchema);