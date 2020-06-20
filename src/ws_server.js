let rooms = new Object();
let { RECEIPIENTS, TOPICS} = require("./shared/ws_terms")

class Room {
    constructor(id) {
        this.id = id;
        this.clients = [];
    }
}

class Client {
    constructor(id, ws) {
        this.id = id;
        this.ws = ws;
    }
}

function ws_process(ws) {
    ws.on('message', msg => {
        let data = JSON.parse(msg);
        if (data.receipient === RECEIPIENTS.SERVER) {
            if(data.topic === TOPICS.JOIN) {
                let room = null;
    
                if(rooms[data.message] === undefined) {
                    console.log("creating new room")
                    
                    room = new Room(data.message);
                    rooms[data.message] = room;
                } else {
                    console.log("joining existend room")
                    room = rooms[data.message];
                }
    
                let client = new Client(room.clients.length, ws);
                ws.client = client;
                room.clients.push(client);
    
                ws.roomId = data.message;
    
                ws.send(JSON.stringify({
                    receipient: RECEIPIENTS.CLIENT,
                    topic: TOPICS.JOIN,
                    message: {
                        room: data.message
                    }
                }))
            }
        } else {
            let room = rooms[ws.roomId];

            room.clients.forEach(client => {
                if(client.ws !== ws) {
                    client.ws.send(msg);
                }
            });
        }
    })

    ws.on('close', () => {
        if(rooms[ws.roomId] !== undefined) {
            console.log("client leaving")
            rooms[ws.roomId].clients = rooms[ws.roomId].clients.filter(item => item !== ws.client)

            if(rooms[ws.roomId].clients.length === 0) {
                console.log("closing room");
                rooms[ws.roomId] = undefined;
            }
        }
    })
}

module.exports = ws_process;