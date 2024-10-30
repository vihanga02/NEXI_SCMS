import Admin from "../Models/AdminModel.js";

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

async function getStores(req, res) {
  try {
    const stores = await Admin.getStores();
    res.status(200).json(stores);
  } catch (error) {
    console.error("Error in getting stores:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during getting stores." });
  }
}

async function removeManager(req, res) {
  try {
    const {Manager_ID} = req.params;
    const result = await Admin.removeManager(Manager_ID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in removing manager:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during removing manager." });
  }
}

export { removeManager, getManager, getStores };
