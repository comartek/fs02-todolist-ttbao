import { notification } from "antd";

export const notificationTodo = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
};

export const notificationUser = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
};

export const notificaitonEmail = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
};
