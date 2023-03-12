import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogic";
import { ChatState } from "../../context/ChatProvider";

const ScrollableChat = ({ message }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {message &&
        message.map((m, i) => {
          return (
            <div key={m._id} style={{ display: "flex" }}>
              {(isSameSender(message, m, i, user.id) ||
                isLastMessage(message, m, i, user.id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow>
                  <Avatar
                    name={m.sender.name}
                    src={m.sender.pic}
                    cursor="pointer"
                    size={"sm"}
                    mr={1}
                    mt={"7px"}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user.id ? "pink" : "teal"
                  }`,
                  marginTop: isSameUser(message, m, i, user.id) ? 2 : 5,
                  marginLeft: isSameSenderMargin(message, m, i, user.id),
                  borderRadius: "20px",
                  maxWidth: "75%",
                  padding: "5px 15px",
                }}>
                {m.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
