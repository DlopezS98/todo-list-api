import { Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

import ToDoList, { IToDoList } from "./entities/todo-list.entity";
import IBaseRepository from "src/shared/interfaces/ibase.repository";

@Injectable()
export default class ToDoListsRepository implements IBaseRepository {

  private readonly todoLists: IToDoList[] = TODO_LISTS;

  // @ts-ignore
  constructor(@InjectMapper() private readonly mapper: Mapper) { }

  getServerDate(): Promise<Date> {
    return Promise.resolve(new Date(Date.now()));
  }

  create(toDoList: IToDoList): Promise<ToDoList> {
    this.todoLists.push(toDoList);
    const entity: ToDoList = this.mapper.map(toDoList as ToDoList, ToDoList);
    return Promise.resolve(entity);
  }

  get(): Promise<ToDoList[]> {
    // self mapping
    // const todoLists: ToDoList[] = this.mapper.mapArray(this.todoLists, ToDoList, ToDoList);
    const todoLists: ToDoList[] = this.mapper.mapArray(this.todoLists as ToDoList[], ToDoList);
    return Promise.resolve(todoLists);
  }
}

export const TODO_LISTS: IToDoList[] = [
  { id: '1', title: 'Task 001', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', dueDate: null, createdAt: new Date(), updatedAt: null },
  { id: '2', title: 'Task 002', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, sed voluptatem. Fugiat, ipsum alias', dueDate: null, createdAt: new Date(), updatedAt: null },
  { id: '3', title: 'Task 003', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', dueDate: null, createdAt: new Date(), updatedAt: null },
];