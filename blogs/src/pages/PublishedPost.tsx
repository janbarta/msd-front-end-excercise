import React, { useState } from "react";
import { Header } from "../components/Header";
import { PostList } from "../components/PostList";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

/**
 * PublishedPost is the Page for the list of posts
 * @return {jsx} Published Posts Page
 */
export const PublishedPost: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>();

  return (
    <React.Fragment>
      <Header setSelectedFilter={setSelectedFilter} />
      <PostList selectedFilter={selectedFilter} />
    </React.Fragment>
  );
};
