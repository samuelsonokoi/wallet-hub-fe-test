import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-root',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent {}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule,
		RouterModule.forRoot([
			{
				path: 'test-one',
				loadChildren: () =>
					import('./test-01').then((module) => module.Test01Module),
			},
			{
				path: 'test-two',
				loadChildren: () =>
					import('./test-02').then((module) => module.Test02Module),
			},
			{
				path: 'test-three',
				loadChildren: () =>
					import('./test-03').then((module) => module.Test03Module),
			},
			{
				path: 'test-four',
				loadChildren: () =>
					import('./test-04').then((module) => module.UserNameModule),
			},
			{
				path: 'test-five',
				loadChildren: () =>
					import('./test-05').then((module) => module.MainModule),
			},
			{
				path: 'test-six',
				loadChildren: () =>
					import('./test-06').then((module) => module.ReviewModule),
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'test-one',
			},
		]),
	],
	bootstrap: [AppComponent],
	providers: [{ provide: ErrorHandler, useClass: ErrorHandler }],
})
export class AppModule {}
