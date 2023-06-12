import { Injectable } from "@nestjs/common";

import ToDoList, { IToDoList } from "./entities/todolist.entity";

@Injectable()
export default class ToDoListsRepository {
  get(): Promise<ToDoList[]> {
    const todoLists: ToDoList[] = TODO_LISTS.map(ToDoList.fromJson);
    return Promise.resolve(todoLists);
  }
}

export const TODO_LISTS: IToDoList[] = [
  { id: '1', title: 'Task 001', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', dueDate: null, createdAt: new Date(), updatedAt: null },
  { id: '2', title: 'Task 002', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sed voluptatem. Fugiat, ipsum alias', dueDate: null, createdAt: new Date(), updatedAt: null },
  { id: '3', title: 'Task 003', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', dueDate: null, createdAt: new Date(), updatedAt: null },
];