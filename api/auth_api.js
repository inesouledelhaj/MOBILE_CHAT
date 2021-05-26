import axios from "axios";
export default {

    auth(url="http://631d465ce3fe.ngrok.io/"){ // to change , ma7abch el .env
        return {
            login:(values)=>axios.post(url+"login",values),
            register:(values)=>axios.post(url+"register",values,)
        }


    }
}