import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'angular-tree-component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeExampleModule } from './custom-elements/code/code-example.module';
import { CustomElementsModule } from './custom-elements/custom-elements.module';
import { ExamplesModule } from './examples/examples.module';
import { FundamentalsModule } from './fundamentals/fundamentals.module';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { GuidesModule } from './guides/guides.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, GettingStartedComponent],
    bootstrap: [AppComponent], imports: [SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
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
        GuidesModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
