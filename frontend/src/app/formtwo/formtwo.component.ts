import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InterfaceUser } from './interface-user';
import { TaskService } from "src/app/services/userstwo.service";


@Component({
  selector: 'app-formtwo',
  templateUrl: './formtwo.component.html',
  styleUrls: ['./formtwo.component.css']
})
export class FormtwoComponent implements OnInit {
  fileForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
  });

  usuarios: Array<any> = [];

  constructor(private readonly TaskService: TaskService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.TaskService.getAll().subscribe(val => this.usuarios = val)
  }

  onSubmitA(){
    console.log(this.fileForm.value)
    if (this.fileForm.valid) {
      if (this.fileForm.value.id === 0) {
        this.TaskService.create(this.fileForm.value).subscribe(
          val => {
            console.log('task create', val)
            this.getAll()
          },
          err => console.log('el usuario no se pudo crear', err)
        )
      } else {
        this.TaskService.update(this.fileForm.value.id, this.fileForm.value).subscribe(val => {
          console.log(val)
          this.getAll()
        })
      }
      this.fileForm.reset();
      this.fileForm.controls['id'].setValue(0)
    }
  }

  updateA(user: InterfaceUser) {
    console.log(user);
    this.fileForm.controls['id'].setValue(user.id)
    this.fileForm.controls['name'].setValue(user.name);
   
  }

  deleteA(id: string){
    this.TaskService.delete(id).subscribe(val => {
      console.log(val)
      this.getAll()
    })

  }
}
