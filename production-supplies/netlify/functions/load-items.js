const fs = require('fs');
const path = require('path');

exports.handler = async () => {
const filePath = path.join(process.cwd(), 'src', 'data', 'inventory.json');

try {
if (!fs.existsSync(filePath)) {
return {
statusCode: 200,
body: JSON.stringify({ items: [], archive: [] })
};
}

const data = fs.readFileSync(filePath, 'utf8');
return {
statusCode: 200,
body: data
};
} catch (error) {
return {
statusCode: 500,
body: JSON.stringify({ error: 'Failed to load data' })
};
}
};
