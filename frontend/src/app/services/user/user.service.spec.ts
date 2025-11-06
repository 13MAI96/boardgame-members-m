import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { Auth0TestingModule } from "../../testing/auth0.testing.module";
import { AuthService } from "@auth0/auth0-angular";
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { User } from "../../models/user/user";
import { Subscription } from "rxjs";

describe('UserService', () => {
    let service: UserService;
    let auth: AuthService;
    let httpTesting: HttpTestingController
    let user!: User

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService,
                provideHttpClient(),
                provideHttpClientTesting()
            ],
            imports: [
                Auth0TestingModule,
            ]
        })
        service = TestBed.inject(UserService)
        auth = TestBed.inject(AuthService)
        httpTesting = TestBed.inject(HttpTestingController)
    });

    it('#getUsersList: should return a Subscription when users is empty', () => {
      expect(service.getUsersList()).toBeInstanceOf(Subscription);
    });
    it('#getUsersList: should return undefined when users have at least 1 object', () => {
      service.users$.next([new User({})])
      expect(service.getUsersList()).toBeUndefined();
    })

    it('#updateUser', () => {
      expect(service.updateUser(user)).toBeInstanceOf(Subscription)
    });

    it('#createUser', () => {
       expect(service.createUser('', user)).toBeInstanceOf(Subscription)
    });

  });