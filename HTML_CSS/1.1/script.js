let products =  [
    {img:"https://google.com/butterfly.png", name:"Radio", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Laptop", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Computer", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Headphones", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Mobile", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"TV", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"T-shirt", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Bottle", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Book", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Notebook", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Watch", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Pen", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Almirah", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Matress", price:"₹2499", desc:"Best fm radio for family"},
    {img:"https://google.com/butterfly.png", name:"Laptop Stand", price:"₹2499", desc:"Best fm radio for family"}
];

let currentPage = 1;
let itemsPerPage = 10;

function displayProducts(){
    let table = document.getElementById("tablebody");
    table.innerHTML = "";

    let start = (currentPage-1)*itemsPerPage;
    let end = start+itemsPerPage;

    let productitems = products.slice(start, end);

    productitems.forEach(p=>{
        let row = `<tr>
        <td><img src="${p.img}"></td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.desc}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function prevPage(){
    if(currentPage > 1){
        currentPage--;
        displayProducts();
    }
}

function nextPage(){
    if((currentPage-1)*itemsPerPage < products.length){
        currentPage++;
        displayProducts();
    }
}

displayProducts();