/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page
 */
import { Component, HostListener, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'ng-app',
	template: `
		<h2>User Review:</h2>
		<textarea
			class="textfield"
			placeholder="Write your Review"
			[value]="review_input"
			[(ngModel)]="review_input"
			(ngModelChange)="replaceLinksWithHtmlElement()"
		></textarea>
		<br /><br />
		<h3>Output:</h3>
		<div class="output" [innerHTML]="review_content"></div>
	`,
	styles: [
		`
			.textfield {
				width: 600px;
				height: 220px;
				padding: 10px;
				box-sizing: border-box;
			}
		`,
		`
			.output {
				max-width: 100%;
				width: 600px;
				border: solid 1px #f9f6f6;
				padding: 5px;
				background: #ecebeb;
				white-space: pre-wrap;
			}
		`,
	],
})
export class ReviewComponent {
	// sample input
	review_input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec. 

Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
          1) Nulla et tempus orci
          2) Integer semper porttitor faucibus
          
At https://wallethub.com <b>bolded text</b>`;

	review_content = '';

	ngOnInit() {
		this.replaceLinksWithHtmlElement();
	}

	// find all links in the text and replace them with an anchor element
	replaceLinksWithHtmlElement = () => {
		this.review_content = this.review_input;
		var linkReg =
			/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
		const links = this.review_content.match(linkReg);
		links?.map((link) => {
			this.review_content = this.review_content.replace(
				new RegExp(link, 'g'),
				`<a href="${link}" target="_blank">${link}</a>`,
			);
		});
	};
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{
				path: '',
				component: ReviewComponent,
			},
		]),
	],
	declarations: [ReviewComponent],
})
export class ReviewModule {}
