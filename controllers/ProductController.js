import { v2 as cloudinary } from "cloudinary";

// Add product
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);

    const images = req.files;
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await productById.create({ ...productData, image: imageUrl });

    res.json({
      success: true,
      message: "Product added successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get list of products
export const productList = async (req, res) => {};

// Get single product
export const productById = async (req, res) => {};

// Change inStock
export const changeStock = async (req, res) => {};
