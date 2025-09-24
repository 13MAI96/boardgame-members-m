export class Map{
    columns!: Column[]
}

export class Column{
    places!: Place[]
    id!: string
    position!: number
}

export class Place{
    position!: number
    row!: number
    id!: string
    next_sailor: string | null = null
    next_pirate: string | null = null
    next_cult: string | null = null
    visited: boolean = false
    navigator: string | null = null
    actual: boolean = false
    action!: string
    color: string | null = null
}