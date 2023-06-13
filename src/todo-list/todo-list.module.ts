import { Module } from "@nestjs/common";
import ToDoListsRepository from "./todo-lists.repository";
import ToDoListProfile from "./profiles/todo-list.profile";
import ToDoListsService from "./todo-list.service";
import ToDoListController from "./todo-list.controller";

@Module({
  controllers: [ToDoListController],
  providers: [ToDoListProfile, ToDoListsRepository, ToDoListsService]
})
export default class ToDoListModule { }