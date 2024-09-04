
export interface Login {

        email:string,
        password:string,
}


export interface Data extends Login{

        name:string,
        email:string,
        phone:string,
        password:string,
        rePassword:string 
}
export interface Email{
        email:string,
}
export interface Code{
        resetCode:string,
}

