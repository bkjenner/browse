/**
 * The Application rules.
 *
 * @class Connetions
 * @constructor
 */
function Connections() {};

//---------Export-------------//

module.exports = new Connections();

//----------Requires--------//

var Promise = require('bluebird');
var _ = require('lodash');
var Db = require('../data/models');
var settings = require('./settings');
var security = require('./security');
var rulesEngine = require('./rulesengine');

var userConnections = {};
var socketio;


/**
* Prepare connections
*
* @example
*   Connections.prepareConnections(io).then(() => { }).catch((err) => { });
*
* @method prepareConnections
* @param {Object} io The socket io object that you are connecting to.
* @return {Object} Resolves with null or rejects with error
*/
Connections.prototype.prepareConnections = function(io){
  var objInternal = this;
  return new Promise((resolve, reject) => {
    try{
      io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
          security.verifyToken(socket.handshake.query.token)
          .then((decoded) => {
            if(decoded){
              socket.decoded = decoded;
              next();
            }else{
              return next(new Error("Socket Authentication Failed."));
            }
          });
        }
        next(new Error('Authentication error'));
      })
      .on('connection', function(socket) {
          // Connection now authenticated to receive further events
          userConnections[socket.decoded.userid] = socket.id;

          rulseEngine.addSocketListeners(socket).then(() => {
            console.log("rules engine socket listeners added..");
          });
          
          socket.on('disconnect', () => {
              delete userConnections[socket.decoded.userid];
          });
      });
      resolve();
    }catch(e){
      reject(e);
    } 
  });
}

/**
* Broadcast message to everybody other than the originator
*
* @example
*   Connections.broadcast(userid, action, data).then(() => { }).catch((err) => { });
*
* @method prepareConnections
* @param {Object} userid The user who's socket to emit from
* @param {Object} action The action to emit
* @param {Object} data The data being sent
* @return {Object} Resolves with null or rejects with error
*/
Connections.prototype.broadcast = function(userid, action, data){
  var objInternal = this;
  return new Promise((resolve, reject) => {
    try{
      if(userid && userConnections[userid]){
          var socket = _.find(socketio.sockets.sockets, {id: userConnections[userid]});
          if(socket){
            socket.broadcast(action, data);
            resolve();
          }else{
            reject(new Error("A socket for the provided user is not found"));
          }
      }else{
        reject(new Error("A user identifier must be provided"));
      }
    }catch(e){
      reject(e);
    } 
  });
}

/**
* Emit message to specific conneced user.
*
* @example
*   Connections.socketEmit(userid, action, data).then(() => { }).catch((err) => { });
*
* @method socketEmit
* @param {Object} userid The user who's socket to emit from
* @param {Object} action The action to emit
* @param {Object} data The data being sent
* @return {Object} Resolves with null or rejects with error
*/
Connections.prototype.socketEmit = function(userid, action, data){
  var objInternal = this;
  return new Promise((resolve, reject) => {
    try{
      if(userid && userConnections[userid]){
          var socket = _.find(socketio.sockets.sockets, {id: userConnections[userid]});
          if(socket){
            socket.emit(action, data);
            resolve();
          }else{
            reject(new Error("A socket for the provided user is not found"));
          }
      }else{
        reject(new Error("A user identifier must be provided"));
      }
    }catch(e){
      reject(e);
    } 
  });
}

/**
* Broadcast message to everybody in a group other than the originator
*
* @example
*   Connections.socketGroupEmit(userid, groupid, action, data).then(() => { }).catch((err) => { });
*
* @method socketGroupEmit
* @param {Integer} userid The user who's socket to emit from
* @param {Integer} groupid The group who should receive the message
* @param {String} action The action to emit
* @param {Object} data The data being sent
* @return {Object} Resolves with null or rejects with error
*/
Connections.prototype.socketGroupEmit = function(userid, groupid, room, action, data){
  var objInternal = this;
  return new Promise((resolve, reject) => {
    try{
      if(userid && userConnections[userid]){
          var socket = _.find(socketio.sockets.sockets, {id: userConnections[userid]});
          if(socket){
            socket.broadcast.to(groupid).emit(action, data);
            resolve();
          }else{
            reject(new Error("A socket for the provided user is not found"));
          }
      }else{
        reject(new Error("A user identifier must be provided"));
      }
    }catch(e){
      reject(e);
    } 
  });
}

/**
* Emit message to all connected users.
*
* @example
*   Connections.emit(userid, action, data).then(() => { }).catch((err) => { });
*
* @method emit
* @param {Object} action The action to emit
* @param {Object} data The data being sent
* @return {Object} Resolves with null or rejects with error
*/
Connections.prototype.emit = function(action, data){
  var objInternal = this;
  return new Promise((resolve, reject) => {
    try{
      if(socketio){
          socketio.emit(action, data);
          resolve();
      }else{
        reject(new Error("Socket connections are unavailable"));
      }
    }catch(e){
      reject(e);
    } 
  });
}

/**
* Emit message to all connected users in group.
*
* @example
*   Connections.groupEmit(groupid, action, data).then(() => { }).catch((err) => { });
*
* @method groupEmit
* @param {Integer} groupid The group who should receive the message
* @param {Object} action The action to emit
* @param {Object} data The data being sent
* @return {Object} Resolves with null or rejects with error
*/
Connections.prototype.groupEmit = function(groupid, action, data){
  var objInternal = this;
  return new Promise((resolve, reject) => {
    try{
      if(groupid){
        if(socketio){
            socketio.in(groupid).emit(action, data);
            resolve();
        }else{
          reject(new Error("Socket connections are unavailable"));
        }
      }else{
        reject(new Error("Group not provided."));
      }
    }catch(e){
      reject(e);
    } 
  });
}


//----------Routes--------------//
Connections.prototype.initialize = function(io){
  var objInternal = this;
  
  socketio = io;

  objInternal.prepareConnections(socketio).then(() => { });

}