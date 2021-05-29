import axios from "axios";
export default {

    auth(url="http://d2536cb415a4.ngrok.io/"){ // to change , ma7abch el .env
        return {
            login:(values)=>axios.post(url+"login",values),
            register:(values)=>axios.post(url+"register",values),
            getUser:(username)=>axios.get(url+"user/"+username)
        }


    }
}