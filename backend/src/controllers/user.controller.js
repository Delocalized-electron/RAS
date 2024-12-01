import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  /*
  1. Get user details from the frontend -
  2. Validation - !empty
  3. Check if users already exists: through email
  4. create user object - create entry in db
  5. Check for user creation(response)
  6. Remove password and refresh token field from response
  7.return res
   */
  const { username, email, password } = req.body;
  console.log("email: ", email);

  //check if any field is empty
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  //check if already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser);
  //
  if (existedUser) {
    throw new ApiError(409, "User with Username/email already exists");
  }
  // add user to db
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log(createdUser);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user ");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
