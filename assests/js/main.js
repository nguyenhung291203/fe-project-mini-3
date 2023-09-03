const fetchApi = async (api) => {
    const response = await fetch(api);
    const result = await response.json();
    return result;
};
let products;
const apiProductsAll = "http://localhost:3000/products";

let apiCurrent = apiProductsAll;

displayProducts(resetApi(apiProductsAll));
const displayCategory =
    fetchApi(apiProductsAll)
    
    .then(data => {
        return data.map(item => item.category);
    })
    .then(data => {
        return data.filter((item, index) => data.indexOf(item) == index);
    })
    .then(data => {
        let htmls = data.map(item => {
            return `
                    <div class="col-category">
                        <div class="category-item" onclick="select('${apiProductsAll}?category=${item}')">${item}</div>
                    </div>
            `;
        });
        htmls = htmls.join("");
        const categoryListRow = document.querySelector(".category-list .row");
        categoryListRow.innerHTML = htmls;

    });





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
            products = htmls.length;
            htmls = htmls.join("");

            const productListRow = document.querySelector(".productList .row");
            productListRow.innerHTML = htmls;

        })
};


const select = (api) => {
    apiCurrent = api;
    displayProducts(apiCurrent);
    resetPage();
    resetSelect();
};

const productSearch = () => {
    const productInput = document.getElementById("productInput");
    const productValue = productInput.value;

    if (productValue !== "") {
        productInput.value = "";
        apiCurrent = `${apiProductsAll}?q=${productValue}`;
        displayProducts(resetApi(apiCurrent));

    }
    resetPage();
    resetSelect();
};

const change = () => {
    displayPage(currentPageValue);
    resetPage();
    // displayProducts(`${apiProductsALl}${selectInput.value}`)
    if (apiCurrent === apiProductsAll) {
        apiCurrent = apiProductsAll + `?${selectInput.value}`;
        displayProducts(resetApi(apiCurrent));

    } else {
        displayProducts(resetApi(apiCurrent + `&${selectInput.value}`));
    }

};

function restSelectInput() {
    const selectInput = document.getElementById("selectInput");

}

const selectInput = document.getElementById("selectInput");

const buttonPrev = document.getElementById("button--prev");
const buttonNext = document.getElementById("button--next");
const currentPage = document.getElementById("currentPage");
let currentPageValue = currentPage.innerHTML;

displayPage(currentPageValue);


const next = () => {
    currentPageValue++;

    displayPage(currentPageValue);
    displayProducts(resetApi(apiCurrent, currentPageValue));

    if (products == 0) {
        buttonNext.disabled = true;
        displayPage(currentPageValue-1);
        displayProducts(resetApi(apiCurrent, currentPageValue-1));
        return null;
    }
    buttonPrev.disabled = false;



}

const back = () => {


    buttonNext.disabled = false;

    if (currentPageValue == 0) {
        buttonPrev.disabled = true;
        return null;
    }

    currentPageValue--;
    displayPage(currentPageValue);
    displayProducts(resetApi(apiCurrent, currentPageValue));

}

function displayPage(number) {
    currentPage.innerHTML = number;
};


function resetApi(api, number) {
    number = number || 1;
    if (api === apiProductsAll)
        return `${api}?_page=${number}&_limit=6`;
    return `${api}&_page=${number}&_limit=6`;

};


function resetSelect() {
    const optionDeafult = document.querySelector("#selectInput option");
    optionDeafult.selected = true;

};

function resetPage() {
    const selectInput = document.getElementById("selectInput");
    currentPageValue = 1;
    displayPage(currentPageValue);
}
