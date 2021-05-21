import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Data } from "src/database/connection";


@Injectable()
export class UsersService {

    client: Client;

    getAll(){
        return this.run('select * from users order by id')
    }

    getOne(id: string) {
        return this.run(`select * from users where id = ${id}`)
    }

    create(body: any){
        const { name, city } = body;
        const query = `insert into users (name, city) values ('${name}','${city}') returning id`;
        return this.run(query)
    }

    update(id: string,body: any){
        const { name, city } = body;
        const query = `update users set name = '${name}', city = '${city}', updatedat = now() where id = ${id} returning *`;
        return this.run(query)
    }

    delete(id: string){
        return this.run(`delete from users where id = ${id}`)
    }

    async run(query: string ){
        this.client = new Client(Data);
        this.client.connect();
        try {
            return await this.client.query(query)
                .then(val => val.rows)
                .catch(err => {
                    throw new HttpException(err.stack, HttpStatus.NOT_FOUND);
                })
        } catch (error) {
            throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            this.client.end();
        }
    }
}
