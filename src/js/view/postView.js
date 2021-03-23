import { elements } from "./base";

// Render posts in HTML post container
export const renderPosts = function (post) {
  const markup = `
        <article class="post">
            <div class="post__img-box">
            ${
              // Check if img exsists
              post.thumbnail
                ? `<img src="${post.thumbnail}" alt="${post.title}" class="post__img">`
                : ""
            }
                
            </div>
            <div class="post__info-box">
                <div class="post__info-wrapper">
                    <h4 class="post__info-heading" id="id">Title:</h4>
                    <span class="post__info-text">${post.title}</span>
                </div>
                <div class="post__info-wrapper">
                    <h4 class="post__info-heading" id="id">Author:</h4>
                    <span class="post__info-text">${post.authorName}</span>
                </div>
                <div class="post__info-wrapper">
                    <h4 class="post__info-heading" id="id">Category:</h4>
                    <span class="post__info-text">${post.category}</span>
                </div>
                <div class="post__tag-box">
                    ${post.tags
                      .map(
                        (tag) =>
                          `<span class="post__tag">${
                            tag[0].toUpperCase() + tag.slice(1)
                          }</span>`
                      )
                      .join("")}
                </div>
            </div>
            <div class="post__excerpt-box">
                <p class="post__excerpt">${post.excerpt}</p>
            </div>
        </article>
        `;
  elements.postContainer.insertAdjacentHTML("beforeend", markup);
};

export const clearPostsContainer = () =>
  (elements.postContainer.innerHTML = "");
