export class CreateUserDto{
    sub: string
    name: string
    role: 'Player' | 'Shop' | 'Cafe' | 'Influencer'
    lng: number
    lat: number
    telegram_user: string
    has_location_opened: boolean
}