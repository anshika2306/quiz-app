// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import question from "../../models/question";
import { authenticateAndConnectDb } from "../../middleware/mongoose";
import QuizResult from "../../models/QuizResult";
import quiz from "../../models/quiz";

const getScore = (quizResult) => {
    return (quizResult.correct * 5) - (quizResult.incorrect * 2);
}

const handler = async (req, res) => {
    if (req.method == 'POST') {
        req.body = JSON.parse(req.body);
        const question_id = req.body.question_id;
        const selected_answer = req.body.answer;
        const ques = await question.findOne({
            _id: question_id
        })
        const quizResult = await QuizResult.findOne({
            user_id: req.user.email,
            quiz_id: ques.category,
            finished: false
        })
        quizResult.asked += 1;
        console.log(ques, selected_answer)
        if (ques.correctOptions == selected_answer) {
            quizResult.correct += 1;
            let result = {
                result : true
            }
            if(quizResult.difficultyLevel == 10){
                result.win = true;
                quizResult.finished = true;
                quizResult.result = true;
                quizResult.score = getScore(quizResult);
                result.score = getScore(quizResult);
            }
            else if(quizResult.asked == 10){
                result.lost = true;
                quizResult.finished = true;
                quizResult.result = false;
                quizResult.score = getScore(quizResult);
                result.score = getScore(quizResult);
            }
            else{
                quizResult.difficultyLevel += 1; 
            }
            let a = await QuizResult.findOneAndUpdate({
                _id: quizResult._id
            }, quizResult)
            console.log(a)
            return res.status(200).send(result)
        }
        else {
            quizResult.incorrect += 1;
            let result = {
                result : false
            }
            if(quizResult.difficultyLevel == 1){
                result.lost = true;
                quizResult.finished = true;
                quizResult.result = true;
                quizResult.score = getScore(quizResult);
                result.score = getScore(quizResult);
            }
            else if(quizResult.asked == 10){
                result.win = false;
                quizResult.finished = true;
                quizResult.result = false;
                quizResult.score = getScore(quizResult);
                result.score = getScore(quizResult);
            }
            else{
                quizResult.difficultyLevel -= 1; 
            }
            await QuizResult.findOneAndUpdate({
                _id: quizResult._id
            }, quizResult)
            return res.status(200).send(result)
        }
    }

    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default authenticateAndConnectDb(handler);
