const mdToPdf = require('md-to-pdf').default
const cheerio = require('cheerio')
const path = require("path")
const fs = require("fs").promises
require("colors")

const docsPath = path.resolve(__dirname, "../docs")
const distPath = path.resolve(__dirname, "../dist")
const allProductMetaPath = path.resolve(distPath, "./products.json")
const getProductMetaPath = (productName) => path.resolve(__dirname, "../docs/", productName, "meta.json")

const makePdf = async (productName) => {
	const pdf = await mdToPdf({
		path: path.resolve(docsPath, productName, productName + ".md") 
	}, {
		dest: path.resolve(distPath, productName + ".pdf")
	})
	if (!pdf) throw new Error("No PDF from productName " + product)
	return pdf
}

const makeHTML = async (productName) => {
	const html = await mdToPdf({
		path: path.resolve(docsPath, productName, productName + ".md") 
	}, {
		// dest: path.resolve(distPath, productName + ".html"),
		as_html: true
	})
	if (!html) throw new Error("No html from productName " + product)
	const $ = cheerio.load(html.content)
	const bodyHTMLContent = $("body").html()
	await fs.writeFile(path.resolve(distPath, productName + ".html"), bodyHTMLContent.trim())
	return html
}

const run = async () => {
	try {
		const allProductDocsDirs = await fs.readdir(docsPath)
		const allMeta = []
		for (const productName of allProductDocsDirs) {
			await makePdf(productName)
			await makeHTML(productName)
			const meta = await fs.readFile(getProductMetaPath(productName))
			allMeta.push(JSON.parse(meta))
		}
		await fs.writeFile(allProductMetaPath, JSON.stringify(allMeta))
		console.log("Successfully completed task md-of-pdf".green)
		process.exit(0)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

run()