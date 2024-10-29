import Admin from "../Models/AdminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getManager(req, res) {
  try {
    const managers = await Admin.getManagers();
    res.status(200).json(managers);
  } catch (error) {
    console.error("Error in getting managers:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during getting managers." });
  }
}

async function removeManager(req, res) {
  try {
    const Manager_ID = req.user.id;
    const result = await Admin.removeManager(Manager_ID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in removing manager:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during removing manager." });
  }
}

export { removeManager, getManager };
