import { Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";

import ToDoListDto from "./dtos/todolist.dto";
import ToDoListsRepository from "./todo-lists.repository";
import ToDoList from "./entities/todolist.entity";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export default class ToDoListsService {
  constructor(
    // @ts-ignore
    @InjectMapper() private readonly mapper: Mapper,
    private readonly toDoListsRepository: ToDoListsRepository, 
  ) { }

  async get(): Promise<ToDoListDto[]> {
    const toDoListEntities = await this.toDoListsRepository.get();
    const toDoListDtos = this.mapper.mapArray(toDoListEntities, ToDoList, ToDoListDto);
    return toDoListDtos;
  }
}