import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const INITIAL_CHAT = gql`
  query {
    posts {
      author
      comment
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription {
    postAdded {
      author
      comment
    }
  }
`;

export default () => {
  const { subscribeToMore, loading, error, data } = useQuery(INITIAL_CHAT);

  useEffect(
    () =>
      subscribeToMore({
        document: SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.postAdded;
          console.log(newFeedItem);
          return {
            posts: [...prev.posts, newFeedItem]
          };
        }
      }),
    [subscribeToMore]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data.posts.map((val, idx) => (
        <div key={idx}>{`${val.author}:${val.comment}`}</div>
      ))}
    </div>
  );
};
