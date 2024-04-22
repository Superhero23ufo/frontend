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
	)

	if (!user.rows[0]) {
		return res.status(400).send('User not found')
	}
	const isPasswordValid = await bcrypt.compare(password, user.rows[0].password) 
	if (!isPasswordValid) {
		return res.status(400).send('Invalid password')
	}
	const token = jwt.sign(
		{ id: user.id, email: user.email },
		' SuperSecretImpossibleToDecode'
	)
	// insert token into the database
	const id = user.rows[0].id

	await client.query(
		'UPDATE users SET token = $1 WHERE id = $2'
	, [token, id])
	res.status(200).send({
		token,
		user: {
			id: user.rows[0].id,
			email: user.rows[0].email,
		},
	
	})
})
// Signup
router.post('/signup', async (req, res) => {
	const { email, password } = req.body
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await client.query(
		`INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}') RETURNING id,email`
	)
	res.status(200).send(
		{
			id: user.rows[0].id,
			email: user.rows[0].email,
		} 
	)
})
// Logout
router.post('/logout', isAuthenticated, async (req, res) => {
	const { id } = req.user
	await client.query(`DELETE FROM users WHERE id = ${id}`)
	res.status(200).send('Logged out successfully')
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
	)
	res.status(200).send(product.rows[0])
})

// Create a cart
router.post('/cart', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await client.query(
		`INSERT INTO carts (user_id) VALUES (${id}) RETURNING *`
	)
	res.status(200).send(cart.rows[0])
})
// Add product to cart
router.post('/cart/:cartId', isAuthenticated, async (req, res) => {
	const { cartId } = req.params
	const { productId, quantity } = req.body
	const cart = await client.query(
		`INSERT INTO cart_products (cart_id, product_id, quantity) VALUES (${cartId}, ${productId}, ${quantity}) RETURNING *`
	)
	res.status(200).send(cart.rows[0])
})
// Get cart by ID
router.get('/cart', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await (
		await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
	)
	res.status(200).send(cart.rows[0])
})
// Get products in cart
router.get('/cart/products', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = (await client.query(`SELECT * FROM carts WHERE user_id = ${id}`))
	const cartId = cart.rows[0].id
	const cartProducts = await client.query(
		`SELECT * FROM cart_products WHERE cart_id = ${cartId}`
	)
	res.status(200).send(cartProducts.rows[0])
})
// Update product quantity in cart
router.put('/cart/products/:productId', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
	const cartId = cart.rows[0].id

	const { productId } = req.params
	const { quantity } = req.body
	const cartProduct = await client.query(
		`UPDATE cart_products SET quantity = ${quantity} WHERE cart_id = ${cartId} AND product_id = ${productId} RETURNING *`
	)
	res.status(200).send(cartProduct.rows[0])
})  
// Delete product from cart
router.delete(
	'/cart/products/:productId',
	isAuthenticated,
	async (req, res) => {
		const { id } = req.user
		const cart = await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
		const cartId = cart.rows[0].id
		const { productId } = req.params
		await client.query(
			`DELETE FROM cart_products WHERE cart_id = ${cartId} AND product_id = ${productId}`
		)
		res.status(200).send('Product deleted from cart')
	}
)
// Delete cart
router.delete('/cart', isAuthenticated, async (req, res) => {
	const { id } = req.user
	const cart = await client.query(`SELECT * FROM carts WHERE user_id = ${id}`)
	const cartId = cart.rows[0].id
	await (
		await client.query(`DELETE FROM carts WHERE id = ${cartId}`)
	)
	res.status(200).send('Cart deleted')
})

module.exports = router
