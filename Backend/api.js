const express = require('express')
const router = express.Router()
const client = require('./client')
// JWT middleware
const jwt = require('jsonwebtoken')
const isAuthenticated = (req, res, next) => {
	const authorizationHeader = req.headers.authorization
	if (!authorizationHeader)
		return res.status(401).send({
			message: 'Authorization header required',
		})
	const token = authHeader.split(' ')[1]

	jwt.verify(token, 'SuperSecretImpossibleToDecode', (error, decoded) => {
		if (error) return res.status(403).send('Forbidden ')
		req.user = decoded
		next()
	})
}
// Signup & Login // Password hashing with bcrypt
const bcrypt = require('bcrypt')
// Login
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	const user = await client.query(
		`SELECT * FROM users WHERE email = '${email}'`
	).rows[0]
	if (!user) {
		return res.status(400).send('User not found')
	}
	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) {
		return res.status(400).send('Invalid password')
	}
	const token = jwt.sign(
		{ id: user.id, email: user.email },
		' SuperSecretImpossibleToDecode'
	)
	res.status(200).send(token)
})
// Signup
router.post('/signup', async (req, res) => {
	const { email, password } = req.body
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await client.query(
		`INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}') RETURNING *`
	)
	const token = jwt.sign(
		{ id: user.id, email: user.email },
		'SuperSecretImpossibleToDecode'
	)
	res.status(200).send(token)
})
// Get All Products
router.get('/products', async (req, res) => {
	try {
		const products = await (await client.query('SELECT * FROM products')).rows
		res.status(200).send(products)
	} catch (error) {
		res.status(500).send('Internal server error')
	}
})
// Get Product By ID
router.get('/products/:id', async (req, res) => {
	const { id } = req.params
	const product = await (
		await client.query(`SELECT * FROM products WHERE id = ${id}`)
	).rows[0]
	res.status(200).send(product)
})

// Create a cart
router.post('/cart', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await client.query(
		`INSERT INTO carts (user_id) VALUES (${id}) RETURNING *`
	).rows[0]
	res.status(200).send(cart)
})
// Add product to cart
router.post('/cart/:cartId', isAuthenticated, async (req, res) => {
	const { cartId } = req.params
	const { productId, quantity } = req.body
	const cart = await client.query(
		`INSERT INTO cart_products (cart_id, product_id, quantity) VALUES (${cartId}, ${productId}, ${quantity}) RETURNING *`
	).rows[0]
	res.status(200).send(cart)
})
// Get cart by ID
router.get('/cart', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await (
		await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
	).rows[0]
	res.status(200).send(cart)
})
// Get products in cart
router.get('/cart/products', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = (await client.query(`SELECT * FROM carts WHERE user_id = ${id}`))
		.rows[0]
	const cartId = cart.id
	const cartProducts = await client.query(
		`SELECT * FROM cart_products WHERE cart_id = ${cartId}`
	)
	res.status(200).send(cartProducts)
})
// Update product quantity in cart
router.put('/cart/products/:productId', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
	const cartId = cart.id

	const { productId } = req.params
	const { quantity } = req.body
	const cartProduct = await client.query(
		`UPDATE cart_products SET quantity = ${quantity} WHERE cart_id = ${cartId} AND product_id = ${productId} RETURNING *`
	).rows[0]
	res.status(200).send(cartProduct)
})
// Delete product from cart
router.delete(
	'/cart/products/:productId',
	isAuthenticated,
	async (req, res) => {
		const { id } = req.user
		const cart = await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
		const cartId = cart.id
		const { productId } = req.params
		await client.query(
			`DELETE FROM cart_products WHERE cart_id = ${cartId} AND product_id = ${productId}`
		).rows[0]
		res.status(200).send('Product deleted from cart')
	}
)
// Delete cart
router.delete('/cart', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
	const cartId = cart.id
	await (
		await client.query(`DELETE FROM carts WHERE id = ${cartId}`)
	).rows[0]
	res.status(200).send('Cart deleted')
})

module.exports = router
