const express = require('express');
const app = express();
const cors = require('cors'); // Import cors package
const ejs = require('ejs');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Load Environment Variables
require('dotenv').config();

// Connect to MongoDB
const connectDB = require('./config/db.js');
const User = require('./models/User.js'); // Assuming your model is exported as User
const bcrypt = require('bcrypt');
connectDB();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cors()); // Use cors middleware

app.set('view engine', 'ejs');

// Example route to fetch users
app.get('/User', async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to sign-in a user based on email or phone
app.get('/SignIn', async (req, res) => {
    try {
        const emailOrPhone = req.query.user; // Retrieve user query parameter
        const password = req.query.password; // Retrieve user query parameter

        // console.log(`emailOrPhone : ${emailOrPhone} \\ password : ${password}`);

        if (!emailOrPhone || !password) {
            return res.status(400).json({ error: 'User and password are required' });
        }

        // Function to find user by email or phone
        const findUserByEmailOrPhone = async (emailOrPhone) => {
            try {
                const user = await User.findOne({
                    $or: [
                        { email: emailOrPhone },
                        { phone: emailOrPhone }
                    ]
                });
                return user;
            } catch (error) {
                console.error('Error finding user:', error);
                throw error; // Throw the error to handle it further up the call stack
            }
        };

        // Call the function to find user by email or phone
        const user = await findUserByEmailOrPhone(emailOrPhone);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If user and password are valid, respond with user data (excluding password)
        return res.json({
            user: {
                _id: user._id,
                firstName: user.f_name,
                lastName: user.s_name,
                email: user.email,
                phone: user.phone
                // Add other fields you want to return
            }
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/SignUp', async (req, res) => {
    try {
        // console.log('Hi ', req.body)
        const { f_name, s_name, email, phone, password } = req.body;
        // console.log('Hi test ', f_name, s_name, email, phone, password)

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this phone number already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            f_name,
            s_name,
            email,
            phone,
            password
        });

        // Save the user to MongoDB
        await newUser.save();

        // Respond with success message or user data (excluding password)
        return res.json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                f_name: newUser.f_name,
                s_name: newUser.s_name,
                email: newUser.email,
                phone: newUser.phone
                // Add other fields you want to return
            }
        });
    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
