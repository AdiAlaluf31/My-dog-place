import User from "../models/user.model.js";

export const updateUser = async (req,res,next)=>{
  try {
    const { password, isAdmin, ...rest } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: rest },
        { new: true }
    );
    const { password: _, isAdmin: __, ...data } = updatedUser._doc;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(204).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    const { password: _, isAdmin: __, ...data } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}