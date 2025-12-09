// Place order COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = red.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid address" });
    }

    //Calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);

      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount = amount + Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
