import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Purchase } from '../../shared/purchase';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  purchases: Purchase[]; 
  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    let client_id = JSON.parse(localStorage['CurrentClient'])['client_id'];
    this.cartService.getPurchases(client_id).subscribe((res) => {
      this.purchases = res['purchases'];
      console.log(this.purchases);
    });
  }

  startPurchase() {
    }

  purchase() {
  }

}
