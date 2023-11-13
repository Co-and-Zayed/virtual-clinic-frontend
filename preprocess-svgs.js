const fs = require("fs");
const cheerio = require("cheerio");

const svgDirectory = "src/assets/icons";
const outputDirectory = "src/assets/IconComponents";

fs.readdirSync(svgDirectory).forEach((file) => {
  if (file.endsWith(".svg")) {
    const filePath = `${svgDirectory}/${file}`;
    const outputFileName = file.replace(/\.svg$/, ".tsx");
    const outputFilePath = `${outputDirectory}/${outputFileName}`;

    if (!fs.existsSync(outputFilePath)) {
      const svgContent = fs.readFileSync(filePath, "utf8");
      const $ = cheerio.load(svgContent, { xmlMode: true });

      $("path").attr("fill", "currentColor");
      fs.writeFileSync(filePath, $.html());
    }
  }
});
