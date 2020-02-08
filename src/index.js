const express = require('express')
const path = require("path")
const fs = require("fs").promises
const helmet = require("helmet")

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, "../public")))
app.use(helmet()) // used for security headers

let file
app.get('/', (req, res) => {
	if (!file) {
		file = require(path.resolve(__dirname, "../dist/products.json"))
	}
	return res.send(file)
})

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}/!`)
})
