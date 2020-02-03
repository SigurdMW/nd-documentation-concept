const mdToPdf = require('md-to-pdf').default
const path = require("path")
const filePath = path.resolve(__dirname, "../docs/ND5340/ND5340.md")
const outputPath = path.resolve(__dirname, "../dist/ND5340.pdf")

const run = async () => {
	try {
		const pdf = await mdToPdf({
			path: filePath 
		}, {
			dest: outputPath
		})

		if (pdf) {
			console.log("Successfully created PDF: ", pdf.filename);
		} else {
			console.log("Whoops, no error but no PDF either")
		}
		process.exit(0)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

run()