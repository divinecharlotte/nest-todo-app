import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Task {
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: TaskStatus;
  @ApiProperty()
  categoryId: string;

  constructor(title: string, description: string, categoryId: string) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
    this.categoryId = categoryId;
  }
}
