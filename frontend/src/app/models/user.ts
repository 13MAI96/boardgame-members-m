import {User as AuthUser} from '@auth0/auth0-angular';

export class User{
    _id?: string
    sub?: string
    name?: string;
    role?: 'Player' | 'Shop' | 'Cafe' | 'Influencer'
    lng?: number
    lat?: number
    telegram_user?: string
    updatedAt?: Date

    constructor(user: User){
        this._id = user._id ?? ''
        this.sub = ''
        this.name = user.name ?? ''
        this.role = user.role ?? 'Player'
        this.lat = user.lat ?? 0
        this.lng = user.lng ?? 0
        this.telegram_user = user.telegram_user
        this.updatedAt = user.updatedAt
    }
}

export class FullUser extends User{
    email: string
    picture: string

    constructor(user: User, authUser: AuthUser){
        super(user);
        this.email = authUser.email ?? '';
        this.picture = authUser.picture ?? '';
        this.sub = authUser.sub ?? '';
    }

    updateFromApi(user: User){
        this.name = user.name;
        this.role = user.role;
        this.lat = user.lat;
        this.lng = user.lng;
        this.telegram_user = user.telegram_user;
        this._id = user._id;
        this.updatedAt = user.updatedAt
        return this;
    }

    updateFromAuth(authUser: AuthUser){
        this.email = authUser.email ?? '';
        this.picture = authUser.picture ?? '';
        this.sub = authUser.sub ?? '';
        return this;
    }
}