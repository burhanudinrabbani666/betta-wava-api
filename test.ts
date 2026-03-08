async function getProducts() {
  const response = await fetch("https://betta-wava.burhanudin.com/products");
  const data = await response.json();

  console.log(data);
}

getProducts();
