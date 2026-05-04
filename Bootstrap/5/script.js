function filterProducts(category) {
    let items = document.querySelectorAll('.product');

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// function filterProducts(category) {
//     let items = document.querySelectorAll('.product');

//     // get all checked checkboxes
//     let selected = [];
//     document.querySelectorAll('#market input:checked').forEach(cb => {
//         selected.push(cb.value);
//     });

//     items.forEach(item => {
//         if (selected.length === 0) {
//             item.style.display = "block";
//         } else {
//             let match = selected.some(cat => item.classList.contains(cat));
//             item.style.display = match ? "block" : "none";
//         }
//     });
// }