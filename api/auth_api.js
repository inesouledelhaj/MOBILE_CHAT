import axios from "axios";
export default {

    auth(url="http://0190a230c6d9.ngrok.io/"){ // to change , ma7abch el .env
        return {
            login:(values)=>axios.post(url+"login",values),
            register:(values)=>axios.post(url+"register",values),
            getUser:(username)=>axios.get(url+"user/"+username)
        }


    }
}