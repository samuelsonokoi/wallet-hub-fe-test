/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';

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
		<input
			type="number"
			id="loan-amount"
			[(ngModel)]="loan_amount"
			(ngModelChange)="onValueChanged()"
		/>
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
	loan_amount: number = 1000;
	monthly_payment: number | string = 200;
	late_payment: number | string = 10;

	onValueChanged = () => {
		this.monthly_payment = (100 * 2) / this.loan_amount;
		this.late_payment = (100 * 5) / this.loan_amount;
	};
}

@NgModule({
	imports: [
		SharedModule,
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
