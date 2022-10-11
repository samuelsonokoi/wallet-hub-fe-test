/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'ng-app',
	template: `
		<h2>Enter your first and last name</h2>
		<input
			type="text"
			[(ngModel)]="firstName"
			placeholder="First Name"
			(focusout)="getUsername()"
		/>
		<br /><br />
		<input
			type="text"
			[(ngModel)]="lastName"
			placeholder="Last Name"
			(focusout)="getUsername()"
		/>
		<br />
		<br />
		<div *ngIf="username">Your username is {{ username }}</div>
	`,
	styles: [],
})
export class UserNameComponent {
	firstName: string;
	lastName: string;
	username: string;

	getUsername = () => {
		if (this.firstName === '' && this.lastName === '') {
			return;
		}

		this.username = `${this.firstName.toLowerCase().trim()}_${this.lastName
			.toLowerCase()
			.trim()}_${Math.floor(Math.random() * (9 - 1) + 1)}`;
	};
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: UserNameComponent,
			},
		]),
	],
	declarations: [UserNameComponent],
})
export class UserNameModule {}
