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
  const db_regency = path.resolve(__dirname, './data/regencies.csv');

  try {
    let { kode_induk } = req.query;
    const data = await csv().fromFile(db_regency);

    if (!kode_induk) return res.json(data);

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

// kecamatan
const getDistrict = async (req, res, next) => {
  const db_district = path.resolve(__dirname, './data/districts.csv');

  try {
    let { kode_induk } = req.query;
    const data = await csv().fromFile(db_district);
    // console.log(data);

    if (!kode_induk) return res.json(data);

    // const dataFilter = data.filter(
    //   (district) => district.kode_kabupaten === kode_induk
    // );

    // return res.json(dataFilter);
    return res.json(
      data.filter((district) => district.kode_kabupaten === kode_induk)
    );
  } catch (err) {
    return res.json({
      error: 1,
      message: "Can't get the district data, contact administrator",
    });
  }
};

// kelurahan
const getVillage = async (req, res, next) => {
  const db_village = path.resolve(__dirname, './data/villages.csv');

  try {
    let { kode_induk } = req.query;
    const data = await csv().fromFile(db_village);

    // console.log(data);

    if (!kode_induk) return res.json(data);

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
