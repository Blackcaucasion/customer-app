import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerAdaptorService } from 'src/app/adaptor/customer-adaptor.service';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from '../customer.model';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddEditCustomerComponent implements OnInit ,OnDestroy {

  public selected="person";
  public $user!:Observable<Customer> ;
  public firstName =new FormControl('');
  public lastName =new FormControl('');
  public email =new FormControl('');
  public cellphone =new FormControl('');
  public total =new FormControl('');
  // create form FormGroup
  public customerForm = new FormGroup({
    firstName:this.firstName,
    lastName: this.lastName,
    email: this.email,
    cellphone:this.cellphone,
    total:this.total
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private customerService: CustomerAdaptorService,
  private changeDetection: ChangeDetectorRef

  ) { }

  public ngOnInit(): void {
// get user by id
    if(this.data?.id){
      this.$user = this.customerService.getCustomerById(this.data?.id).pipe(
        filter((user)=> Object.keys(user).length !== 0)
      )
  //  get user details to form
      this.$user.subscribe((user)=>{
        // console.log(user)
        this.customerForm.patchValue({
          firstName:user?.firstName,
          lastName:user?.surname,
          email:user?.email,
          cellphone:user?.cellphone,
          total:user?.totalAmount
              });
        this.changeDetection.detectChanges();
      })
    }

  }

  public save(){
    // execute if records not empty
    if(this.$user){
      // update customer
      this.$user.subscribe((user)=>{
        if(user.id){
          this.updateCustomer(user)}
          else
          {
          this.createCustomer();
        }
       
      })

    } else{
// add customer if records empty
   this.createCustomer()
    }

  }
  public deleteCustomer(id:any){
    this.customerService.deleteCustomer(id).subscribe(
      ()=>{
        Swal.fire({
          title: 'Succefully Deleted!',
          text: 'close and refresh web page',
          confirmButtonText: 'Confirm'
        })
      }
    );
  }

  public updateCustomer(user:Partial<Customer>){
    this.customerService.updateCustomer({
      id:user.id,
      firstName:this.firstName.value ||"",
      surname:this.lastName.value ||"",
      email:this.email.value||"",
      cellphone:this.cellphone.value||"",
      totalAmount:this.total.value||""
    }).subscribe(
    ()=>{
      Swal.fire({
        title: 'Succefully update!',
        text: 'close and refresh web page',
        confirmButtonText: 'Confirm'
      })
    }
    )
  }
  public createCustomer(){
    this.customerService.addCustomer({
      firstName:this.firstName.value ||"",
      surname:this.lastName.value ||"",
      email:this.email.value||"",
      cellphone:this.cellphone.value||"",
      totalAmount:this.total.value||""
          }).subscribe(
          () => {
            Swal.fire({
              title: 'Succefully created!',
              text: 'close and refresh web page',
              confirmButtonText: 'Cool'
            })
              console.log("The POST observable is now completed.");
          }
          )
  }

  closeDialog(){
    
  }
  ngOnDestroy(): void {
Subscription.EMPTY  }

}
