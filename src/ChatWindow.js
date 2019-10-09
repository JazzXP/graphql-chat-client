import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';

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

export default (props) => {
    const { loading, error, data } = useSubscription(SUBSCRIPTION);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    let newData = [];

    useEffect(() => {
        if (!loading) {
            newData.push(data.postAdded)
        }
    }, [loading, data, newData])

    return (
        <div className="ChatWindow">
            { newData.map(({ author, comment }, idx) => (
                <div key={idx}>
                    {`${author}: ${comment}`}
                </div>
            ))}
        </div>
    )
}