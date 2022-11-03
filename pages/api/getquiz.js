// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {connectDb} from "../../middleware/mongoose"
import quiz from "../../models/quiz"

const handler = async (req, res) => {
    let quizzes = await quiz.find()

    res.status(200).json({ quizzes })
}

export default connectDb(handler);
