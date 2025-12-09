import Address from "../models/AddressModel.js";

// Add address
export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get address
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const address = await Address.find({ userId });
    res.json({ success: true, address });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
