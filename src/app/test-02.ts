/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import {
	Component,
	EventEmitter,
	Input,
	NgModule,
	Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'textfield',
	template: `
		<input
			type="text"
			[(ngModel)]="field"
			(ngModelChange)="emitNewValue($event)"
		/>
	`,
})
/**
 * TextField Component
 * title {string} - Passed from parent.
 * field {string}
 * fieldChange {EventEmitter}
 * emitNewValue {function} - Assign and emit new value to parent.
 */
export class TextField {
	@Input() field = '';
	@Output() fieldChange = new EventEmitter<string>();

	emitNewValue(newValue) {
		this.field = newValue;
		this.fieldChange.emit(this.field);
	}
}

@Component({
	selector: 'child-component',
	template: `<h2>
		Title:
		<h2>
			<br /><textfield
				[(field)]="title"
				(fieldChange)="emitNewTitle($event)"
			></textfield>
		</h2>
	</h2>`,
})
/**
 * Child Component
 * title {string} - Passed from parent.
 * titleChange {EventEmitter}
 * emitNewTitle {function} - Assign and emit new value to parent.
 */
export class ChildComponent {
	@Input() title: string;
	@Output() titleChange = new EventEmitter<string>();

	emitNewTitle(newValue) {
		this.title = newValue;
		this.titleChange.emit(this.title);
	}
}

@Component({
	selector: 'ng-app',
	template: `<div>
		<child-component
			[(title)]="title"
			(titleChange)="updateTitle($event)"
		></child-component>
		<br />
		Title is {{ title }}
	</div>`,
})
/**
 * Test02 Component
 * title {string}
 * updateTitle {function} - Update new title value gotten from child.
 */
export class Test02Component {
	title: string = '';

	updateTitle(newValue) {
		this.title = newValue;
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: Test02Component,
			},
		]),
	],
	declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
