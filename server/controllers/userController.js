import User from "../models/User.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//register usr : /api/user/register
export const register = async (req, res)=>{
    try{
        // Defensive: fallback to empty object if req.body is undefined
        const {name, email, password } = req.body || {};

        if(!name || !email || !password){
            return res.json({success:false, message: 'Missing Details'})
        }

        const existingUser = await User.findOne({email})

        if(existingUser)
            return res.json({success: false, message: 'user already exists'})

        const hashedpassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password, hashedpassword})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true, //prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 100,
        })

        return res.json({success:true, user: {email: user.email, name: user.name}})

    } catch (error){

        console.log(error.message);
        res.json({success:false, message:error.message});

    }
}


//login user : /api/user/login

export const login = async (req, res) => {
    try {
        // Fix: Ensure req.body is defined and parsed as JSON
        // If using Express, make sure app.use(express.json()) is set in your main server file

        // Defensive: fallback to empty object if req.body is undefined
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) 
            return res.json({ success: false, message: 'Invalid email or password' });

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true, //prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 100,
        })

        return res.json({success:true, user: {email: user.email, name: user.name}})
        
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}
