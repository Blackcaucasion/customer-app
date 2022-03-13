import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {CustomerComponent } from './customer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule
    
    
  ],
  declarations: [CustomerComponent],
  entryComponents:[CustomerComponent],
  exports:[CustomerComponent]

})
export class CustomerModule { }
