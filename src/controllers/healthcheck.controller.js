import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// const healthcheck = async (req, res) => {
//   try {
//     res
//       .status(200)
//       .json(new ApiResponse(200, { message: "server is running" }));
//   } catch (err) {}
// };

const healthcheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Server is still running" }));
});

export default healthcheck;
