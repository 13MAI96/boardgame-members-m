export class Technology{
    name!: string
    logo!: string

    constructor(name: string, logo: string | null = null){
        this.name = name;
        this.logo = `./assets/technologies/${logo ? logo : name + '.svg'}`
    }
}

export const Technologies: Record<string, Technology> = {
    ANGULAR: new Technology('angular'),
    APACHE:{name:'apache', logo: './assets/technologies/apache.svg'},
    DISCORD: {name: 'discord', logo:'./assets/technologies/discord.svg'},
    DOCKER:{name:'docker', logo: './assets/technologies/docker.svg'},
    FIGMA:{name:'figma', logo: './assets/technologies/figma.svg'},
    GMAIL: new Technology('gmail'),
    JAVASCRIPT: {name:'javascript', logo: './assets/technologies/javascript.svg'},
    JIRA:{name:'jira', logo: './assets/technologies/jira.svg'},
    MIRO:{name:'miro', logo: './assets/technologies/miro.svg'},
    MONDAY:{name:'monday', logo: './assets/technologies/monday.svg'},
    NODE:{name:'node', logo: './assets/technologies/node.svg'},
    PHP:{name:'php', logo: './assets/technologies/php.svg'},
    POSTMAN:{name:'postman', logo: './assets/technologies/postman.svg'},
    PYTHON:{name:'python', logo: './assets/technologies/python.svg'},
    RABBITMQ: new Technology('rabbitmq'),
    SLACK: new Technology('slack'),
    TEAMS:{name:'teams', logo: './assets/technologies/teams.svg'},
    TYPESCRIPT:{name:'typescript', logo: './assets/technologies/typescript.svg'},

}