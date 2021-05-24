import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInterface } from './user-interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  searcht!: string;
  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });
  contador: number = 0;
  edit_id: number = 0;
  usuarios: Array<any> = [];

  constructor() {}

  ngOnInit(): void {}

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

  update(user: UserInterface) {
    let item: number = this.usuarios.findIndex(
      (element) => element.id === user.id
    );
    this.edit_id = user.id;
    this.profileForm.controls['name'].setValue(this.usuarios[item].name);
    this.profileForm.controls['city'].setValue(this.usuarios[item].city);
  }

  delete(user: UserInterface) {
    let i = this.usuarios.findIndex( usuarios => usuarios.id === user.id);
    this.usuarios.splice(i, 1);
  }
}
