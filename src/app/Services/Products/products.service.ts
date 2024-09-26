import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _http = inject(HttpClient)

  products = 'https://dummyjson.com/products';

  showProducts(): Observable<any> {
    return this._http.get(this.products);
  }
}
