import io from "socket.io-client";


     const socket = io("http://0190a230c6d9.ngrok.io/", { transports: ['websocket'] });
console.ignoredYellowBox = ['Setting a timer'];
    export default {

        chat(){ // to change , ma7abch el .env
            return {
                connect:(user)=>{
                    socket.emit("custom_connect",user);
                },

                sendMessage:(msg, receiver,sender)=>{
                    let message = {message: msg, receiver: receiver, source: sender, time: new Date()};
                    socket.emit("custom_send", JSON.stringify(message));
                },
                 disconnect:(user)=>{
                       socket.emit("custom_disconnect",user);
                 }



            }


        }
    }

