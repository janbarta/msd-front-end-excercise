import { Card, Elevation, Tag } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";

/**
 * IPost interface defines state of a single post
 */
interface IPost {
  thumbnail: string;
  title: string;
  content: string;
  author_id: number | null;
  category: string;
  tags: [string];
}

/**
 * IPost interface defines state a single User
 */
interface IUser {
  full_name: string;
  avatar: string;
  author_id: number | null;
}

/**
 * IProps interface defines component props
 */
interface IProps {
  selectedFilter: string | undefined;
}

/**
 * PostList component renders the list of posts
 * @param {IProps} {selectedFilter} is a useState state sent by Parent PublishedPost
 * @return {jsx} list of posts
 */
export const PostList: React.FC<IProps> = ({ selectedFilter }) => {
  /**
   * postList stores fetched data required for the postList state
   * endpoint : "https://6d050cf6-cb6b-4e1c-9a70-7cd58b48e696.mock.pstmn.io/users"
   */
  const [postList, setPostList] = useState<IPost[]>([
    {
      thumbnail: "",
      title: "",
      content: "",
      author_id: 0,
      category: "",
      tags: [""],
    },
  ]);

  /**
   * filteredPosts stores filtered posts, filtered by current selected filter "selectedFilter"
   * endpoint : "https://6d050cf6-cb6b-4e1c-9a70-7cd58b48e696.mock.pstmn.io/posts"
   */
  const [filteredPosts, setFilteredPosts] = useState<(IPost | null)[]>();

  /**
   * usersList stores fetched data required for the user state
   * endpoint : "https://6d050cf6-cb6b-4e1c-9a70-7cd58b48e696.mock.pstmn.io/users"
   */
  const [usersList, setUsersList] = useState<IUser[]>([
    { full_name: "", avatar: "", author_id: 0 },
  ]);

  useEffect(() => {
    const filterByCategory = () => {
      let filteredPosts: (null | IPost)[];

      if (selectedFilter && selectedFilter !== "Filter") {
        filteredPosts = postList.filter(
          (post) => post.category === selectedFilter
        );

        return setFilteredPosts(filteredPosts);
      }
      return setFilteredPosts(undefined);
    };
    filterByCategory();
  }, [selectedFilter, postList]);

  useEffect(() => {
    /**
     * fetchPosts function asynchronously fetches the state and sets postList using setPostList function
     */
    async function fetchPosts() {
      try {
        let response = await fetch(
          "https://6d050cf6-cb6b-4e1c-9a70-7cd58b48e696.mock.pstmn.io/posts"
        );
        const data = await response.json();
        const postArray: IPost[] = data.map((datum: any) => {
          const {
            author_id,
            thumbnail,
            title,
            content,
            tags,
            category,
          } = datum;
          const post: IPost = {
            author_id,
            thumbnail,
            title,
            content,
            tags,
            category,
          };
          return post;
        });
        setPostList(postArray);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchPosts();

    /**
     * fetchUsers function asynchronously fetches the users state and sets postList using setPostList function
     */
    async function fetchUsers() {
      try {
        let response = await fetch(
          "https://6d050cf6-cb6b-4e1c-9a70-7cd58b48e696.mock.pstmn.io/users"
        );
        const data = await response.json();
        const userArray = data.map((datum: any) => {
          const { full_name, avatar, author_id } = datum;
          const user = { full_name, avatar, author_id };
          return user;
        });
        setUsersList(userArray);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchUsers();
  }, []);

  /**
   * AuthorDetails function return the author details for the individual post
   * @param {number} author_id author_id of the author
   * @return {jsx} author avatar and full_name
   */
  const AuthorDetails = (author_id: number) => {
    const user = usersList.find((user) => user.author_id === author_id && user);
    if (author_id > 0)
      return (
        <React.Fragment>
          <img className="author-img" alt="" src={user ? user.avatar : ""} />
          <h5 className="mr-2">{user ? user.full_name : ""}</h5>
        </React.Fragment>
      );

    return "";
  };

  return (
    <div className="center">
      <Container className="list-padding">
        {filteredPosts
          ? filteredPosts.map(
              (post) =>
                (post?.author_id ||
                  (post?.author_id === null && post.title > "")) && (
                  <Card
                    key={post?.title}
                    elevation={Elevation.ONE}
                    className="post"
                  >
                    <Row>
                      <Col sm={4} md={2}>
                        <img
                          className="thumbnail"
                          alt="thumbnail"
                          src={
                            post?.thumbnail
                              ? post.thumbnail
                              : "https://loremflickr.com/640/360"
                          }
                        ></img>
                      </Col>
                      <Col sm={4} md={10}>
                        <h5>{post?.title}</h5>

                        <Row>
                          {AuthorDetails(post?.author_id ? post?.author_id : 0)}
                        </Row>
                        <p>{post?.content}</p>
                        <Row>
                          <Col md={1}>
                            <h5>Category</h5>
                            <Tag>{post?.category}</Tag>
                          </Col>
                          <Col style={{ marginLeft: "12px" }}>
                            <h5>Tags</h5>
                            <Row>
                              {post?.tags.map((tag) => (
                                <Tag className="mr-1" key={tag}>
                                  {tag}
                                </Tag>
                              ))}
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                )
            )
          : postList.map((post) => (
              <Card key={post.title} elevation={Elevation.ONE} className="post">
                <Row>
                  <Col sm={4} md={2}>
                    <img
                      className="thumbnail"
                      alt="thumbnail"
                      src={
                        post.thumbnail
                          ? post.thumbnail
                          : "https://loremflickr.com/640/360"
                      }
                    ></img>
                  </Col>
                  <Col sm={4} md={10}>
                    <h5>{post.title}</h5>

                    <Row>
                      {AuthorDetails(post.author_id ? post.author_id : 0)}
                    </Row>
                    <p>{post.content}</p>
                    <Row>
                      <Col md={1}>
                        <h5>Category</h5>
                        <Tag>{post.category}</Tag>
                      </Col>
                      <Col style={{ marginLeft: "12px" }}>
                        <h5>Tags</h5>
                        <Row>
                          {post.tags.map((tag) => (
                            <Tag className="mr-1" key={tag}>
                              {tag}
                            </Tag>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            ))}
      </Container>
    </div>
  );
};
