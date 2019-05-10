(function(){

    'use strict';

    // Declare global variable Queensland Gov object
    window.qg = {};

    // Create an event emitter object
    // This allows components to "broadcast" events and other components can respond to it
    // Promotes decoupling
    qg.events = {}

    // Location related events
    qg.events.location = new EventEmitter2();

}());
