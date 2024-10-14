import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../libs/jsonwebtoken";


//register user
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({
                status: 404,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).send({
            status: 201,
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).send({
                status: 404,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                status: 400,
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user._id);

        res.status(200).send({
            status: 200,
            message: "User logged in successfully",
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}


const authController = {
    register,
    login,
};

export default authController;


