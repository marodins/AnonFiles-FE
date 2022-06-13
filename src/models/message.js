
export class Message{
    constructor(user, message, time=null){
        this.user = user;
        this.message = message;
        this.time = 0
    }
}

export const messageFromList = (list)=>{
    return list.map((item, index)=>{
        return new Message(
            item["user"],
            item["message"],
            item["time"]
        )
    });
}


export const messageFromObject = (ob)=>{
    return new Message(ob["user"], ob["message"], ob["time"]);
}