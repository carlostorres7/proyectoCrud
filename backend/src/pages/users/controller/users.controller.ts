import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getAll(){
        return this.usersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.usersService.getOne(id);
    }

    @Post()
    create(@Body() body: any){
        return this.usersService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string,@Body() body: any){
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.usersService.delete(id);
    } 
}
