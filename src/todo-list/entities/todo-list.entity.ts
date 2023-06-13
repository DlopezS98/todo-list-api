import { AutoMap } from "@automapper/classes";

export interface IToDoList {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export default class ToDoList implements IToDoList {
  @AutoMap()
  id: string = '';
  @AutoMap()
  title: string = '';
  @AutoMap()
  description: string = '';
  @AutoMap()
  dueDate!: Date | null;
  @AutoMap()
  createdAt!: Date;
  @AutoMap()
  updatedAt: Date | null = null;
  
  static fromJson(todoList: IToDoList) {
    const entity = new ToDoList();
    entity.id = todoList.id;
    entity.title = todoList.title;
    entity.description = todoList.description;
    entity.dueDate = todoList.dueDate;
    entity.createdAt = todoList.createdAt;
    entity.updatedAt = todoList.updatedAt;

    return entity;
  }

  toDomain(): IToDoList {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
