// Добавяне на нов ред в таблицата
function addNewRow() {
 const table = document.querySelector('#itemsTable tbody');
 const newRow = document.createElement('tr');
 newRow.innerHTML = `
 <td><input type="text" class="item-code" required></td>
 <td><input type="text" class="item-name" required></td>
 <td><input type="text" class="item-position" required></td>
 <td><input type="number" class="items-per-package" min="1" required></td>
 <td><input type="number" class="packages" min="1" required></td>
 <td><input type="number" class="total" readonly></td>
 <td>
 <select class="item-size">
 <option value="">-</option>
 <option value="XS">XS</option>
 <option value="S">S</option>
 <option value="M">M</option>
 <option value="L">L</option>
 <option value="XL">XL</option>
 </select>
 </td>
 <td><button class="remove-btn" onclick="removeRow(this)">Изтрий</button></td>
 `;
 table.appendChild(newRow);
}

// Премахване на ред
function removeRow(btn) {
 const row = btn.closest('tr');
 row.remove();
}

// Запазване на всички артикули
function saveAllItems() {
 alert("Артикулите са запазени успешно!");
 // Тук добавете логиката за запазване
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
 // Добавете първия ред автоматично
 addNewRow();
});
