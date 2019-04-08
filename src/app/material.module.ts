import {NgModule} from '@angular/core';

import {MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {

}
