const express = require('express')
const app = express()
const cors = require('cors')
const env = require('dotenv')
const port = 4000 || process.env.PORT
const client = require('./client')

app.use(express.json())
app.use(cors({ origin: '*', credentials: true }))
app.use(express.urlencoded({ extended: true }))

// Postgres Database Schema
const schema = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS carts CASCADE;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300),
    price INTEGER,
    description TEXT,
    images TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid,
    product_id uuid REFERENCES products(id),
    quantity INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`

app.use('/api', require('./api'))

const init = async () => {
	// Connect to Postgres Database
	await client.connect()

	app.listen(port, (error) => {
		if (error) console.log(error)
		console.log('Connected to Postgres Database')
		console.log(`Server running on port ${port}`)
	})
}

init()
