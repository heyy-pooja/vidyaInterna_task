const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/CheckEmpty")
const User = require("../modal/User")
const validator = require("validator")

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { error, isError } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required" })
    }
    await User.create(req.body)
    res.json({ message: "User Register Success" })
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(401).json({ message: "All Feild Require", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" })
    }
    const result = await User.findOne({ email })
    if (!result) {
        console.log(req.body);
        console.log(result);
        return res.status(401).json({ message: "Email Not Found" })
    }

    res.json({
        message: "Register User Success ", result: {
            _id: result._id,
            _id: result.name,
            email: result.email
        }
    })

})