
// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', function(){
  const nav = document.getElementById('mobileNav');
  const expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', String(!expanded));
  if(nav.hidden){ nav.hidden = false; } else { nav.hidden = true; }
});

// --- Nested checkbox logic (Task 2) ---
const selectAll = document.getElementById('selectAll');
const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
const fruits = document.querySelectorAll('.fruit');
const vegetables = document.querySelectorAll('.vegetable');
const selectedOut = document.getElementById('selectedOut');

function setIndeterminate(el, val){
  if(!el) return;
  el.indeterminate = val;
}

function updateCategory(category, items){
  const categoryBox = document.querySelector(`.category-checkbox[data-category="${category}"]`);
  const allChecked = [...items].every(i => i.checked);
  const someChecked = [...items].some(i => i.checked);
  categoryBox.checked = allChecked;
  setIndeterminate(categoryBox, !allChecked && someChecked);
}

function updateSelectAll(){
  const allItems = [...fruits, ...vegetables];
  const allChecked = allItems.every(i => i.checked);
  const someChecked = allItems.some(i => i.checked);
  selectAll.checked = allChecked;
  setIndeterminate(selectAll, !allChecked && someChecked);
  updatePreview();
}

function updatePreview(){
  const selected = [];
  [...fruits].forEach(f => { if(f.checked) selected.push(f.value); });
  [...vegetables].forEach(v => { if(v.checked) selected.push(v.value); });
  selectedOut.textContent = JSON.stringify(selected, null, 2);
}

// Select All toggles everything
selectAll.addEventListener('change', (e) => {
  const checked = e.target.checked;
  [...categoryCheckboxes, ...fruits, ...vegetables].forEach(cb => {
    cb.checked = checked;
    cb.indeterminate = false;
  });
  updatePreview();
});

// Category toggles children
categoryCheckboxes.forEach(cb => {
  cb.addEventListener('change', (e) => {
    const category = e.target.dataset.category;
    const items = category === 'fruits' ? fruits : vegetables;
    items.forEach(i => i.checked = cb.checked);
    cb.indeterminate = false;
    updateSelectAll();
  });
});

[...fruits, ...vegetables].forEach(cb => {
  cb.addEventListener('change', () => {
    updateCategory('fruits', fruits);
    updateCategory('vegetables', vegetables);
    updateSelectAll();
    updatePreview();
  });
});

// init preview
updateSelectAll();
updatePreview();
