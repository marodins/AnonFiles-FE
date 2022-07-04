
export class Message{
    constructor(user, user_id, message, time=new Date().toLocaleString()){
        this.user = user;
        this.user_id = user_id;
        this.message = message;
        this.time = time;
    }
}

export const messageFromList = (list)=>{
    return list.map((item, index)=>{
        return new Message(
            item["user"],
            item["user_id"],
            item["message"],
            item["time"]
        )
    });
}


export const messageFromObject = (ob)=>{
    return new Message(ob["user"], ob["user_id"], ob["message"], ob["time"]);
}