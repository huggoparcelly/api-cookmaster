const Services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;

  const updateImg = await Services.updateImg(id, path);

  return res.status(200).json({ ...updateImg });
};