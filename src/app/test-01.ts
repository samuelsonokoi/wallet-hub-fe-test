/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'ng-app',
	styles: [
		`
			label {
				margin-right: 1rem;
			}
		`,
	],
	template: `<div>
		<h2>Loan Details</h2>
		<label for="loan-amount">Enter Loan Amount: </label>
		<input type="number" id="loan-amount" [(ngModel)]="loan_amount" />
		<br /><br />
		<b>Monthly Payment:</b>
		{{
			loan_amount ? (monthly_payment | currency: '$':'symbol':'1.0-2') : 'N/A'
		}}
		<br />
		<b
			>Late Payment Fee :
			{{
				loan_amount ? (late_payment | currency: '$':'symbol':'1.0-2') : 'N/A'
			}}</b
		>
		<br />
	</div>`,
})
export class Test01Component {
	loan_amount?: number = 100;

	get monthly_payment() {
		return (100 * 2) / this.loan_amount;
	}

	get late_payment() {
		return (100 * 5) / this.loan_amount;
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: Test01Component,
			},
		]),
	],
	declarations: [Test01Component],
})
export class Test01Module {}
