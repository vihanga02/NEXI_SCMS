import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticateToken(req, res) {
    const authHeader = req.headers['aceess-token']; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied', success: false }); 
    }

    jwt.verify(token, proecss.env.SECRETE_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid', success: false });
        }

        req.user = user; 
        return res.status(200).json({ message: 'Token is valid', success: true });
    });
}

export default authenticateToken;


