const express = require('express');
const productController = require('../controllers/productController');
const { param, query, check, validationResult } = require('express-validator');

const router = express.Router();

// router.post('/products', productController.createProduct);
//ideally use method body as controller has req.body but check can also work 
router.post('/products',
    [
      check('name').notEmpty(),
      check('price').isFloat({ gt: 0 }),
      check('description').notEmpty(),
      check('quantity').optional().isInt({ gt: -1})
    ], (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    productController.createProduct
  );

// router.get('/products/:id', productController.getProduct);
router.get('/products/:id', [param("id").isInt().withMessage("Not found sdjdj")], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, productController.getProduct);

router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products', [query('quantity').isInt({ gt: -100}).withMessage("ERROR")], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, productController.getAllProducts);

module.exports = router;
