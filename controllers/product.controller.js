const productModel = require('../models/product.model');
let ProductModel = require('../models/product.model');

module.exports.save = async (req, res) => {
    const product = new ProductModel(req.body);
    let result = await product.save();
    res.json(result)
}

module.exports.update = async (req, res) => {
    let result = await productModel.findOneAndUpdate(req.params.id, req.body);
    res.json(result)
}

module.exports.findById = async (req, res) => {
    const id = req.query.id;
  
    let result = await ProductModel.findById(id)
    res.json(result)
  };

module.exports.find = async (req, res) => {

    if (req.query.name)
    {
        ProductModel.find({ name: { $regex: new RegExp(req.query.name), $options: "i" } })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });
    }
    else
    {
        let result = await ProductModel.find(req.params)
        res.json(result)
    }
}

module.exports.deleteById = async (req, res) => {
    const id = req.query.id;
    let result = await ProductModel.deleteOne({_id: id});
    res.json(result)
}

module.exports.deleteAll = async (req, res) => {
    let result = await ProductModel.deleteMany();
    res.json(result)
}