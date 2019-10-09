import React from 'react';

export default (props) => {
    return (
        <div className="AddChat">
            <label for="name">Name:</label><input type="text" name="name" id="name" /><br />
            <label for="comment">Comment:</label><input type="text" name="comment" id="comment" /><br />
            <button>Send</button>
        </div>
    )
}