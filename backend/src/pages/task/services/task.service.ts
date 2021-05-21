import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ){}

  create(body: any) {
    return this.taskRepository.save(body)
  }

  findAll() {
    return this.taskRepository.find()
  }

  findOne(id: number) {
    return this.taskRepository.findOne(id)
  }

  async update(id: number, body: any) {
    const user = await this.taskRepository.findOne(id);
    this.taskRepository.merge(user, body)
    return this.taskRepository.save(user);
  }

  remove(id: number) {
    return this.taskRepository.delete(id)
  }
}
