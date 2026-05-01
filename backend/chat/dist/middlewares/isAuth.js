import jwt, {} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// export interface AuthenticatedRequest extends Request {
//   user: IUser | null;
// }
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({
                message: "Please login -No auth header",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Token missing",
            });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.user) {
            res.status(401).json({
                message: "Invalid token",
            });
            return;
        }
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "please login -JWT error",
        });
    }
};
