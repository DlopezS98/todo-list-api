import * as uuid from "uuid";
import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap, forMember, mapFrom, undefinedSubstitution } from "@automapper/core";

import ToDoList from "../entities/todo-list.entity";
import ToDoListDto, { CreateToDoListDto } from "../dtos/todo-list.dto";
// import ToDoListsRepository from "../todo-lists.repository";

@Injectable()
export default class ToDoListProfile extends AutomapperProfile {
  // @ts-ignore
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ToDoList); // self mapping configuration
      createMap(
        mapper, ToDoList, ToDoListDto, 
        forMember((dest) => dest.lastUpdate, mapFrom((src) => (src.updatedAt ?? src.createdAt))),
        forMember((dest) => dest.dueDate, undefinedSubstitution(null))
      );
      createMap(mapper, ToDoListDto, ToDoList, forMember((dest) => dest.dueDate, undefinedSubstitution(null)));
      createMap(mapper, CreateToDoListDto, ToDoList, forMember((dest) => dest.id, mapFrom(() => uuid.v4())));
    };
  }
}