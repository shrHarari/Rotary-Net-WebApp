import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RolesModule } from './roles/roles.module';

import { MessagesComponent } from './messages/messages.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RolesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    AreasListComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
