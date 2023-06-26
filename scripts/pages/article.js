window.addEventListener("DOMContentLoaded", async () => {
    try {
        const main = document.querySelector(".main-content");

        // Get the id for the article
        const id = Number(
            new URLSearchParams(window.location.search).get("id")
        );

        // Fetch all the articlcs
        const response = await fetch("../../data/articles.json");
        const { articles } = await response.json();

        if (articles) {
            const article = articles.find((article) => article.id === id);

            // If the articles does not exist return error page
            if (!article) {
                main.innerHTML = `
                    <div class="error">
                        <h1>404.</h1>
                    </div>`;
                return;
            }

            const {
                title,
                date,
                heroImage,
                text,
                images,
                metadata: { gridColumns },
            } = article;

            document.title = `${title} - Glitchborne Groove`;
            document
                .querySelector('meta[name="description"]')
                .setAttribute("content", text);

            // Using template literals to insert the article
            main.innerHTML = `
                <article class="article">
                    <div class="article__container column">
                        <div class="article__header column">
                            <h1 class="article__title">${title}</h1>
                            <small>
                                <time class="article__date" datetime="${date}">${date}</time>
                            </small>
                        </div>
                        ${
                            heroImage
                                ? `<div class="article__hero-image-container"><img class="article__hero-image" src="../${heroImage}" alt="Article hero image" /></div>`
                                : ""
                        }
                        <div class="article__text"><small>${text}</small></div>
                        <div class="article__image-grid grid-col-${gridColumns}">
                            ${images.reduce(
                                (acc, cur) =>
                                    acc +
                                    `
                                <div class="article__image-container"><img class="article__grid-image" src="../${cur}" alt="Article image" /></div>
                            `,
                                ""
                            )}
                        </div>
                    </div>
                </article>`;
        }
    } catch (error) {
        console.error(error);
    }
});
