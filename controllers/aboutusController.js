const AboutUs = require("../model/AboutUs");

const postAboutUs = async (req, res) => {
  console.log(req.body);
  try {
    const aboutus = new AboutUs(req.body);
    await aboutus.save();
    res.status(200).json({ aboutus });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not Save the Form" });
  }
  res.sendStatus(200);
};

const getAboutUs = async (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
};

module.exports = { postAboutUs, getAboutUs };
