const mdToPdf = require('md-to-pdf').default
const path = require("path")
require("colors")

const makePdf = async ({ productName, docsPath, distPath }) => {
	const pdf = await mdToPdf({
		path: path.resolve(docsPath, productName, productName + ".md") 
	}, {
		dest: path.resolve(distPath, productName + ".pdf")
	})
	if (!pdf) throw new Error("No PDF from productName " + product.red)
	return pdf
}

module.exports = makePdf
