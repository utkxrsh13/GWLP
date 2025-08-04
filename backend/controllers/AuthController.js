const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const axios = require('axios');
const Prediction = require('../models/prediction');


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        console.error("Login error:", err);
        res.status(500)
            .json({
                
                message: "Internal server errror",
                success: false
            })
    }
}
const logout = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
const predictAndStore = async (req, res) => {
    const { latitude, longitude } = req.body;
    const username = req.user?.username; 
  
    if (!username || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Missing username, latitude, or longitude' });
    }
  
    try {
      
      const mlResponse = await axios.post('http://localhost:5000/predict', {
        latitude,
        longitude
      });
  
      const prediction_result = mlResponse.data.result;
  
      
      const savedPrediction = await Prediction.create({
        username,
        prediction_result,
        latitude,
        longitude
      });
  
      res.status(201).json({
        message: 'Prediction retrieved and stored successfully',
        data: savedPrediction
      });
    } catch (error) {
      console.error('Prediction error:', error.message);
      res.status(500).json({ error: 'Failed to get prediction or save data' });
    }
  }
  const getUserHistory = async (req, res) => {
    const username = req.user?.username;
  
    if (!username) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const history = await Prediction.find({ username }).sort({ timestamp: -1 });
      res.status(200).json({ data: history });
    } catch (error) {
      console.error('Error fetching history:', error.message);
      res.status(500).json({ error: 'Failed to fetch prediction history' });
    }
  }

module.exports = {
    signup,
    login,
    logout,
    predictAndStore,
    getUserHistory,

}