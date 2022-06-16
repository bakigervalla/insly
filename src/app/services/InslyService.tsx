import http from "./api";
import { IFieldsData, IUserData } from "./types";

const getAll = () => {
  return http.get<Array<IFieldsData>>("/tutorials");
};

const get = (id: any) => {
  return http.get<IFieldsData>(`/tutorials/${id}`);
};

const create = (data: IUserData) => {
  return http.post<IUserData>("/tutorials", data);
};

const update = (id: any, data: IFieldsData) => {
  return http.put<any>(`/tutorials/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tutorials`);
};

const findByTitle = (title: string) => {
  return http.get<Array<IFieldsData>>(`/tutorials?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
export default TutorialService;
