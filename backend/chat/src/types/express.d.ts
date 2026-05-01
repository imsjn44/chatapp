import { IUser } from "../middlewares/isAuth.ts"; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Makes .user available on all Request objects
    }
  }
}
