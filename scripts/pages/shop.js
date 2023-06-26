window.addEventListener("DOMContentLoaded", async () => {
    try {
        const main = document.querySelector(".main-content");
        const productGrid = document.querySelector(".product-grid");
        // The text that says what you are shoping (e.g thirts)
        const productQueryInfo = document.querySelector(
            ".product-query-info h3"
        );
        const productQueryInfoNr = document.querySelector(
            ".product-query-info p"
        );
        // Get both the collectio nand the category params
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get("category");
        const collectionParam = urlParams.get("collection");

        const orderedCategories = [
            "shirts",
            "tees",
            "hoodies",
            "sweatshirts",
            "pants",
            "shorts",
            "hats",
            "bags",
            "socks",
        ];

        // mapping the identifier names to the actual names that should be printed
        const collectionMap = {
            signature: "Signature Collection",
            "spring-2023": "Spring '23 Collection",
            "summer-2023": "Summer '23 Collection",
            cosmic: "Cosmic Collection",
        };

        const response = await fetch("../../data/products.json");
        const data = await response.json();

        if (data.products) {
            // sorting the products by the index of their category before filtering.
            let filteredProducts = data.products.sort((a, b) => {
                return (
                    orderedCategories.indexOf(a.category) -
                    orderedCategories.indexOf(b.category)
                );
            });

            // for both collection and category we check if a param was provided and also check if the param is valid, if so we filter the products and reasign it to filtered prodcuts
            if (categoryParam) {
                filteredProducts = filteredProducts.filter(
                    (product) => product.category === categoryParam
                );

                productQueryInfo.textContent = categoryParam;
            }

            if (collectionParam) {
                filteredProducts = filteredProducts.filter(
                    (product) => product.collection === collectionParam
                );

                if (!categoryParam) {
                    productQueryInfo.textContent = `${collectionMap[collectionParam]}`;
                } else {
                    productQueryInfo.textContent += ` (${collectionMap[collectionParam]})`;
                }
            }

            if (filteredProducts.length === 0) {
                main.innerHTML = `
                    <div class="error">
                        <h1>404.</h1>
                    </div>`;
                return;
            }

            productQueryInfoNr.textContent = `${filteredProducts.length} Products`;

            const html = filteredProducts
                .map(
                    ({
                        id,
                        name,
                        price,
                        sizes,
                        collection,
                        category,
                        isSoldOut,
                        isNew,
                        images,
                        details,
                    }) => {
                        return `
                        <div class="product-grid__item product-item ${
                            isSoldOut ? "product-item--disabled" : ""
                        }">
                            <div class="product-item__container column">
                                <a class="product-item__image-link" href="./product.html?id=${id}">
                                    <div class="product-item__image-container">
                                        <img
                                            class="product-item__image"
                                            src="${images[0]}"
                                            alt="Product 2"
                                        />
                                    </div>
                                </a>
                                <div class="product-item__info column">
                                    <!-- <p class="product-item__collection">${collection}</p> -->
                                    <div class="product-item__info-container row">
                                        <a class="product-item__title flex" href="./product.html?id=${id}">
                                        ${name} 
                                        </a>
                                        <p class="product-item__price">${price} kr</p>
                                    </div>
                                    ${
                                        isSoldOut
                                            ? "SOLD OUT"
                                            : `<div class="product-item__size size-selector">
                                        ${
                                            sizes
                                                ? Object.entries(sizes).reduce(
                                                      (acc, [size, bool]) =>
                                                          (acc += `
                                            <input
                                                type="radio"
                                                name="size"
                                                id="size${size}"
                                                value="${size}"
                                                class="size-selector__option"
                                                checked
                                                ${bool ? "" : "disabled"}
                                            />
                                            <label for="size${size}" class="size-selector__label"
                                                >${size}</label
                                            >
                                        
                                        `),
                                                      ""
                                                  )
                                                : "ONE-SIZE"
                                        }
                                    </div>`
                                    }
            
                                </div>
                            </div>
                        </div>`;
                    }
                )
                .join("");

            productGrid.innerHTML = html;
        }
    } catch (error) {
        console.log(error);
    }
});
