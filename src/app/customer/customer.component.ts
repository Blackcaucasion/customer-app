import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort,Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatDialog} from '@angular/material/dialog';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { CustomerAdaptorService } from '../adaptor/customer-adaptor.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  public columns:any;
 // use MatTableDataSource  for its filtering capability 
  public dataSource = new MatTableDataSource();
  public displayedColumns = ["cellphone","firstName","surname","email","action"];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer ,public dialog: MatDialog ,private customerService: CustomerAdaptorService) { }

  public ngOnInit(): void {
// add data source
  this.customerService.getCustomers().subscribe((data)=>{
    this.dataSource.data =data;
  })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: any) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

    openDialog() {
      this.dialog.open(AddEditCustomerComponent,{
        width:'1000px',
      });
    }
 
    openDialogToUpdate(id:number) {
      this.dialog.open(AddEditCustomerComponent,{
        width:'1000px',
        data:{id:id}
      });
    }
    public removeCustomer(id:number){
      this.customerService.deleteCustomer(id).subscribe();

    }
}
