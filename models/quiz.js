const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    category: { type: String },
    slug: { type: String },
    title: { type: String },
    desc: { type: String }
}, { timestamps: true });
mongoose.models = {}
export default mongoose.model("quiz", QuizSchema);