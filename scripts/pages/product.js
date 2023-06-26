window.addEventListener("DOMContentLoaded", async () => {
    try {
        const main = document.querySelector(".main-content");
        const productId = Number(
            new URLSearchParams(window.location.search).get("id")
        );

        const response = await fetch("../../data/products.json");
        const { products } = await response.json();

        if (products) {
            const product = products.find(
                (product) => product.id === productId
            );

            if (!product) {
                main.innerHTML = `
                    <div class="error">
                        <h1>404.</h1>
                    </div>`;
                return;
            }

            const {
                id,
                name,
                price,
                sizes,
                description,
                collection,
                category,
                isSoldOut,
                isNew,
                images,
                details,
            } = product;

            document.title = `${name} - Glitchborne Groove`;
            document
                .querySelector('meta[name="description"]')
                .setAttribute("content", description);

            main.innerHTML = `
                <div class="product grid-two-col">
                    <div class="product__image-container">
                        ${images.reduce(
                            (acc, cur) =>
                                acc +
                                `
                        <div class="product__image-wrapper"><img class="product__image" src="../${cur}" alt="Product image" /></div>
                        `,
                            ""
                        )}
                    </div>
                    <div class="product__info-container">
                        <div class="product__info column">
                            <div>
                                <h1 class="product__title">${name}</h1>
                                <p class="product__price">${price} kr</p>
                            </div>

                            <div class="product__size">
                                ${
                                    isSoldOut
                                        ? "SOLD OUT"
                                        : `
                                <div class="size-selector">
                                    ${
                                        sizes
                                            ? Object.entries(sizes).reduce(
                                                  (acc, [size, bool]) =>
                                                      (acc += ` <input type="radio" name="size"
                                    id="size${size}" value="${size}"
                                    class="size-selector__option" checked ${
                                        bool ? "" : "disabled"
                                    } />
                                    <label for="size${size}" class="size-selector__label"
                                        >${size}</label
                                    >

                                    `),
                                                  ""
                                              )
                                            : "ONE-SIZE"
                                    }
                                </div>
                                `
                                }
                            </div>
                            <button class="product__add-to-cart button button--primary">
                                Add this item to cart
                            </button>

                            <div class="product__accordian-wrapper">
                                <div class="product__accordion accordion accordion--open">
                                    <div class="accordion__header">
                                        <p class="accordion__title">Product details</p>
                                        <img
                                            src="../assets/icons/right-chevron.svg"
                                            alt="Right pointing chevron"
                                            width="12px"
                                            class="accordion__icon"
                                        />
                                    </div>
                                    <div class="accordion__body">
                                        <div class="accordion__content column">
                                            ${description}<br />
                                            ${details}
                                        </div>
                                    </div>
                                </div>
                                <div class="product__accordion accordion">
                                    <div class="accordion__header">
                                        <p
                                            class="accordion__title"
                                            >Shipping and returns</p
                                        >
                                        <img
                                            src="../assets/icons/right-chevron.svg"
                                            alt="Right pointing chevron"
                                            width="12px"
                                            class="accordion__icon"
                                        />
                                    </div>
                                    <div class="accordion__body">
                                        <div class="accordion__content">
                                            <strong>Returns</strong>
                                            <p>
                                                Our refund policy is 15 Days. Unfortunately we
                                                can’t offer you a refund or exchange after this
                                                period. To be eligible for a return, your item
                                                must be unused and in the same condition that
                                                you received it. It must also be in the original
                                                packaging. Several types of goods are exempt
                                                from being returned. Perishable goods such as
                                                food, flowers, newspapers or magazines cannot be
                                                returned. We also do not accept products that
                                                are intimate or sanitary goods, hazardous
                                                materials, or flammable liquids or gases.
                                            </p>

                                            <p>
                                                To complete your return, we require a receipt or
                                                proof of purchase. Please do not send your
                                                purchase back to the manufacturer.
                                            </p>

                                            <br />

                                            <strong>Refunds (if applicable)</strong>
                                            <p>
                                                Once your return is received and inspected, we
                                                will send you an email to notify you that we
                                                have received your returned item. We will also
                                                notify you of the approval or rejection of your
                                                refund.
                                            </p>

                                            <p>
                                                If you are approved, then your refund will be
                                                processed, and a credit will automatically be
                                                applied to your credit card or original method
                                                of payment, within a certain amount of days.
                                            </p>

                                            <br />

                                            <strong>Exchanges (if applicable)</strong>
                                            <p>
                                                We only replace items if they are defective or
                                                damaged. If you need to exchange it for the same
                                                item, send us an email at
                                                <a href="mailto:support@glitchbornegroove.com"
                                                    >support@glitchbornegroove.com</a
                                                >
                                                and send your item to: 567 Vector Boulevard, Neo
                                                Metropolis, Neon District 90033.
                                            </p>

                                            <br />

                                            <strong>Shipping</strong>
                                            <p>
                                                Our products are shipped within 2-3 Days using
                                                the following carriers: , , UPS, . To return
                                                your product, you should mail your product to:
                                                567 Vector Boulevard, Neo Metropolis, Neon
                                                District 90033. You will be responsible for
                                                paying for your own shipping costs for returning
                                                your item. Shipping costs are non-refundable. If
                                                you receive a refund, the cost of return
                                                shipping will be deducted from your refund.
                                                Depending on where you live, the time it may
                                                take for your exchanged product to reach you,
                                                may vary. If you are shipping an item over $50,
                                                you should consider using a trackable shipping
                                                service or purchasing shipping insurance. We
                                                don’t guarantee that we will receive your
                                                returned item.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                ${
                                    sizes &&
                                    category.toLowerCase() !== "hats" &&
                                    category.toLowerCase() !== "bags" &&
                                    category.toLowerCase() !== "socks"
                                        ? `
                                <div class="product__accordion accordion">
                                    <div class="accordion__header">
                                        <p class="accordion__title" >Sizing Guide</p>
                                        <img
                                            src="../assets/icons/right-chevron.svg"
                                            alt="Right pointing chevron"
                                            width="12px"
                                            class="accordion__icon"
                                        />
                                    </div>
                                    <div class="accordion__body">
                                        <div class="accordion__content">
                                            ${
                                                category.toLowerCase() ===
                                                    "pants" || "shorts"
                                                    ? `
                                            <table class="size-table">
                                                <tr>
                                                    <th>SIZE</th>
                                                    <th>XS</th>
                                                    <th>S</th>
                                                    <th>M</th>
                                                    <th>L</th>
                                                    <th>XL</th>
                                                    <th>XXL</th>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">WAIST</td>
                                                    <td>71</td>
                                                    <td>76</td>
                                                    <td>81</td>
                                                    <td>86</td>
                                                    <td>91</td>
                                                    <td>96</td>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">
                                                        INSEAM
                                                    </td>
                                                    <td>76</td>
                                                    <td>79</td>
                                                    <td>81</td>
                                                    <td>84</td>
                                                    <td>86</td>
                                                    <td>89</td>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">
                                                        OUTSEAM
                                                    </td>
                                                    <td>99</td>
                                                    <td>102</td>
                                                    <td>104</td>
                                                    <td>107</td>
                                                    <td>109</td>
                                                    <td>112</td>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">
                                                        LEG OPENING
                                                    </td>
                                                    <td>33</td>
                                                    <td>34</td>
                                                    <td>36</td>
                                                    <td>37</td>
                                                    <td>38</td>
                                                    <td>39</td>
                                                </tr>
                                            </table>
                                            <br />

                                            `
                                                    : `
                                            <table class="size-table">
                                                <tr>
                                                    <th>SIZE</th>
                                                    <th>XS</th>
                                                    <th>S</th>
                                                    <th>M</th>
                                                    <th>L</th>
                                                    <th>XL</th>
                                                    <th>XXL</th>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">CHEST</td>
                                                    <td>86</td>
                                                    <td>91</td>
                                                    <td>97</td>
                                                    <td>102</td>
                                                    <td>107</td>
                                                    <td>112</td>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">
                                                        FRONT LENGTH
                                                    </td>
                                                    <td>68</td>
                                                    <td>71</td>
                                                    <td>73</td>
                                                    <td>76</td>
                                                    <td>78</td>
                                                    <td>81</td>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">
                                                        SLEEVE LENGTH
                                                    </td>
                                                    <td>33</td>
                                                    <td>34</td>
                                                    <td>36</td>
                                                    <td>37</td>
                                                    <td>38</td>
                                                    <td>39</td>
                                                </tr>
                                                <tr>
                                                    <td class="size-table__row-title">
                                                        SHOULDER WIDTH
                                                    </td>
                                                    <td>38</td>
                                                    <td>40</td>
                                                    <td>42</td>
                                                    <td>44</td>
                                                    <td>46</td>
                                                    <td>48</td>
                                                </tr>
                                            </table>
                                            `
                                            }<br />
                                            <small
                                                ><strong>NOTE:</strong> This sizing guide
                                                provides measurements for our products in
                                                centimeters.
                                            </small>
                                        </div>
                                    </div>
                                    `
                                        : ""
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;

            // Emit event that the products has loaded
            window.dispatchEvent(new Event("productsLoaded"));
        }
    } catch (error) {
        console.error(error);
    }
});
