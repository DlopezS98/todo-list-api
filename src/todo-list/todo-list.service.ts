import { Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";

import ToDoListDto, { CreateToDoListDto } from "./dtos/todo-list.dto";
import ToDoListsRepository from "./todo-lists.repository";
import ToDoList from "./entities/todo-list.entity";
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

  async create(creationalDto: CreateToDoListDto): Promise<ToDoListDto> {
    const toDoListEntity: ToDoList = this.mapper.map(creationalDto, CreateToDoListDto, ToDoList);
    await this.toDoListsRepository.create(toDoListEntity.toDomain());
    const toDoListDto: ToDoListDto = this.mapper.map(toDoListEntity, ToDoList, ToDoListDto);
    return toDoListDto;
  }
}