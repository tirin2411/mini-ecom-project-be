import 'dotenv/config';
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getListUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const signUp = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashPass = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashPass});
        res.status(201).json({message: 'SignUp Success!', user})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if(!user){
        return res.status(404).json({message: "User not found!"})
    }
    
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(400).json({message: "Wrong password!"})
    }

    const accessToken = jwt.sign({id: user.id, name: user.name}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' })
    res.json({accessToken: accessToken, user});
}

export default {getListUsers, signUp, login}