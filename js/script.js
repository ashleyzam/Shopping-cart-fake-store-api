const queryId = (isId) => document.getElementById(isId);
const queryClass = (clase) => document.getElementsByClassName(clase);
let cart = [];

const URL_BASE = "https://fakestoreapi.com/products?limit=5";
let title = undefined;

const getData = () => {
  fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      if (title) {
        showData(data.filter((prod) => prod.title === title));
      } else {
        showData(data);
      }
    })
    .catch((err) => console.log(err));
};
getData();
const productDetail = (id) => {
  fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => {
      const product = data.find((prod) => prod.id === id);
      renderData(product)
    });
};

const showData = (productos) => {
  queryId("container").innerHTML = "";
  for (const producto of productos) {
    const { category, id, image, price, title } = producto;

    queryId("container").innerHTML += `
     <div class="card mb-3" style="max-width: 540px; ">
         <div class="row g-0">
         <div class="col-md-4 mt-5">
             <img src="${image}" class="img-fluid rounded-start" alt="${image}">
         </div>
         <div class="col-md-8">
             <div class="card-body">
                 <h5 class="card-title mt-5">${title}</h5>
                 <p class="card-text">$${price}</p>
                 <label for="exampleColorInput" class="form-label">Color</label>
                 <span class="badge bg-dark">${category}</span>
                 <span class="badge bg-dark">Winter clothes</span>
                 
             </div>
         </div>
         <button class="btn btn-info mb-5 mt-5" onclick="productDetail(${id})">Show details</button>
         </div>
     </div>        
 `;
  }
};


const addToCart = (id) =>{
    fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => {
        const isInCart = cart.filter(prod => prod.id === id)
        const product = data.find(prod => prod.id === id)
        if(isInCart.length == 0){
            cart.push({...product, quantity: 1})
        }else{
            const productInCart = cart.find(prod => prod.id === id)
            const newQuantity = productInCart.quantity + 1
            cart = cart.map(prod=>{
                if(prod.id === id){
                    return {...prod, quantity: newQuantity}
                }else{
                    return prod
                }
            })
        }
        
    })  
    .catch(err => console.log(err))

}

const renderCart = (carrito) =>{
    queryId("container").innerHTML = ""
    if(carrito.length>0){
        queryId('table').classList.remove('d-none')
        queryId("table--body").innerHTML = ""
        for (const { id, quantity, title } of carrito)  {
            //console.log(carrito[0][0].id)
            queryId("table--body").innerHTML += `
            <tr>
                <td>${title}</td>
                <td>${quantity}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>            
            `
        }
            
        }else{
            queryId("table").classList.add("d-none")
            queryId("container").innerHTML = "Aun no hay productos"
        }
    }

queryId("cart").addEventListener("click",()=>{
     renderCart(cart)
    });
const renderData = ({ category, description, id, image, price, title }) => {
  queryId("container").innerHTML = "";
    queryId("container").innerHTML = `
       <div class="card mb-3" style="max-width: 540px; ">
           <div class="row g-0">
           <div class="col-md-4 mt-5">
               <img src="${image}" class="img-fluid rounded-start" alt="${image}">
           </div>
           <div class="col-md-8">
               <div class="card-body">
                   <h5 class="card-title mt-5">${title}</h5>
                   <p class="card-text">$${price}</p>
                   <label for="exampleColorInput" class="form-label">Color</label>
                   <input type="color" class="form-control form-control-color mb-2" id="exampleColorInput" value="#563d7c" title="Choose your color">
                    <p class="card-text">${description}</p>
                   <span class="badge bg-dark">${category}</span>
                   <span class="badge bg-dark">Winter clothes</span>
                   
               </div>
           </div>
           <button class="btn btn-info mb-5 mt-5" onclick="addToCart(${id})">Add to cart</button>
           </div>
       </div>        
   `;
  }


queryId("remeras").addEventListener("click", () => {
  title = "Mens Casual Slim Fit";
  title = "Mens Casual Premium Slim Fit T-Shirts ";
  getData();
});

queryId("abrigos").addEventListener("click", () => {
  title = "Mens Cotton Jacket";
  getData();
});
queryId("jewerly").addEventListener("click", () => {
  title =
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet";
  getData();
});
queryId("bolsos").addEventListener("click", () => {
  title = "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops";
  getData();
});
queryId("all").addEventListener("click", () => {
  title = undefined;
  getData();
});
