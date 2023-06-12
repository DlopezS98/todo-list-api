import { AutoMap } from "@automapper/classes";

export default class ToDoListDto {
  @AutoMap()
  id: string = '';
  @AutoMap()
  title: string = '';
  @AutoMap()
  description: string = '';
  @AutoMap()
  dueDate: Date | null = null;
  @AutoMap()
  createdAt: Date = new Date();
  @AutoMap()
  updatedAt: Date | null = null;

  lastUpdate!: Date;
}

export class CreateToDoList {
  title = '';
  description = '';
  dueDate: Date | null = null;
}
