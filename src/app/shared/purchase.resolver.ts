import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase, ShoppingService } from './services/shopping.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseResolver implements Resolve<Purchase> {

  constructor(private shoppingService: ShoppingService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Purchase | Observable<Purchase> | Promise<Purchase> {
    const item = this.shoppingService.getItem(+route.paramMap.get('id'));
    if (!item) return null;
    return item;
  }
}
