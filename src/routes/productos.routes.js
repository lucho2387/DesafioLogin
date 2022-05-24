const express = require('express')
const router = express.Router()
const { 
        renderPorductoForm, 
        createNewProduct, 
        listProducts, 
        renderEditForm, 
        updateProduct, 
        deleteProduct 
} = require('../controllers/productos.controllers')

// Nuevo producto
router.get('/producto', renderPorductoForm)

router.post('/producto', createNewProduct)

// Listado de Productos
router.get('/productos', listProducts)

// Actualizar Producto
router.get('/:id', renderEditForm)

router.put('/:id', updateProduct)

// Eliminar Productos
router.delete('/:id', deleteProduct)

module.exports = router