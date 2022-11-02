// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import question from "../../models/question"
import connectDb from "../../middleware/mongoose"

const handler = async (req,res)=>{
  console.log(req.query.category)
  let questions= await question.find({category:req.query.category, difficultyLevel:req.query.difficultyLevel})
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  res.status(200).json({randomQuestion})
}

export default connectDb(handler);
  