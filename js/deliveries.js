document.getElementById("createDeliveryForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const date = document.getElementById("deliveryDate").value;
    const warehouse = document.getElementById("fromWarehouse").value;
    const destination = document.getElementById("destination").value;

    const delivery = {
        date: date,
        warehouse: warehouse,
        destination: destination
    }
    const response = await fetch("http://localhost:8080/api/delivery/create", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(delivery),
    });
    const data = await response.json();
    document.getElementById("fromWarehouse").value = "";
    document.getElementById("destination").value = "";
    listDeliveries();
});

async function listDeliveries() {
    try {
        const deliveries = await fetch(
            "http://localhost:8080/api/delivery/findall"
        ).then((response) => response.json());

        const tableRowsStr = deliveries
            .map(
                (delivery) =>
                    `<tr><td>${delivery.id}</td><td>${delivery.date}</td><td>${delivery.warehouse}</td><td>${delivery.destination}</td></tr>`
            )
            .join("");
        document.getElementById("table-rows3").innerHTML = tableRowsStr;
    } catch (error) {
        console.log(error);
    }
}

listDeliveries();
    