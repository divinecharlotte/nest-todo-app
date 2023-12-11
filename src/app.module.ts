import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module'; // Assuming you have TasksModule
import { CategoriesModule } from './categories.module'; // Assuming you have CategoriesModule

@Module({
  imports: [TasksModule, CategoriesModule],
})
export class AppModule {}
