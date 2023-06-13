import { Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";

import ToDoList from "./entities/todo-list.entity";
import ToDoListsRepository from "./todo-lists.repository";
import ToDoListDto, { CreateToDoListDto } from "./dtos/todo-list.dto";

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
    toDoListEntity.createdAt = await this.toDoListsRepository.getServerDate();
    await this.toDoListsRepository.create(toDoListEntity.toDomain());
    const toDoListDto: ToDoListDto = this.mapper.map(toDoListEntity, ToDoList, ToDoListDto);
    return toDoListDto;
  }
}