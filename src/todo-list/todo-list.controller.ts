import { Controller, Get } from "@nestjs/common";
import ToDoListDto from "./dtos/todolist.dto";
import ToDoListsService from "./todo-list.service";

@Controller('todo-list')
export default class ToDoListController {
  constructor(private readonly toDoListsService: ToDoListsService) {}

  @Get('')
  getAll(): Promise<ToDoListDto[]> {
    return this.toDoListsService.get();
  }
}