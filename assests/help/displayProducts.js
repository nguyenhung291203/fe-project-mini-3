import fetchApi from "./fetchApi.js";


function displayProducts(api) {
    fetchApi(api)
        .then(data => {
            let htmls = data.map(item => {
                return `
                    <div class="col-2">
                        <div class="productItem">
                        <img
                            src="${item.thumbnail}"
                            alt=""
                            class="productImg"
                        />
                        <div class="productDiscountPercentage">${item.discountPercentage.toFixed()}%</div>
                        <div class="productContent">
                            <div class="productContentLeft">
                            <div class="productTitle">${item.title}</div>
                            <div class="productPrice">${item.price}$</div>
                            </div>
                            <div class="productContentRight">
                            <div class="productStock">Còn lại: ${item.stock} sp</div>
                            </div>
                        </div>
                        </div>
                    </div>
            `;
            });
            htmls = htmls.join("");

            const productListRow = document.querySelector(".productList .row");
            productListRow.innerHTML = htmls;

        })
};


export default displayProducts;