import { JWT_SECRET } from '@repo/backend-common/config';
import {WebSocketServer} from 'ws'
import jwt, { JwtPayload } from "jsonwebtoken"
const wss = new WebSocketServer({port:8080});
console.log('WebSocket server started on ws://localhost:8080');
wss.on('connection', function connection(ws,request){
    console.log('A new client connected!');
   const url = request.url;
   if(!url){
    return
   }

   const useParams = new URLSearchParams(url.split('?')[1])
   const token = useParams.get("token") ||"null";
  const decoded = jwt.verify(token,JWT_SECRET);
  
  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close();
    return;
  }
    ws.send('Welcome new client!'); 

    ws.on('message', function message(data){
          ws.send('pong');
    })
})