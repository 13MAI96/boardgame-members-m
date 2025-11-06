// auth0-testing.module.ts
import { NgModule } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { UserService } from '@/app/services/user/user.service';
import { User } from '@/app/models/user/user';

@NgModule({
  providers: [
    {
      provide: UserService,
      useValue: {
            userData$: new BehaviorSubject(new User({
                _id: '',
                sub: '', 
                name: '',
                role: 'Player',
                lat: 0,
                lng: 0,
                telegram_user: '',
                updatedAt: new Date()
            })),
            users$: of([]),
            getUserData: () => {},
            createUser: (token: string, new_user: User) => {},
            updateUser: (new_user: User) => {},
            getUsersList: () => {}
      }
    }
  ]
})
export class UserTestingService {}
