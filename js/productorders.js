document.getElementById("createProductOrderForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  const productorder = {
     deliveryId: document.getElementById("deliveryId").value,
    productId: document.getElementById("productId").value,
    quantity: document.getElementById("quantity").value
    };
    const response = await fetch("http://localhost:8080/api/productorder/create", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(productorder),
    });
    const data = await response.json();
    document.getElementById("deliveryId").value = "";
    document.getElementById("productId").value = "";
    document.getElementById("quantity").value = "";
    listProductOrders();
});



async function listProductOrders() {
    try {
        const productOrders = await fetch(
            "http://localhost:8080/api/productorder/findall"
        ).then((response) => response.json());

        let totalWeight = 0;
        let totalPrice = 0;

        const tableRowsStr = productOrders
            .map((productOrder) => {
                const weight = productOrder.product.weight * productOrder.quantity;
                const price = productOrder.product.price * productOrder.quantity;
                totalWeight += weight;
                totalPrice += price;
                return `<tr>
                          <td>${productOrder.delivery.id}</td>
                          <td>${productOrder.product.id}</td>
                          <td>${productOrder.quantity}</td>
                          <td>${weight}</td>
                          <td>${price}</td>
                          <td><button onclick="removeProductOrder(${productOrder.id})">Remove</button></td>
                        </tr>`;
            })
            .join("");

        document.getElementById("table-rows4").innerHTML = tableRowsStr;
        document.getElementById("totalWeight").innerText = totalWeight;
        document.getElementById("totalPrice").innerText = totalPrice;

    } catch (error) {
        console.log(error);
    }
}

async function removeProductOrder(id) {
    try {
        await fetch(`http://localhost:8080/api/productorder/delete/${id}`, {
            method: "DELETE",
        });
        listProductOrders();
    } catch (error) {
        console.log(error);
    }
}

listProductOrders();