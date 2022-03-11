import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './global-handler-error/global-handler-error';
import { GlobalErrorComponent } from './global-error/global-error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NotFoundComponent,
    GlobalErrorComponent,
  ],
  providers:[
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler, // quando tiver um errorhandler vai usar um globalerrorhandler
    }
  ]
})
export class ErrorsModule { }
