import {Component, Input, OnInit} from '@angular/core';
import {Payee} from '../../models/payee';
import {Account} from '../../models/account';

@Component({
  selector: 'app-transaction-review',
  templateUrl: './transaction-review.component.html',
  styleUrls: ['./transaction-review.component.css']
})
export class TransactionReviewComponent {
  @Input() fromAccount: Account;
  @Input() toPayee: Payee;
  @Input() fromCredit: string;
  @Input() toCredit: string;
  @Input() fromCurrency: string;
  @Input() toCurrency: string;
}
