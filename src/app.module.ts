import { Module } from '@nestjs/common';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CamelCaseNamingConvention } from '@automapper/core';

@Module({
  imports: [
    AutomapperModule.forRoot({ 
      strategyInitializer: classes(), 
      namingConventions: new CamelCaseNamingConvention()
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
