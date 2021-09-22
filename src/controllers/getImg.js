const Services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;

  const image = await Services.getImg(id);

  return res.status(200).send(image);
};