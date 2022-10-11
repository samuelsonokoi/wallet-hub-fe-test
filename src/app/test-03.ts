/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'ng-app',
	template: `<form>
		<h2>Login</h2>
		<br />
		<input type="email" [(ngModel)]="email" value="" name="email" />
		<br />
		<small *ngIf="invalidEmail">Email is invalid.</small>
		<br />
		<input type="password" [(ngModel)]="password" value="" name="password" />
		<br />
		<small *ngIf="weakPassword">Password is too weak.</small>
		<br />
		<button type="submit" (click)="onSubmit($event)">Submit</button>
		<br /><br />
		<div *ngIf="logged_in">Logged In!</div>
	</form>`,
})
/**
 * Test03 Component
 * email {string}.
 * password {string}
 * invalidEmail {boolean}
 * weakPassword {boolean}
 * logged_in {boolean}
 * onSubmit {function} - manage form submission and login logic
 * resetFields {function} - reset fields after successful login
 */
export class Test03Component {
	email: string = '';
	password: string = '';
	invalidEmail = false;
	weakPassword = false;
	logged_in = false;

	onSubmit = (e: any) => {
		e.preventDefault();

		let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
		let passwordRegex = new RegExp(
			'^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,}$',
		);
		let validEmail = this.email.match(emailRegex);
		let validPassword = this.password.match(passwordRegex);

		if (validEmail === null) {
			this.invalidEmail = true;
		}

		if (validPassword === null) {
			this.weakPassword = true;
		}

		if (validEmail && validPassword) {
			this.logged_in = true;
			this.resetFields();
		}
	};

	resetFields = () => {
		this.email = '';
		this.password = '';
		this.invalidEmail = false;
		this.weakPassword = false;
	};
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: Test03Component,
			},
		]),
	],
	declarations: [Test03Component],
})
export class Test03Module {}
