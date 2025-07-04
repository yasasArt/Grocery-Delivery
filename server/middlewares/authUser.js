import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
            
        } else {
            return res.json({ success: false, message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default authUser;


// import jwt from 'jsonwebtoken';

// const authUser = (req, res, next) => {
//     const { token } = req.cookies;
//     console.log("authUser middleware: token from cookies:", token);
//     if (!token) {
//         console.log("authUser middleware: No token found");
//         return res.json({ success: false, message: 'Not Authorized' });
//     }
//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("authUser middleware: token decoded:", tokenDecode);
//         if (tokenDecode.id) {
//             req.body.userId = tokenDecode.id;
//             next();
//         } else {
//             console.log("authUser middleware: No user id in token");
//             return res.json({ success: false, message: 'Unauthorized' });
//         }
//     } catch (error) {
//         console.log("authUser middleware: JWT error:", error.message);
//         res.json({ success: false, message: error.message });
//     }
// }

// export default authUser;