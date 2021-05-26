import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInterface } from './user-interface';
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  searcht!: string;
  profileForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });
  contador: number = 0;
  edit_id: number = 0;
  usuarios: Array<any> = [];

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.usersService.getAll().subscribe(val => this.usuarios = val)
  }

  get controls() {
    return this.profileForm.controls;
  }

  onSubmitReactive() {
    if (this.profileForm.valid) {
      let name = this.profileForm.value.name;
      let city = this.profileForm.value.city;

      if (this.edit_id > 0) { //actualiza
        let id = this.edit_id;
        this.edit_id = 0;
        let user: UserInterface = {
          id,
          name,
          city,
        };
        let item: number = this.usuarios.findIndex(
          (element) => element.id === user.id
        );
        this.usuarios[item].name = user.name;
        this.usuarios[item].city = user.city;
      } else { //crea
        let id = this.contador + 1;
        let user: UserInterface = {
          id,
          name,
          city,
        };
        this.usuarios.push(user);
        this.contador++;
      }
    }
    this.profileForm.reset();
    console.log(this.usuarios);
  }

  onSubmitS() {
    console.log(this.profileForm.value)
    if (this.profileForm.valid) {
      if (this.profileForm.value.id === 0) {
        this.usersService.create(this.profileForm.value).subscribe(
          val => {
            console.log('user create', val)
            this.getAll()
          },
          err => console.log('el usuario no se pudo crear', err)
        )
      } else {
        this.usersService.update(this.profileForm.value.id, this.profileForm.value).subscribe(val => {
          console.log(val)
          this.getAll()
        })
      }
      this.profileForm.reset();
      this.profileForm.controls['id'].setValue(0)
    }
  }

  update(user: UserInterface) {
    let item: number = this.usuarios.findIndex(
      (element) => element.id === user.id
    );
    this.edit_id = user.id;
    this.profileForm.controls['name'].setValue(this.usuarios[item].name);
    this.profileForm.controls['city'].setValue(this.usuarios[item].city);
  }

  updateS(user: UserInterface) {
    console.log(user);
    this.profileForm.controls['id'].setValue(user.id)
    this.profileForm.controls['name'].setValue(user.name);
    this.profileForm.controls['city'].setValue(user.city);
  }

  delete(user: UserInterface) {
    let i = this.usuarios.findIndex(usuarios => usuarios.id === user.id);
    this.usuarios.splice(i, 1);
  }

  deleteS(id: string) {
    this.usersService.delete(id).subscribe(val => {
      console.log(val)
      this.getAll()
    })
  }
}
