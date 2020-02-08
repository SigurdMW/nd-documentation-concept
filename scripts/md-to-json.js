const fs = require("fs").promises

module.exports = function(allProductMetaPath, getProductMetaPath) {
	const arr = []
	return {
		onIteration: async function(productName) {
			const meta = require(getProductMetaPath(productName))
			arr.push(meta)
		},
		onDone: async function() {
			await fs.writeFile(allProductMetaPath, JSON.stringify(arr))
		}
	}
}