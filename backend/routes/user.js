const express = require("express");
const zod = require("zod");
const {User} = require("../db")
const {Account} = require("../db")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const router = express.Router();

router.post("/signup", async (req,res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({username: req.body.username})

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({userId}, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token

    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req,res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({username: req.body.username,
        password: req.body.password})

    if(user){
        const token = jwt.sign({userId: user._id}, JWT_SECRET)

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})


const updatedBody = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.put("/", async (req,res) => {
    const {success} = updatedBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    try{
        const result = await User.updateOne({ _id: req.userId }, { $set: req.body }) 

        if(result.nModified === 0){
            return res.status(411).json({
                message: "Error while updating information"
            })
        }

        res.json({
            message: "Updated successfully"
        })
    }catch(err){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })


    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})


module.exports = router;