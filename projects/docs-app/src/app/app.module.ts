import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomElementsModule } from './custom-elements/custom-elements.module';
import { CodeExampleModule } from './custom-elements/code/code-example.module';
import { ExamplesModule } from './examples/examples.module';
import { TreeModule } from 'angular-tree-component';
import { FundamentalsModule } from './fundamentals/fundamentals.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, GettingStartedComponent],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    AppRoutingModule,
    CustomElementsModule,
    LayoutModule,
    CodeExampleModule,
    ExamplesModule,
    TreeModule,
    FundamentalsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
