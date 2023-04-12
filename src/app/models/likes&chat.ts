
export interface Like{
  nameU1:string,
  nameU2:string,
  time: string
}

export interface ChatMessage{

  id?: number,
  username1: string,
  username2: string,
  message: string
  time: string

}

export interface ChatUser1User2{

  username1: string,
  username2: string,
  messages: ChatMessage[]

}
