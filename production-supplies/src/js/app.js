import { loadInventory, saveInventory } from './api.js';

// Общи функции
function showAlert(message, type = 'success') {
 const alert = document.createElement('div');
 alert.className = `alert alert-${type}`;
 alert.textContent = message;
 document.body.prepend(alert);
 setTimeout(() => alert.remove(), 3000);
}

// Инициализация на страниците
document.addEventListener('DOMContentLoaded', () => {
 if (localStorage.getItem('isAdmin') !== 'true' && !location.pathname.endsWith('index.html')) {
 location.href = 'index.html';
 return;
 }

 if (document.getElementById('loginForm')) {
 initLoginPage();
 }
 
 if (document.getElementById('itemsTable')) {
 initAddPage();
 }
 
 if (document.getElementById('inventoryTable')) {
 initInventoryPage();
 }
});

// Инициализация на страницата за вход
function initLoginPage() {
 document.getElementById('loginForm').addEventListener('submit', (e) => {
 e.preventDefault();
 const password = document.getElementById('adminPassword').value;
 if (password === "admin123") {
 localStorage.setItem('isAdmin', 'true');
 location.href = 'admin.html';
 } else {
 showAlert('Грешна парола!', 'error');
 }
 });
}

// Инициализация на страницата за добавяне
async function initAddPage() {
 let items = await loadInventory();
 
 document.getElementById('saveAllBtn').addEventListener('click', async () => {
 const rows = document.querySelectorAll('#itemsTable tbody tr');
 const newItems = [];
 const archiveEntries = [];
 
 rows.forEach(row => {
 newItems.push({
 code: row.querySelector('.item-code').value,
 name: row.querySelector('.item-name').value,
 position: row.querySelector('.item-position').value,
 itemsPerPackage: parseInt(row.querySelector('.items-per-package').value),
 packages: parseInt(row.querySelector('.packages').value),
 total: parseInt(row.querySelector('.total').value),
 size: row.querySelector('.item-size').value || '',
 dateAdded: new Date().toISOString()
 });
 
 archiveEntries.push({
 action: 'Добавяне',
 user: 'admin',
 date: new Date().toISOString(),
 item: {
 code: row.querySelector('.item-code').value,
 name: row.querySelector('.item-name').value
 }
 });
 });
 
 try {
 await saveInventory([...items, ...newItems], archiveEntries);
 showAlert('Артикулите са запазени успешно!');
 setTimeout(() => location.href = 'inventory.html', 1500);
 } catch (error) {
 showAlert('Грешка при запазване: ' + error.message, 'error');
 }
 });
}

// Инициализация на складовата наличност
async function initInventoryPage() {
 const items = await loadInventory();
 const tableBody = document.querySelector('#inventoryTable tbody');
 
 items.forEach(item => {
 const row = document.createElement('tr');
 row.innerHTML = `
 <td>${item.code}</td>
 <td>${item.name}</td>
 <td>${item.position}</td>
 <td>${item.size || '-'}</td>
 <td>${item.total}</td>
 <td>
 <button class="btn-edit" onclick="location.href='edit.html?code=${item.code}'"> </button>
 </td>
 `;
 tableBody.appendChild(row);
 });
}
