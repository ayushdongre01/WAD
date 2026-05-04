function displayProducts(category){
    let items = document.querySelectorAll('.product');

    items.forEach(item => {
        if(category === 'all' || item.classList.contains(category)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    });
}