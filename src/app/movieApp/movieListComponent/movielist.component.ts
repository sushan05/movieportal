import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/mvi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl : './movielist.component.html'
})
export class MovieListComponent implements OnInit{

    movieData;
    years : Array<Number> = [];
    languages: Array<String> = [];
    selectedYear: string;
    selectedFilterOptions = {};
    moviesToCompare = {};
    movieSelection = {};
    movieSelectionArray;
    selectedYearOption;
    compareCount;
    compareToolTip;
    showCompare = false;

    constructor(
                private _mviService: MovieService,
                private _actRoutes: ActivatedRoute, 
                private _router: Router,
                public _snackBar: MatSnackBar,
                private _titleService: Title
            ){}

    ngOnInit(){
        this._titleService.setTitle("Movies");

        this._actRoutes.queryParams.subscribe(queryData => {
            this.selectedFilterOptions['year'] = parseInt(queryData['year']);
            this.selectedFilterOptions['language'] = queryData['language'];
            this.getMovieList(queryData['year'], queryData['language']);
        })
    }

    filterChanged(value, filterName){
        let newFilter = {};

        if(filterName == 'year'){
            value ? newFilter['year'] = value : '';
            this.selectedFilterOptions['language'] ? newFilter['language'] = this.selectedFilterOptions['language'] : '';
        }else{
            value ? newFilter['language'] = value : '';
            this.selectedFilterOptions['year'] ? newFilter['year'] = this.selectedFilterOptions['year'] : '';
        }

        this._router.navigate([], {queryParams : newFilter})
    }

    getMovieList(yearFilter?, langFilter?){
        this._mviService.getMovies(yearFilter, langFilter)
                        .subscribe(data => {
                            this.movieData = data;

                            this.movieData.forEach(element => {
                                this.years.includes(parseInt(element.year)) ? '' : this.years.push(parseInt(element.year));
                                this.languages.includes(element.language) ? '' :this.languages.push(element.language);
                            });
                        });
    }

    compareMovies(){
        if(!this.compareCount){
            this.openSnackBar("Select at least a movie to compare!!", "");
            return
        }

        this.showCompare = true;
    }

    compareSelection(e, mviId, mviDetails){

        if(e.checked){
            if(this.movieSelectionArray && this.movieSelectionArray.length === 3)
            {
                this.openSnackBar("Maximum of 3 movies can be compared at a time", "");
                this.moviesToCompare[mviId] = false;
                return;
            }
            this.movieSelection[mviId] = mviDetails
        }else{
            delete this.movieSelection[mviId];
        }

        this.compareCount = Object.keys(this.movieSelection).length;
        this.compareToolTip = '';

        for (const key in this.movieSelection) {
            if (this.movieSelection.hasOwnProperty(key)) {
                this.compareToolTip += this.compareToolTip ? ', ' + this.movieSelection[key]['title'] : this.movieSelection[key]['title'];
            }
        }

        this.movieSelectionArray = Object.values(this.movieSelection);
        console.log(this.compareToolTip, this.movieSelection);
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 3000,
        });
    }

    clearSelections(){
        this.compareToolTip = '';
        this.moviesToCompare = {};
        this.movieSelection = {};
        this.compareCount = 0;
        this.movieSelectionArray = [];
    }
}