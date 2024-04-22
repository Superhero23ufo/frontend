const pg = require('pg')
const client = new pg.Client(
	'postgres://shop_p9eo_user:o5ugV4xpeNVjuH1QDU6kLRvRDMp6h15u@dpg-cohg1n0l5elc73cnl5fg-a.oregon-postgres.render.com/shop_p9eo?ssl=true'
)

module.exports = client
