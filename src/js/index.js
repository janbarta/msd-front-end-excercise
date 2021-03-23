/**********************
 *  Styles import
 *
 *********************/
import "../sass/main.scss";

/**********************
 *  Import JS modules
 *
 *********************/
import { API_URL, EXCERPT_LENGTH } from "./config";
import { AJAX } from "./helper";
import * as postView from "./view/postView";
import * as filterView from "./view/filterView";
import { elements, renderLoader, clearLoader } from "./view/base";

/**********************
 *  Core functionalities
 *
 *********************/
// Return new array of posts with authors name and avatar
const getFilterPosts = function (posts, authors, filter) {
  // Filter posts by category
  if (filter !== "all")
    posts = posts.filter((post) => post.category === filter);

  // Add author name to objects
  const postsWithAuthors = posts.map((post) => {
    // Find author by ID
    const author = authors.find((auth) => post.author_id == auth.author_id);

    // Return N/A if author ID is not specified
    return author !== undefined
      ? {
          ...post,
          authorAvatar: author.avatar,
          authorName: author.full_name,
        }
      : {
          ...post,
          authorAvatar: "",
          authorName: "N/A",
        };
  });

  return postsWithAuthors;
};

// Return posts with excerpts
const getPostsWithExcerpts = function (posts) {
  const postsExcerpts = posts.map((post) => {
    // Remove HTML elements
    const content = post.content.replace(/(<([^>]+)>)/gi, "");
    const excerpt =
      content.length > EXCERPT_LENGTH
        ? `${content.substring(0, EXCERPT_LENGTH)}...`
        : content;

    return { ...post, excerpt: excerpt };
  });
  return postsExcerpts;
};

// Display posts
const displayPosts = async function (filterCategory = "all") {
  try {
    // Clear HTML
    elements.postContainer.innerHTML = "";
    elements.postContainer.classList.remove("fadeIn");

    //Display laoder
    renderLoader(elements.bodyElement);

    // Get data from API
    const posts = await AJAX(`${API_URL}posts`);
    const authors = await AJAX(`${API_URL}users`);

    // Filter category
    const postsFiltered = getFilterPosts(posts, authors, filterCategory);

    // Add excerpts
    const postsFinal = getPostsWithExcerpts(postsFiltered);

    // Render posts
    postsFinal.forEach((post) => postView.renderPosts(post));

    // Clear loader
    clearLoader();

    // Display posts container
    elements.postContainer.classList.add("fadeIn");

    // hide loader
  } catch (err) {
    throw err;
  }
};

/**********************
 *  Init app
 *
 *********************/
const init = function () {
  displayPosts();
  filterView.addFilterOptions();
  filterView.addFilterHandler(displayPosts);
};
init();
