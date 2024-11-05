// start inputs 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let temp; // unreal var
// 1-- function for total 
function getTotal(){
    if(price.value != ''){
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.backgroundColor = '#007c00';
    }else{
        total.style.backgroundColor = '#f5160685';
        total.innerHTML = '';
    }
}


// 2-- create product
let dataArray;
if(localStorage.getItem('pro') != null){
    dataArray = JSON.parse(localStorage.getItem('pro'));
}
else{
    dataArray=[];
}
submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    // count btn 
    if(title.value != '' && price.value != '' && category.value !='' && newPro.count <= 100){
        if(mood === 'create'){
            if(newPro.count >1 ){
                for(let i =0 ; i< newPro.count; i++){
                    dataArray.push(newPro);
                }
            }else{
                dataArray.push(newPro);
            }
        }else{
            dataArray[temp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearDataCreate();
    }
    

   
   localStorage.setItem('pro', JSON.stringify(dataArray));

   
    readDataTable();
}




// 3-- clear inputs function
function clearDataCreate(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


//  note !!!!
// we can use:
// this for create function
// submit.onclick = function(){
    // let newProduct = {
    //     title: title.value,
    //     price: price.value,
    //     taxes: taxes.value,
    //     ads: ads.value,
    //     discount: discount.value,
    //     total: total.innerHTML,
    //     count: count.value,
    //     category: category.value,
    // }
    // dataProduct.push(newProduct);
    // localStorage.setItem('product', JSON.stringify(dataProduct))

    // clearData();
//}

// and when we want to clear data, we can create new function and call it in the create function 
// like this: 
// function clearData(){
    // title.value = '';
    // price.value = '';
    // ads.value = '';
    // taxes.value = '';
    // discount.value = '';
    // count.value = '';
    // category.value = '';
    // total.innerHTML = '';
//}



// 4-- read function
function readDataTable(){
    getTotal();
    let tableData = '';
    for(let i = 0; i< dataArray.length; i++){
        tableData += `
        <tr>
             <td>${i+1}</td>
             <td>${dataArray[i].title}</td>
             <td>${dataArray[i].price}</td>
             <td>${dataArray[i].taxes}</td>
             <td>${dataArray[i].ads}</td>
             <td>${dataArray[i].discount}</td>
             <td>${dataArray[i].total}</td>
             <td>${dataArray[i].category}</td>
             <td> <button onclick ="updateDataSpecific(${i})"><i class="fa fa-pencil" id="update"></i></button> </td>
             <td> <button onclick= "deleteDataSpecific(${i})"><i class="fa fa-trash" id="delete"></i></button></td>
         </tr>
        `
    }
    document.getElementById('tbody').innerHTML = tableData;

    let deleteAllBtn = document.getElementById('deleteAll');
    if(dataArray.length > 0 ){
        deleteAllBtn.innerHTML =  `
        <button onclick = "deleteAllProducts()">Delete All Products</button>
          `
    }else{
        deleteAllBtn.innerHTML = '';
    }
}

readDataTable();





// 5-- delete product function
function deleteDataSpecific(i){
    dataArray.splice(i,1);
    localStorage.pro= JSON.stringify(dataArray);
    readDataTable();
}



// 6-- delete all products using delete all btn function
function deleteAllProducts(){
    localStorage.clear();
    dataArray.splice(0);
    readDataTable();
}





// 7-- update btn function


// description....
// when we click on update btn, two things should be done!!
// first: all information about the product should appear in the inputs section
// second: when we update information, the new info should updated if click update or create

function updateDataSpecific(i){
    title.value = dataArray[i].title;
    price.value = dataArray[i].price;
    taxes.value = dataArray[i].taxes;
    ads.value = dataArray[i].ads;
    discount.value = dataArray[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataArray[i].category;
    submit.innerHTML = 'Update';

    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}




// 8-- search functions
let searchMood = 'title';
function getSearchFunction(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'search by '+searchMood;
    search.focus();
    search.value = '';
    readDataTable();

}

function searchDataInput(value){
    let table = '';
    for(let i =0; i<dataArray.length;i++){
        if(searchMood == 'title'){
        
            if(dataArray[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
             <td>${i}</td>
             <td>${dataArray[i].title}</td>
             <td>${dataArray[i].price}</td>
             <td>${dataArray[i].taxes}</td>
             <td>${dataArray[i].ads}</td>
             <td>${dataArray[i].discount}</td>
             <td>${dataArray[i].total}</td>
             <td>${dataArray[i].category}</td>
             <td> <button onclick ="updateDataSpecific(${i})"><i class="fa fa-pencil" id="update"></i></button> </td>
             <td> <button onclick= "deleteDataSpecific(${i})"><i class="fa fa-trash" id="delete"></i></button></td>
         </tr>
        `
            }
        
    }
    else{
        
            if(dataArray[i].category.includes(value.toLowerCase())){
                table += `
        <tr>
             <td>${i}</td>
             <td>${dataArray[i].title}</td>
             <td>${dataArray[i].price}</td>
             <td>${dataArray[i].taxes}</td>
             <td>${dataArray[i].ads}</td>
             <td>${dataArray[i].discount}</td>
             <td>${dataArray[i].total}</td>
             <td>${dataArray[i].category}</td>
             <td> <button onclick ="updateDataSpecific(${i})"><i class="fa fa-pencil" id="update"></i></button> </td>
             <td> <button onclick= "deleteDataSpecific(${i})"><i class="fa fa-trash" id="delete"></i></button></td>
         </tr>
        `
            }
        }
    
    }
    
    document.getElementById('tbody').innerHTML = table;
}
