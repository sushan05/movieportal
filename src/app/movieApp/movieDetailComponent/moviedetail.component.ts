import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/mvi.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'movie-detail',
    templateUrl: './moviedetail.component.html'
})
export class MovieDetailComponent implements OnInit {

    mviData;
    compareTemplateOn = false;
    @Input() set mviId(value){
        this.compareTemplateOn = true;
        this.getMovieData(value);
    };
    constructor(private _actRoute : ActivatedRoute, private _mviService: MovieService, private _titleService: Title ){}

    ngOnInit() {
        this._actRoute.params
                    .subscribe(paramData => {
                        if(paramData['id']){
                            this.getMovieData(paramData['id']);
                        }
                    })
    }

    getMovieData(mviId){
        this._mviService.getMovie(mviId)
                        .subscribe(data => {
                            this.mviData = data;

                            if(this.mviData['_id']) this._titleService.setTitle(this.mviData['title']);
                        });
    }

}