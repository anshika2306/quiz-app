// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import question from "../../models/question"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let p = new question({
                category: req.body[i].category,
                slug: req.body[i].slug,
                questionId: req.body[i].questionId,
                questionText: req.body[i].questionText,
                options: req.body[i].options,
                marks: req.body[i].marks,
                difficultyLevel: req.body[i].difficultyLevel,
                questionType: req.body[i].questionType,
                correctOptions: req.body[i].correctOptions
            })
            await p.save()
        }
        
        res.status(200).json({ success: "success" })
    }

    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);
