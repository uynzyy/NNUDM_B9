var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category')
const slugify = require('slugify');


/* GET users listing. */
router.get('/', async function (req, res, next) {


  let categories = await categoryModel.find({});

  res.status(200).send({
    success: true,
    data: categories
  });
});
router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let category = await categoryModel.findById(id);
    res.status(200).send({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "khong co id phu hop"
    });
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true })  // Tạo slug từ tên
    })
    await newCategory.save();
    res.status(200).send({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
