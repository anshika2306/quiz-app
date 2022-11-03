// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import question from "../../models/question"
import QuizResult from "../../models/QuizResult"
import {connectDb,authenticateAndConnectDb} from "../../middleware/mongoose"

const handler = async (req,res)=>{
  let quizResult = await QuizResult.findOne({
    user_id: req.user.email,
    quiz_id: req.query.category,
    finished: false
  })
  if(quizResult == null){
    quizResult = await QuizResult.create(new QuizResult({
      user_id: req.user.email,
      quiz_id: req.query.category
    }))
  }
  let questions= await question.find({category:req.query.category, difficultyLevel:quizResult.difficultyLevel})
  // TODO - maybe we can optimize this part as we are fetching all the data and then selecting a random.
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  res.status(200).json({randomQuestion})
}

export default authenticateAndConnectDb(handler);
  