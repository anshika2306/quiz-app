// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import user from "../../models/user"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user_data = await user.findOne({ "email": req.body.email })

        if (user_data) {
            const bytes = CryptoJS.AES.decrypt(user_data.password, "secret123");
            let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email == user_data.email && req.body.password == decryptedPassword) {
                var token = jwt.sign({ email: user_data.email, name: user_data.name }, 'jwtsecret', { expiresIn: "2d" });
                res.status(200).json({success: true, token})
            }
            res.status(200).json({ success: false, error: "Invalid Credentials" })
        }
        else {
            res.status(200).json({ success: false, error: "No User found" })
        }
    }

    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler);
