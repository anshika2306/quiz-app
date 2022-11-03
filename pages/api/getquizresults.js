// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import QuizResult from "../../models/QuizResult"
import {connectDb,authenticateAndConnectDb} from "../../middleware/mongoose"

const handler = async (req,res)=>{

  let quizResult = await QuizResult.find({
    user_id: req.user.email
  })
  res.status(200).json(quizResult)
}

export default authenticateAndConnectDb(handler);
  