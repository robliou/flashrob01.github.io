import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "reactstrap";

import Post from "./Post";

const Posts = () => {
  const [posts, getPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let results = await axios.get(
        "https://public-api.wordpress.com/wp/v2/sites/robliou.wordpress.com/posts/17"
      );
      getPosts(results.data);
    };
    fetchPosts();
  }, []);

  const data = posts.map((post) => <Post post={post} key={post.id} />);

  console.log(posts);

  return (
    <div>
      <Container>
        <Row className="mt-4">{data}</Row>
        <Row></Row>
      </Container>
    </div>
  );
};

export default Posts;
