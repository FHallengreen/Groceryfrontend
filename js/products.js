document
  .getElementById("addProductForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    var name = document.getElementById("productName").value;
    var price = document.getElementById("productPrice").value;
    var weight = document.getElementById("productWeight").value;
    const response = await fetch("http://localhost:8080/api/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, price: price, weight: weight }),
    });
    const data = await response.json();
    console.log(data);
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    listProducts();
  });

async function listProducts() {
  try {
    const products = await fetch(
      "http://localhost:8080/api/product/findall"
    ).then((response) => response.json());

    const tableRowsStr = products
      .map(
        (product) =>
          `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.weight}</td></tr>`
      )
      .join("");

    document.getElementById("table-rows").innerHTML = tableRowsStr;
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("findProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("findProductByName").value;
    try {
        const response = await fetch("http://localhost:8080/api/product/findbyname/" + encodeURIComponent(name));
        if (!response.ok) {
            throw new Error("Failed to find product.. " + response.status);
        }
        const product = await response.json();
        const tableRowStr = `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.weight}</td></tr>`;
        document.getElementById("table-rows2").innerHTML = tableRowStr;
        console.log(product);
    } catch (error) {
        console.log(error);
    }
});

// Initially list all products
listProducts();
