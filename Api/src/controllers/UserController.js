import User from "../models/User.js";


//get user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).send({
            status: 200,
            message: "User retrieved successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//update user
const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, Image } = req.body;

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).send({
                status: 404,
                message: "User not found",
            });
        }
        
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.image = Image;
        
        await user.save();

        res.status(200).send({
            status: 200,
            message: "User updated successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

//delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).send({
                status: 404,
                message: "User not found",
            });
        }

        res.status(200).send({
            status: 200,
            message: "User deleted successfully",
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

const UserController = {
    getUser,
    updateUser,
    deleteUser,
};

export default UserController;
