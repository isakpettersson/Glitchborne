window.addEventListener("DOMContentLoaded", async () => {
    const grid = document.querySelector(".articles__grid");

    try {
        const response = await fetch("../../data/articles.json");
        const { articles } = await response.json();

        if (!articles) {
            main.innerHTML = `
                <div class="error">
                    <h1>404.</h1>
                </div>`;
            return;
        }

        // Mapping each article to a article element and inserting all the data
        const html = articles
            .map(({ id, title, date, category, heroImage, text, images }) => {
                const imagePath = heroImage || images[0];
                const truncatedText = `${text.slice(0, 120)}...`;

                return `
                    <article class="articles__item articles__item--hero column article">
                        <div class="article__image-container">
                            <a href="./article.html?id=${id}" class="article__image-link">
                                <img class="article__image" src="../${imagePath}" alt="Article thumbnail"/>
                            </a>
                        </div>
                        <div class="article__content-container column">
                            <a href="./article?id=${id}" class="article__title">${title}</a>
                            <small class="article__description">${truncatedText}</small>
                            <div class="article__metadata">
                            <small class="article__category">${category}</small>
                            <span></span>
                            <time datetime="${date}">${date
                    .split("-")
                    .join("/")}</time>
                        </div>
                        </div>
                    </article>`;
            })
            .join("");

        grid.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
});
