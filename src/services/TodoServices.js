import axios from "axios";
import { DOMAIN, token } from "../contants/contants";

export class TodoService {
  add = (model) => {
    return axios({
      url: `${DOMAIN}/task`,
      method: "POST",
      data: {
        description: model,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  delete = (id) => {
    return axios({
      url: `${DOMAIN}/task/${id}`,
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  checkDoneTask = (id) => {
    return axios({
      url: `${DOMAIN}/task/${id}`,
      method: "PUT",
      data: {
        completed: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  getAllTask = (token) => {
    return axios({
      url: `${DOMAIN}/task`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  getAllTaskComplete = (token) => {
    return axios({
      url: `${DOMAIN}/task?completed=true`,
      method: "GET",
      data: {
        completed: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  edit = (model, id) => {
    return axios({
      url: `${DOMAIN}/task/${id}`,
      method: "PUT",
      data: {
        description: model,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
}

export const TodoListService = new TodoService();
