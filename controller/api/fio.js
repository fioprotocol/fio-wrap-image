const {readFileSync} = require('fs');

export const handler = (req, res) => res.send(generateSvg(req.params.domain.replace('.svg', '')));

const fioSvg = readFileSync("fio.svg").toString()

const generateSvg = (name) => {
    const isDomain = name.indexOf('@') === -1;
    const realName = isDomain ? `@${name}` : name;
    return fioSvg.replace('{content}', generateContent(realName));
}

const generateContent = (realName) => {
    const topOffset = 160;
    const verticalPadding = 8;

    const fontSize = 15;
    const lineHeight = fontSize * 1.45;

    const symbolsPerLine = 21;
    const lines = Math.ceil(realName.length / symbolsPerLine);

    const rectHeight = verticalPadding * 2 + lineHeight * lines;

    let content = `<rect id="Rectangle" fill="#FFFFFF" opacity="0.05" x="15" y="${topOffset}" width="220" height="${rectHeight}" rx="7"/>`;

    for (let i = 0; i < lines; i++) {
        const textTopOffset = topOffset + verticalPadding + fontSize + i * lineHeight;
        const namePart = realName.substring(i * symbolsPerLine, (i * symbolsPerLine) + symbolsPerLine);
        content += `<text font-family="ProximaNova-Medium, Proxima Nova" font-size="${fontSize}" font-weight="400" fill="#FFFFFF" x="${lines === 1 ? "50%" : 30}" text-anchor="${lines === 1 ? "middle" : "left"}" y="${textTopOffset}">${namePart}</text>`;
    }

    return content;
}
