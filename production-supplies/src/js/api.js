const API_BASE = '/.netlify/functions';

export async function loadInventory() {
try {
const response = await fetch(`${API_BASE}/load-items`);
if (!response.ok) throw new Error('Грешка при заявката');
const data = await response.json();
return data.items || [];
} catch (error) {
console.error('Грешка при зареждане:', error);
return [];
}
}

export async function loadArchive() {
try {
const response = await fetch(`${API_BASE}/load-items`);
if (!response.ok) throw new Error('Грешка при заявката');
const data = await response.json();
return data.archive || [];
} catch (error) {
console.error('Грешка при зареждане:', error);
return [];
}
}

export async function saveInventory(items, archiveEntries) {
try {
const response = await fetch(`${API_BASE}/save-items`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ items, archive: archiveEntries })
});

if (!response.ok) throw new Error('Грешка при запазване');
return await response.json();
} catch (error) {
console.error('Грешка при запазване:', error);
throw error;
}
}