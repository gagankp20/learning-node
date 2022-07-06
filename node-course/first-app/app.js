//using events
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged', ()=> {
    console.log('Listener called')
})

emitter.emit('messageLogged');
