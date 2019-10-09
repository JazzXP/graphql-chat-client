import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_POST = gql`
  mutation AddPost($author: String!, $comment: String!) {
    addPost(author: $author, comment: $comment) {
      author
      comment
    }
  }
`;

export default props => {
  let name, comment;
  const [addPost] = useMutation(ADD_POST);
  return (
    <div className="AddChat">
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost({
            variables: { author: name.value, comment: comment.value }
          });
          comment.value = "";
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          ref={node => {
            name = node;
          }}
        />
        <br />
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          name="comment"
          id="comment"
          ref={node => {
            comment = node;
          }}
        />
        <br />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
