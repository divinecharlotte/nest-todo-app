import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Category {
  id: string;
  @ApiProperty()
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}
