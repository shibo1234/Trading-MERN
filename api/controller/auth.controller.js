import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async(req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword});
    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        await newUser.save()
        res.status(201).json("User create successfully");
    } catch (error) {
        next(error);
    }
};