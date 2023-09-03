import fetchApi from "./fetchApi.js";
import select from "./select.js";
const displayCategory = (url) => {

    fetchApi(url)
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
                        <div class="category-item" onclick="select('${url}?category=${item}')">${item}</div>
                    </div>
                `;
            })
            htmls = htmls.join("");
            const categoryListRow = document.querySelector(".category-list .row");
            categoryListRow.innerHTML = htmls;

        });
}


// const select = (api) => {
//     apiCurrent = api;
//     displayProducts(apiCurrent);
//     resetApi();
//     resetSelect();
// }

export default displayCategory;