import { Body, Controller, Get, Post } from "@nestjs/common";
import ToDoListDto, { CreateToDoListDto } from "./dtos/todo-list.dto";
import ToDoListsService from "./todo-list.service";

@Controller('todo-list')
export default class ToDoListController {
  constructor(private readonly toDoListsService: ToDoListsService) {}

  @Get('')
  getAll(): Promise<ToDoListDto[]> {
    return this.toDoListsService.get();
  }

  @Post('')
  create(@Body() toDoListDto: CreateToDoListDto): Promise<ToDoListDto> {
    return this.toDoListsService.create(toDoListDto);
  }
}