export function authHeader(){
    let user = JSON.parse(localStorage.getItem('user'));

        if(user){
            return {'Token': user.token };
        }
        else {
            return {};
        }
}