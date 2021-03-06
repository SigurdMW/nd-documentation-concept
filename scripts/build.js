const path = require("path")
const fs = require("fs").promises
const makePdf = require("./md-to-pdf")
const makeHTML = require("./md-to-html")
const makeJSON = require("./md-to-json")
require("colors")

const docsPath = path.resolve(__dirname, "../docs")
const publicPath = path.resolve(__dirname, "../public")
const distPath = path.resolve(__dirname, "../dist")
const allProductMetaPath = path.resolve(distPath, "./products.json")
const getProductMetaPath = (productName) => path.resolve(__dirname, "../docs/", productName, "meta.json")

const run = async () => {
	try {
		const allProductDocsDirs = await fs.readdir(docsPath)
		const { onIteration, onDone } = makeJSON(allProductMetaPath, getProductMetaPath)
		for (const productName of allProductDocsDirs) {
			await makePdf({ productName, docsPath, distPath: publicPath })
			await makeHTML({ productName, docsPath, distPath: publicPath })
			await onIteration(productName)
		}
		await onDone()
		
		console.log("Successfully completed build task".green)
		process.exit(0)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

run()