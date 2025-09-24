export class ChatMessage{
    text: string
    sender: string
    time: number
    command: string | null = null
    type!: 'message' | 'notify' | 'command' | 'data'
    data!: Player[]
  
    constructor(text: string, sender: string, time: number){
      this.text = text
      this.sender = sender
      this.time = time
    }
}

export class Player{
    user_id!: number
    username!: string
    online!: boolean
}