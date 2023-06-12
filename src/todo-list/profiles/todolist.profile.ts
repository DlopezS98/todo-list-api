import { Injectable } from "@nestjs/common";
import { Mapper, MappingProfile, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";

import ToDoListDto from "../dtos/todolist.dto";
import ToDoList from "../entities/todolist.entity";

@Injectable()
export default class ToDoListProfile extends AutomapperProfile {
  // @ts-ignore
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper)
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ToDoList, ToDoListDto, forMember((dest) => dest.lastUpdate, mapFrom((src) => (src.updatedAt ?? src.createdAt))))
    };
  }
}