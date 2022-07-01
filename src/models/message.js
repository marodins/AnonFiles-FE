
export class Message{
    constructor(user, message, time=new Date().toLocaleString()){
        this.user = user;
        this.message = message;
        this.time = time;
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