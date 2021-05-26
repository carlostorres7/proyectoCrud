import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from "./form/form.component";
import { FormtwoComponent} from "./formtwo/formtwo.component";

const routes: Routes = [
  {
    path: 'form', 
    component: FormComponent
  },
  {
    path: 'formtwo',
    component: FormtwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
