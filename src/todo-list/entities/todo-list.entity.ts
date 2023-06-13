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
