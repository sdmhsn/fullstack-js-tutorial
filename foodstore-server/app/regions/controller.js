const csv = require('csvtojson');
const path = require('path');

// provinsi
const getProvince = async (req, res, next) => {
  const db_province = path.resolve(__dirname, './data/provinces.csv');

  try {
    const data = await csv().fromFile(db_province);
    return res.json(data);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Can't get the province data, contact administrator",
    });
  }
};

// kabupaten
const getRegency = async (req, res, next) => {
  try {
    const db_regency = path.resolve(__dirname, './data/regencies.csv');
    const data = await csv().fromFile(db_regency);

    let { kode_induk } = req.query;

    const dataFilter = data.filter(
      (regency) => regency.kode_provinsi === kode_induk
    );

    return res.json(dataFilter);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Can't get the regency data, contact administrator",
    });
  }
};

// kelurahan
const getDistrict = async (req, res, next) => {
  try {
    const db_district = path.resolve(__dirname, './data/districts.csv');
    const data = await csv().fromFile(db_district);

    // console.log(data);

    const { kode_induk } = req.query;

    const dataFilter = data.filter(
      (district) => district.kode_kabupaten === kode_induk
    );

    return res.json(dataFilter);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Can't get the district data, contact administrator",
    });
  }
};

// kecamatan
const getVillage = async (req, res, next) => {
  try {
    const db_village = path.resolve(__dirname, './data/villages.csv');
    const data = await csv().fromFile(db_village);

    const { kode_induk } = req.query;

    const dataFilter = data.filter(
      (village) => village.kode_kecamatan === kode_induk
    );

    return res.json(dataFilter);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Can't get the village data, contact administrator",
    });
  }
};

module.exports = {
  getProvince,
  getRegency,
  getDistrict,
  getVillage,
};
