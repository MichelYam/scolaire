const userService = require("../services/userService");

module.exports.createUser = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = "User successfully created";
    response.body = responseFromService;
  } catch (error) {
    console.error("Something went wrong in userController.js", error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.loginUser = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.loginUser(req.body);
    response.status = 200;
    response.message = "User successfully logged in";
    response.body = responseFromService;
    console.log("responseFromService", responseFromService);
    res.cookie("jwt", responseFromService.token, {secure: true, httpOnly: true})
  } catch (error) {
    console.error("Error in loginUser (userController.js)");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getUserProfile = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.getUserProfile(req);
    response.status = 200;
    response.message = "Successfully got user profile data";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateUserProfile = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.updateUserProfile(req);
    response.status = 200;
    response.message = "Successfully updated user profile data";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in updateUserProfile - userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deleteUser = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.deleteUser(req);
    response.status = 200;
    response.message = "Successfully delete user data";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in deleteUser - userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllUsers = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.getAllUsers();
    response.status = 200;
    response.message = "Successfully get all user data";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in deleteUser - userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getFriendList = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.getFriendList(req);
    response.status = 200;
    response.message = "Successfully get friend list of user";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in deleteUser - userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.sendFriendRequest = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.sendFriendRequest(req);
    response.status = 200;
    response.message = "Successfully send friend request";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in sendFriendRequest - userController.js");
    // console.log(error)
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getFriendRequest = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.getFriendRequest(req);
    response.status = 200;
    response.message = "Successfully get friend request";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in getFriendRequest - userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.acceptFriendRequest = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.acceptFriendRequest(req);
    response.status = 200;
    response.message = "Successfully accept friend request";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in acceptFriendRequest - userController.js");
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.rejectFriendRequest = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.rejectFriendRequest(req);
    response.status = 200;
    response.message = "Successfully rejected friend request";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in rejectFriendRequest - userController.js");
    console.log(error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.resetPassword = async (req, res) => {
  let response = {};

  try {
    const responseFromService = await userService.resetPassword(req, res);
    response.status = 200;
    response.message = "Successfully reset password";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in resetPassword - userController.js");
    console.log(error);
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.forgotPassword = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.forgotPassword(req, res);
    response.status = 200;
    response.message = "Successfully send change password email";
    response.body = responseFromService;
  } catch (error) {
    console.log("Error in forgotPassword - userController.js");
    console.log(error);
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
