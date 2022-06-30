
class User{
    constructor(token=null){
        this.token = token;
        this.user_id = '';
        this.name = '';
    }

    setToken(token){
        this.token = token;
    }

}

export default User;