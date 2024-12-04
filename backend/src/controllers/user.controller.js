import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    console.log("Adding refresh token");
    await user.save({ validateBeforeSave: false });
    console.log("refresh token added to DB");
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

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

  //check if any field is empty
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  //check if already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with Username/email already exists");
  }
  // add user to db
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });
  // get user from db without password and refreshToken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user ");
  }
  //Send the response that user is created
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  /**
     1. Check if user exists (if not throw error)
    2. Check the login info (if mismatch throw error)
    3. Password check 
    4. access and refresh token
    5. send cookie
    */
  const { username, email, password } = req.body;
  //check if input have email or not
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  //check if user in db, if not
  const loginUser = await User.findOne({
    email,
  });
  if (!loginUser) {
    throw new ApiError(404, "User not found, Please register");
  }
  //check password
  const isPasswordValid = await loginUser.isPasswordCorrect(
    password,
    loginUser.password
  );
  if (!isPasswordValid) {
    throw new ApiError(401, "Invaild user credentials");
  }
  //generete access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    loginUser._id
  );

  const loggedInUser = await User.findById(loginUser._id).select(
    "-password -accessToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  /**
   * get refresh token from cookie
   * verify incoming refresh token
   * then update access and refresh token
   */
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            newRefreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
