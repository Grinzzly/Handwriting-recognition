import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './app.component';

import {DrawableDirective} from './drawable.directive';
import {ChartComponent} from './chart/chart.component';

@NgModule({
    declarations: [
        AppComponent,
        ChartComponent,
        DrawableDirective
    ],
    imports: [
        BrowserModule,
        ChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
