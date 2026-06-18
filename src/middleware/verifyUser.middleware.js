import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized Access Denied");
    }

    const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(
        decodedToken._id
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "User Not Found");
    }

    // Token Version Check
    if (decodedToken.tokenVersion !== user.tokenVersion) {
        throw new ApiError(
            401,
            "Token has been revoked. Please login again."
        );
    }

    req.user = user;
    req.sessionId = decodedToken.sessionId;

    next();
});