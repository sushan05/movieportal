import { Component } from '@angular/core';

@Component({
    template : `<mvi-header></mvi-header>
                <div class="container">
                    <router-outlet></router-outlet>
                </div>`,
    selector: 'mvi-component'
})
export class MovieComponent{
}