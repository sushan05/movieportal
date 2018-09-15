import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    template: `
            <mat-card class="align-center">
                <div class="fs-20 w-300 mg-auto pd-b-3">
                    <span class="text-red">Oops! </span>
                    This is awkward.... You are looking for something that doesn't actually exists.
                </div>
                <div class="pd-b-3 pd-t-3">
                    <img class="br-radius-25" src="/assets/notfound.jpg" />
                </div>
                <div class="pd-b-3 pd-t-3">
                    <a routerLink="/movies" mat-raised-button>Back to home</a>
                </div>
            </mat-card>
    `,
    selector: 'mvi-notfound'
})
export class NotFoundComponent implements OnInit {
    constructor(private _titleService: Title ){
    }

    ngOnInit() {
        this._titleService.setTitle("404 Page Not Found");
    }
}