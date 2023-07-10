import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AttachmentFinderButtonComponent } from './components/buttons/attachment-finder-button/attachment-finder-button.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AttachmentFinderModalComponent } from './components/modals/attachment-finder-modal/attachment-finder-modal.component';
import { ModalStepComponent } from './components/modals/attachment-finder-modal/modal-step/modal-step.component';
import { StepCardComponent } from './components/modals/attachment-finder-modal/modal-step/step-card/step-card.component';
import { ProductCardComponent } from './components/modals/attachment-finder-modal/modal-step/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AttachmentFinderButtonComponent,
    AttachmentFinderModalComponent,
    ModalStepComponent,
    StepCardComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
