import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// const healthCheck = (req, res) => {
//     try {
//         //sending response of heath check
//         res
//             .status(200)
//             .json(new ApiResponse(200, {message: "server is running."}))
//     } catch (error) {}
// }

const healthCheck = asyncHandler(async(req, res) => {
    res
        .status(200)
        .json(new ApiResponse(200, {message:"server is still running"}))
})

export {healthCheck}