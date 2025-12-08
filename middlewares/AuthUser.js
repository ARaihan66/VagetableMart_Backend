const authUser = async (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const tokenDecoded = await jwt.verify(token, process.env.JWT_TOKEN);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
