const Parse = require('parse/node');

Parse.initialize('parse', 'jskey');
Parse.serverURL = 'http://localhost:1338/parse';
Parse.liveQueryServerURL = 'ws://localhost:1338'

const query = new Parse.Query("Message");
/*query.ascending('createdAt').limit(5).find().then(todos => {
    console.log("Query: "+JSON.stringify(todos))
}).catch(error => {
    console.log('Failed to retrieving objects, with error code: ' + error.message);
});*/

Parse.LiveQuery.on('open', () => {
    console.log('socket connection established');
});

Parse.LiveQuery.on('close', () => {
    console.log('socket connection closed');
});

Parse.LiveQuery.on('error', (error) => {
    console.log("Error while conecting on livequery: "+error.message);
});

query.subscribe().then((subscription) => {
    console.log("Successfuly subscribed!")

    subscription.on('open', () => {
        console.log('subscription opened');
    });

    subscription.on('create', (object) => {
        console.log('object create');
    });
    
    subscription.on('delete', (object) => {
        console.log('object deleted');
    });

    subscription.on('update', (object) => {
        console.log('object updated');
    });

    subscription.on('enter', (object) => {
        console.log('object entered');
    });

    subscription.on('leave', (object) => {
        console.log('object left');
    });

    subscription.on('delete', (object) => {
        console.log('object deleted');
    });

    subscription.on('close', () => {
        console.log('subscription closed');
    });

}, (error) => {
    console.log('Failed to subscribe!' + error.message);
});

/*const Message = Parse.Object.extend("Message");
const message = new Message();

message.set("message", "hello, world!");

message.save().then((message) => {
    console.log('New object created with objectId: ' + message.id);
}, (error) => {
    console.log('Failed to create new object, with error code: ' + error.message);
});*/