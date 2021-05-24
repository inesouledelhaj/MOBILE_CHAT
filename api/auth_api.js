import axios from "axios";
export default {

    auth(url="http://127.0.0.1:5000/"){ // to change , ma7abch el .env
        return {
            login:(values)=>axios.post(url+"login",values,{
               headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'}
            }
            
        
),
            register:(values)=>axios.post(url+"register",values,{mode: "cors"})
        }


    }
}