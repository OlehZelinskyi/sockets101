import { useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "../useChat";

import "./Room.css";

const Room = () => {
  const { roomId } = useParams();

  const { messages, sendMessage } = useChat(roomId);

  const [newMessage, setNewMessage] = useState("");

  const handleSetNewMessage = (e) => {
    setNewMessage(e.currentTarget.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleSetNewMessage}
        placeholder="Enter your message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Room;
