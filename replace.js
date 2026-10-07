const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if(!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if(file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(process.cwd());
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const newContent = content.replace(/https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[a-zA-Z0-9.\-]+\/css\/all\.min\.css/g, '/asstes/css/all.min.css');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
        count++;
    }
});
console.log('Total files updated: ' + count);
