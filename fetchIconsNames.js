const fs = require('fs');
const path = require('path');

const iconsPath = path.join(__dirname, './node_modules/@phosphor-icons/core/assets');

const icons = {
    regular: [],
    thin: [],
    light: [],
    bold: [],
    fill: [],
    duotone: []
};


const readIcons = (type) => {
    fs.readdirSync(path.join(iconsPath, type)).forEach(file => {
        const iconName = file.split('.')[0];
        icons[type].push(iconName);
    });
}

readIcons('regular');
readIcons('thin');
readIcons('light');
readIcons('bold');
readIcons('fill');
readIcons('duotone');

fs.writeFileSync(path.join(__dirname, '/icons.json'), JSON.stringify(icons, null, 2));


console.log('icons.json created');
