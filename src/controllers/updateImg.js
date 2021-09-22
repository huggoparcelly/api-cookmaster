const Services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  // const { path } = req.file;
  const { filename } = req.file;

  const updateImg = await Services.updateImg(id, filename);

  return res.status(200).json({ ...updateImg });
};