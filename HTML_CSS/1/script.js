let products = [
    {img:"https://via.placeholder.com/60", name:"Headphones", price:"₹7999", desc:"Noise cancelling"},
    {img:"https://via.placeholder.com/60", name:"Smartwatch", price:"₹12999", desc:"Fitness watch"},
    {img:"https://via.placeholder.com/60", name:"Mouse", price:"₹2499", desc:"Gaming mouse"},
    {img:"https://via.placeholder.com/60", name:"Laptop Stand", price:"₹1999", desc:"Adjustable stand"},
    {img:"https://via.placeholder.com/60", name:"Keyboard", price:"₹2999", desc:"Mechanical keyboard"},
    {img:"https://via.placeholder.com/60", name:"Speaker", price:"₹3999", desc:"Bluetooth speaker"},
    {img:"https://via.placeholder.com/60", name:"Tablet", price:"₹15999", desc:"Android tablet"},
    {img:"https://via.placeholder.com/60", name:"Phone", price:"₹20999", desc:"Smartphone"},
    {img:"https://via.placeholder.com/60", name:"Charger", price:"₹999", desc:"Fast charger"},
    {img:"https://via.placeholder.com/60", name:"Camera", price:"₹45999", desc:"DSLR camera"},
    {img:"https://via.placeholder.com/60", name:"Printer", price:"₹8999", desc:"Color printer"},
    {img:"https://via.placeholder.com/60", name:"Monitor", price:"₹12999", desc:"LED monitor"}
];

let currentPage = 1;
let itemsPerPage = 10;

function displayProducts() {
    let table = document.getElementById("tableBody");
    table.innerHTML = "";

    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    let pageItems = products.slice(start, end);

    pageItems.forEach(p => {
        let row = `<tr>
            <td><img src="${p.img}"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.desc}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function nextPage() {
    if (currentPage * itemsPerPage < products.length) {
        currentPage++;
        displayProducts();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

// load first page
displayProducts();