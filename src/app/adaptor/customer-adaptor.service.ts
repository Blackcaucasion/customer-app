import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import{shareReplay, catchError} from "rxjs/operators";
import { throwError, pipe } from 'rxjs';
import { Customer } from '../customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerAdaptorService {
  public  baseUrl:string ="https://localhost:7031/api/Customers";

 

  constructor(private http :HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public getCustomers(){
    return this.http.get<Customer[]>(this.baseUrl).pipe(
      shareReplay(),
      catchError(this.handleError)
    )

  }
  public getCustomerById(id:any){
    return this.http.get<Customer>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError(this.handleError)

    )
  }
  public addCustomer(customer?:Partial<Customer>){
    return this.http.post<Customer>(this.baseUrl,{
      "firstName":customer?.firstName,
      "surname":customer?.surname,
      "email":customer?.email,
      "cellphone":customer?.cellphone,
      "totalAmount":customer?.totalAmount
          }).pipe(
  shareReplay(),
  catchError(this.handleError)
          )
  }
  public updateCustomer(customer?:Partial<Customer>){
    return this.http.put<Customer>(`${this.baseUrl}/${customer?.id}`,{
      "id":customer?.id,
      "firstName":customer?.firstName,
      "surname":customer?.surname,
      "email":customer?.email,
      "cellphone":customer?.cellphone,
      "totalAmount":customer?.totalAmount
          }).pipe(
            shareReplay(),
            catchError(this.handleError)

          )
  }
  public deleteCustomer(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
