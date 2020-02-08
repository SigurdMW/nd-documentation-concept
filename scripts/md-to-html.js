const mdToPdf = require('md-to-pdf').default
const cheerio = require('cheerio')
const path = require("path")
const fs = require("fs").promises
require("colors")

const makeHTML = async ({ productName, docsPath, distPath }) => {
	const html = await mdToPdf({
		path: path.resolve(docsPath, productName, productName + ".md") 
	}, {
		// dest: path.resolve(distPath, productName + ".html"),
		as_html: true
	})
	if (!html) throw new Error("No html from productName " + productName)
	const $ = cheerio.load(html.content)
	const bodyHTMLContent = $("body").html()
	await fs.writeFile(path.resolve(distPath, productName + ".html"), bodyHTMLContent.trim())
	return html
}

module.exports = makeHTML