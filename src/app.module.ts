import { Module } from '@nestjs/common';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CamelCaseNamingConvention } from '@automapper/core';
import ToDoListModule from './todo-list/todo-list.module';

@Module({
  imports: [
    AutomapperModule.forRoot({ 
      strategyInitializer: classes(), 
      namingConventions: new CamelCaseNamingConvention()
    }),
    ToDoListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
