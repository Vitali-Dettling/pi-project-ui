import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, 
        private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    help() {
        return this.http.get<any>(`${environment.apiUrl}/help`)
        .pipe(help => {
            // login successful if there's a jwt token in the response
            if (help) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('Parameter to choose: ', help);
            }

            return help;
        });
    }

    
    imageToShow: any;
    pic() {
        this.http.get(`${environment.apiUrl}/pic`, { responseType: 'blob' })
        .subscribe(image => {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                this.imageToShow = reader.result;
            }, false);
    
            if (image) {
                reader.readAsDataURL(image);
            }
        }, error => {
          console.log(error);
        });
    }

    video() {
        // this.socket.stop();
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}