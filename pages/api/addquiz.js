// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import quiz from "../../models/quiz"
import {adminAuth, authenticateAndConnectDb, connectDb} from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let p = new quiz({
                category: req.body[i].category,
                slug: req.body[i].slug,
                title: req.body[i].title,
                desc: req.body[i].desc
            })
            await p.save()
        }
        
        res.status(200).json({ success: "success" })
    }

    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default authenticateAndConnectDb(handler);
