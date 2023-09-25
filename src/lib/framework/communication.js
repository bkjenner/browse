/**
This module is the framework used by APRO for enterprise system creation.

@module framework
**/
var Promise = require('bluebird');
var path = require('path');
var Db = require('../data/models');
var os = require('os');
var _ = require('lodash');
var moment = require('moment');
var settings = require('./settings');
var mail = require('./mail.js');
var util = require('./utility');
var sms = require('./sms.js');
var awspns = require('./awspns.js');
var io = null;

/**
The Communication class is used to manage all communication functionality.

@class Communication
**/
function Communication() {};
module.exports = new Communication();

Communication.prototype.socketIo = null;
Communication.prototype.socket = null;
var Communications = [];

Communication.prototype.initSocket = function(ioSocket, connectedUsers){
	if(ioSocket){
		io = ioSocket;
	}
	if(connectedUsers){
		ioUsers = connectedUsers;
	}
}



/**
* Get All Active Notifications for a user
*
* @example
* 	Communication.commGetAllActiveNotificationforUser().then((result) => { }).catch((err) => { });
*
* @method commGetAllActiveNotificationforUser
* @return {Object} Resolves with Communications result or rejects with an error
*/
Communication.prototype.commGetAllActiveNotificationforUser = function(obj){
	return new Promise((resolve, reject) => {
		if(obj && obj.userId){
			Db.models.notification.findAll({ where: {contactid: obj.contactId, read: false}})
			.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
			.catch((err) => { reject(err); });	
		}else{
			util.handleError(new Error("commGetAllActiveNotificationforUser failed.  obj or obj.contactid does not exist.")).then(() => { reject(new Error("commGetAllActiveNotificationforUser failed.  obj or obj.contactid does not exist.")); });
		}
	});
}

/**
* Gets all active Notifications for a user by type
*
* @example
* 	Communication.commGetAllActiveNotificationsforUserByType().then((result) => { }).catch((err) => { });
*
* @method commGetAllActiveNotificationsforUserByType
* @return {Object} Resolves with Communication result or rejects with an error
*/
Communication.prototype.commGetAllActiveNotificationsforUserByType = function(obj){
	return new Promise((resolve, reject) => {
		if(obj && obj.contactId &&  obj.notificationtypeId){
			Db.models.notification.findAll({ where: {contactid: obj.contactId, notificationtypeid: obj.notificationtypeId, read: false}})
			.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
			.catch((err) => { reject(err); });	
		}else{
			util.handleError(new Error("commGetAllActiveNotificationsforUserByType failed.  obj or obj.contactId or obj.communicationTypeId does not exist.")).then(() => { reject(new Error("commGetAllActiveNotificationsforUserByType failed.  obj or obj.contactId or obj.communicationTypeId does not exist.")); });
		}
	});
}

/**
* Gets all active notfications
*
* @example
* 	Communication.commGetAllActiveNotifications().then((result) => { }).catch((err) => { });
*
* @method commGetAllActiveNotifications
* @return {Object} Resolves with Notifications result or rejects with an error
*/
Communication.prototype.commGetAllActiveNotifications = function(){
	return new Promise((resolve, reject) => {
		Db.models.notification.findAll({ where: {read: false}})
		.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
		.catch((err) => { reject(err); });	
	});
}

/**
* Gets all active Notifications by type
*
* @example
* 	Communication.commGetAllActiveNotificationsByType().then((result) => { }).catch((err) => { });
*
* @method commGetAllActiveNotificationsByType
* @return {Object} Resolves with Notifications result or rejects with an error
*/
Communication.prototype.commGetAllActiveNotificationsByType = function(){
	return new Promise((resolve, reject) => {
		Db.models.communication.findAll({ where: {notificationtypeid: id, enabled: false}})
		.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
		.catch((err) => { reject(err); });	
	});
}

/**
* Gets Notification by ID
*
* @example
* 	Communication.commGetNotificationById(1).then((result) => { }).catch((err) => { });
*
* @method commGetNotificationById
* @param {int} ID of the Communication being searched for
* @return {Object} Resolves with a job result or rejects with an error
*/

Communication.prototype.commGetNotificationById = function(obj){
	var objInternal = this;
	return new Promise((resolve, reject) => {
		try{
			if(obj && obj.Id){
				resolve(Db.models.notification.findById(obj.Id, { include: [] }));
			}else{
				util.handleError(new Error("commGetNotificationById failed.  obj or obj.Id does not exist.")).then(() => { reject(new Error("commGetNotificationById failed.  obj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Gets job from database by Id
*
* @example
* 	Communication.getNotificationTypeById(1).then((result) => { }).catch((err) => { });
*
* @method getNotificationTypeById
* @param {int} ID of the NotificationType being searched for
* @return {Object} Resolves with a Notification Type result or rejects with an error
*/

Communication.prototype.etNotificationTypeById = function(obj){
	var objInternal = this;
	return new Promise((resolve, reject) => {
		try{
			if(obj && obj.id){
				resolve(Db.models.communicationtype.findById(obj.id, { include: [] }));
			}else{
				util.handleError(new Error("getNotificationTypeById failed.  obj or obj.id does not exist.")).then(() => { reject(new Error("getNotificationTypeById failed.  obj or obj.id does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

//-----------------------------------------------------------

/**
* Gets all active Communication for a user
*
* @example
* 	Communication.getAllActiveCommunicationsforUser().then((result) => { }).catch((err) => { });
*
* @method getAllActiveCommunicationsforUser
* @return {Object} Resolves with Communications result or rejects with an error
*/
Communication.prototype.commGetAllActiveCommsforUser = function(obj){
	return new Promise((resolve, reject) => {
		if(obj && obj.userId){
			Db.models.communicationlog.findAll({ where: {contactid: obj.contactId, enabled: true}})
			.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
			.catch((err) => { reject(err); });	
		}else{
			util.handleError(new Error("commGetAllActiveCommsforUser failed.  obj or obj.userId does not exist.")).then(() => { reject(new Error("commGetAllActiveCommsforUser failed.  obj or obj.userId does not exist.")); });
		}
	});
}

/**
* Gets all active Communication for a user by type
*
* @example
* 	Communication.getAllActiveCommunicationsforUserByType().then((result) => { }).catch((err) => { });
*
* @method getAllActiveCommunicationsforUserByType
* @return {Object} Resolves with Communication result or rejects with an error
*/
Communication.prototype.commGetAllActiveCommsforUserByType = function(obj){
	return new Promise((resolve, reject) => {
		if(obj && obj.userId &&  obj.communicationTypeId){
			Db.models.communication.findAll({ where: {userid: obj.userId, communicationtypeid: obj.communicationTypeId}})
			.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
			.catch((err) => { reject(err); });	
		}else{
			util.handleError(new Error("commGetAllActiveCommsforUser failed.  obj or obj.userId or obj.communicationTypeId does not exist.")).then(() => { reject(new Error("commGetAllActiveCommsforUser failed.  obj or obj.userId or obj.communicationTypeId does not exist.")); });
		}
	});
}

/**
* Gets all active notfications
*
* @example
* 	Communication.getAllActiveCommunications().then((result) => { }).catch((err) => { });
*
* @method getAllActiveCommunications
* @return {Object} Resolves with Communications result or rejects with an error
*/
Communication.prototype.commGetAllComms = function(){
	return new Promise((resolve, reject) => {
		Db.models.communication.findAll({ where: {enabled: true}})
		.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
		.catch((err) => { reject(err); });	
	});
}

/**
* Gets all active jobs
*
* @example
* 	Communication.getAllActiveCommunicationsByType().then((result) => { }).catch((err) => { });
*
* @method getAllActiveCommunicationsByType
* @return {Object} Resolves with communications result or rejects with an error
*/
Communication.prototype.commGetAllActiveCommsByType = function(){
	return new Promise((resolve, reject) => {
		Db.models.communication.findAll({ where: {communicationtypeid: communicationTypeId, enabled: true}})
		.then((result) => { resolve(JSON.parse(JSON.stringify(result))); })
		.catch((err) => { reject(err); });	
	});
}

/**
* Gets job from database by Id
*
* @example
* 	Communication.findById(1).then((result) => { }).catch((err) => { });
*
* @method findById
* @param {int} ID of the Communication being searched for
* @return {Object} Resolves with a job result or rejects with an error
*/

Communication.prototype.commGetCommById = function(obj){
	var objInternal = this;
	return new Promise((resolve, reject) => {
		try{
			if(obj && obj.communicationId){
				resolve(Db.models.communicationlog.findById(obj.communicationId, { include: [] }));
			}else{
				util.handleError(new Error("commGetCommById failed.  obj does not exist.")).then(() => { reject(new Error("commGetCommById failed.  obj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Gets job from database by Id
*
* @example
* 	Communication.findCommunicationTypeById(1).then((result) => { }).catch((err) => { });
*
* @method findCommunicationTypeById
* @param {int} ID of the Communication Type being searched for
* @return {Object} Resolves with a Communication Type result or rejects with an error
*/

Communication.prototype.getCommunicationTypeById = function(obj){
	var objInternal = this;
	return new Promise((resolve, reject) => {
		try{
			if(obj && obj.communicationTypeId){
				resolve(Db.models.communicationtype.findById(obj.communicationTypeId, { include: [] }));
			}else{
				util.handleError(new Error("getCommunicationTypeById failed.  obj or obj.communicationId does not exist.")).then(() => { reject(new Error("getCommunicationTypeById failed.  obj or obj.communicationId does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Update Communication record in the database
*
* @example
* 	Communication.update(obj).then((result) => { }).catch((err) => { });
*
* @method update
* @param {obj}  of the Communication record in the database to update
* @return {Object} Resolves with an update or rejects with an error
*/

/*Communication.prototype.update = function(obj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			objInternal.prepObject(obj)
			.then((newObj) => {
				resolve(Db.models.communicationlog.update(newObj, {where: {id: newObj.id}}));	
			})
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}*/

/**
* Create Communication record in the database
*
* @example
* 	Communication.create(obj).then((result) => { }).catch((err) => { });
*
* @method create
* @param {obj}  of the motification record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.setCommunicationLogRecord = function(obj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(obj){
				objInternal.prepObject(obj)
				.then((newObj) => {
					if(newObj.id){
						resolve(Db.models.communicationlog.update(newObj, {where: {id: newObj.id}}));	
					}else{					
						resolve(Db.models.communicationlog.create(newObj));	
					}

				})
			}else{
				util.handleError(new Error("setCommunicationLogRecord failed.  obj does not exist.")).then(() => { reject(new Error("setCommunicationLogRecord failed.  obj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Create Notification record in the database
*
* @example
* 	Notification.create(obj).then((result) => { }).catch((err) => { });
*
* @method create
* @param {obj}  of the notification record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.setCommNotificationRecord = function(obj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(obj){
				objInternal.prepObject(obj)
				.then((newObj) => {
					resolve(Db.models.notification.create(newObj));	
				})
			}else{
				util.handleError(new Error("setCommNotificationRecord failed.  obj does not exist.")).then(() => { reject(new Error("setCommNotificationRecord failed.  obj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Create Communication type record in the database
*
* @example
* 	Communication.createCommunicationType(obj).then((result) => { }).catch((err) => { });
*
* @method createCommunicationType
* @param {obj}  of the motification type record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.createCommunicationType = function(obj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(obj){
				objInternal.prepObject(obj)
				.then((newObj) => {
					resolve(Db.models.communicationtype.create(newObj));	
				})
			}else{
				util.handleError(new Error("createCommunicationType failed.  obj does not exist.")).then(() => { reject(new Error("createCommunicationType failed.  obj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Create sendCommunication type record in the database
*
* @example
* 	Notification.sendCommunication(obj).then((result) => { }).catch((err) => { });
*
* @method sendCommunication
* @param {obj}  
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.commSendComm = function(communicationObj){
	var objInternal = this;
 	return new Promise((resolve, reject) => {
		try{
			var communicationTypeId;
			if(communicationObj){
				if(communicationObj.communicationTypeId){
					if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdSMS){
						objInternal.sendSMSCommunication(communicationObj)
						.then((smsMessageId) => {
							resolve(smsMessageId);
						})
						.catch((e) => {
							util.handleError(new Error("Update to schedule update count failed. " + e.message)).then(() => { reject(new Error("Update to schedule update count failed. " + e.message)); });
						})
					}else if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdEmail){
						objInternal.sendEmailCommunication(communicationObj.from, communicationObj.toEmail, communicationObj.subject, communicationObj.content)
						.then((smsMessageId) => {
							resolve(smsMessageId);
						})							
						.catch((e) => {
							util.handleError(new Error("Update to schedule update count failed. " + e.message)).then(() => { reject(new Error("Update to schedule update count failed. " + e.message)); });
						})
					}else if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdWebDesktop){
						objInternal.sendWebDesktopNotification(communication.messageType, communicationObj.to, communicationObj.content)
						.then((notificationId) =>{
							resolve(notificationId)
						})
						.catch((e) => {
							util.handleError(new Error("Update to schedule update count failed. " + e.message)).then(() => { reject(new Error("Update to schedule update count failed. " + e.message)); });
						})
					}else if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdMobile){
						objInternal.sendMobileCommunication(communicationObj.to, communicationObj.content)
						.then((notificationId) => {
							resolve(notificationId)
						})						
						.catch((e) => {
							util.handleError(new Error("Update to schedule update count failed. " + e.message)).then(() => { reject(new Error("Update to schedule update count failed. " + e.message)); });
						})
					}
				}else{
					util.handleError(new Error("Communication Type Id is required" + validation.message)).then(() => { reject(new Error("SMS Communication is invalid" + validation.message)); });							
				}
			}else{
				util.handleError(new Error("commSendComm failed.  communicationObj does not exist.")).then(() => { reject(new Error("commSendComm failed.  communicationObj does not exist.")); });
			}			
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}

	});
}

/**
* Validates communication object.
*
* @example
* 	Scheduler.validateCommunication(communicationObj).then((result) => { }).catch((err) => { });
*
* @method validateCommunication
* @param {communicationObj} Communication object to validate
* @return Resolves or rejects with an error
*/

Communication.prototype.commValidateComm = function(communicationObj){
	return new Promise((resolve, reject) => {
		try{
			if(communicationObj){		
				var blnPass = true;
				var message = "";
				if(!communicationObj.communicationTypeId){
					blnPass = false;
					message += "Communication object is required.\n";
				}
				if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdSMS){
					//Validate field for SMS communicationtype
					if(!communicationObj.toNumber){
						blnPass = false;
						message += "Phone number is required.\n";						
					}
					if(!communicationObj.content){
						blnPass = false;
						message += "SMS Content is required.\n";						
					}
				}
				if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdEmail){
					//Validate field for Email communication
					if(!communicationObj.toEmail){
						blnPass = false;
						message += "To Email address is required.\n";						
					}
					if(!communicationObj.subject){
						blnPass = false;
						message += "Email Subject is required.\n";						
					}
					if(!communicationObj.content){
						blnPass = false;
						message += "Email Content is required.\n";						
					}													
				}
				if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdWebDesktop){
					//Validate field for Web/Desktop communication
					if(!communicationObj.notificationTypeId){
						blnPass = false;
						message += "Notification Type ID is required.\n";						
					}
					if(!communicationObj.to){
						blnPass = false;
						message += "Notification To is required.\n";						
					}
					if(!communicationObj.content){
						blnPass = false;
						message += "Notification Content is required.\n";						
					}						
				}
				if(communicationObj.communicationTypeId == settings.communication().communicationTypeIdMobile){
					//Validate field for Mobile communication
					if(!communicationObj.to){
						blnPass = false;
						message += "Mobile To is required.\n";						
					}
					if(!communicationObj.content){
						blnPass = false;
						message += "Notification Content is required.\n";						
					}
				}												
			}else{
				blnPass = false;
				message += "Communication object is required.\n";
			}
			resolve({isValid: blnPass, message});
		}catch(e){
			util.handleError(new error("Failed to validate schedule")).then(() => { reject(new error("Failed to validate schedule")); });
		}
	});
}

/**
* Create Notification type record in the database
*
* @example
* 	Notification.createNotificationType(obj).then((result) => { }).catch((err) => { });
*
* @method createNotificationType
* @param {obj}  of the notification type record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.commSetNotificationType = function(obj){
	var objInternal = this;
 	return new Promise((resolve, reject) => {
		try{
			if(obj){
				objInternal.prepObject(obj)
				.then((newObj) => {
					resolve(Db.models.notificationtype.create(newObj));	
				})
			}else{
				util.handleError(new Error("commSetNotificationType failed.  obj does not exist.")).then(() => { reject(new Error("commSetNotificationType failed.  obj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}


/**
* Send email communication
*
* @example
* 	Communication.sendEmailCommunication(obj).then((result) => { }).catch((err) => { });
*
* @method sendEmailCommunication
* @param {obj}  of the motification type record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.commSendEmailCommunication = function(communicationObj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(communicationObj){
				objInternal.validateCommunication(communicationObj)				
				.then((validation) => {
					if(validation.isValid){							
						var dtTemp = moment(new Date());
						objContent = {"communicationTypeId": settings.communication().communicationTypeIdEmail, "from": communicationObj.from,"to": communicationObj.to, "subject": communicationObj.subject,"body": communicationObj.body, "attachmentPath": communicationObj.attachmentPath};			
						mail.send(from, to, subject, body, attachmentPath)
						.then((sentMessageId) => {
							//log Email sent
							objInternal.createCommunicationLogRecord({"communicationtypeid" : settings.communication().communicationTypeIdEmail, "content" : JSON.stringify(objContent), "issueddate": dtTemp	})	
							.then((sentMessageId) => {
								console.log("NEW MESSAGE ID", sentMessageId);
								resolve(sentMessageId);
							});
						});
					}else{
						util.handleError(new Error("SMS Communication is invalid" + validation.message)).then(() => { reject(new Error("SMS Communication is invalid" + validation.message)); });							
					}
				})				
			}else{
				util.handleError(new Error("commSendEmailCommunication failed.  communicationObj does not exist.")).then(() => { reject(new Error("commSendEmailCommunication failed.  communicationObj does not exist.")); });
			}	
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Create Communication type record in the database
*
* @example
* 	Communication.createCommunicationType(obj).then((result) => { }).catch((err) => { });
*
* @method createCommunicationType
* @param {obj}  of the motification type record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.sendSMSCommunication = function(communicationObj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(communicationObj){
				objInternal.validateCommunication(communicationObj)				
				.then((validation) => {
					if(validation.isValid){				
						var objContent;
						var dtTemp = moment(new Date());
						objContent = {"communicationTypeId": settings.communication().communicationTypeIdSMS, "toNumber": toNumber,"content": content};
						sms.sendSMS(toNumber, content)
						.then((sentMessageId) => {
							//log SMS sent
							objInternal.createCommunicationLogRecord({"communicationtypeid" : settings.communication().communicationTypeIdSMS, "content" : JSON.stringify(objContent), "issueddate": dtTemp	})	
							.then((sentMessageId) => {
								console.log("NEW MESSAGE ID", sentMessageId);
								resolve(sentMessageId);
							});
						});
					}else{
						util.handleError(new Error("SMS Communication is invalid" + validation.message)).then(() => { reject(new Error("SMS Communication is invalid" + validation.message)); });							
					}
				})				
			}else{
				util.handleError(new Error("sendSMSCommunication failed.  communicationObj does not exist.")).then(() => { reject(new Error("sendSMSCommunication failed.  communicationObj does not exist.")); });
			}	
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Create Communication type record in the database
*
* @example
* 	Communication.createCommunicationType(obj).then((result) => { }).catch((err) => { });
*
* @method createCommunicationType
* @param {obj}  of the motification type record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.sendMobileCommunication = function(communicationObj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(communicationObj){
				objInternal.validateCommunication(communicationObj)				
				.then((validation) => {
					if(validation.isValid){				
						var objContent;
						var dtTemp = moment(new Date());
						objContent = {"communicationTypeId": settings.communication().communicationTypeIdMobile, "content": communicationObj.content,"token": communicationObj.token};
						//awspns.sendPush(token, content)
						//.then((sentMessageId) => {
							//log Notification sent
							var sentMessageId;
							sentMessageId = "1";
							objInternal.createCommunicationLogRecord({"communicationtypeid" : settings.communication().communicationTypeIdMobile, "content" : JSON.stringify(objContent)})	
							.then((logRecordId) => {
								console.log("NEW MESSAGE ID", sentMessageId);
								resolve(sentMessageId);
							});
						}else{
							util.handleError(new Error("Mobile Communication is invalid" + validation.message)).then(() => { reject(new Error("Mobile Communication is invalid" + validation.message)); });							
						}
					})	
			}else{
				util.handleError(new Error("sendMobileCommunication failed.  communicationObj does not exist.")).then(() => { reject(new Error("sendMobileCommunication failed.  communicationObj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**
* Create Communication type record in the database
*
* @example
* 	Communication.sendWebDesktopNotification(obj).then((result) => { }).catch((err) => { });
*
* @method sendWebDesktopNotification
* @param {obj}  of the Notification type record in the database to create
* @return {Object} Resolves with an create or rejects with an error
*/

Communication.prototype.sendWebDesktopNotification = function(communicationObj){
	console.log("in sendWebDesktopNotification");
	var objInternal = this;
	return new Promise((resolve, reject) => {
		try{
			if(communicationObj){		
				objInternal.validateCommunication(communicationObj)				
				.then((validation) => {
					if(validation.isValid){					
						var objContent;
						var dtTemp = moment(new Date());
						objContent = {"communicationTypeId": settings.communication().communicationTypeIdWebDesktop,"messageType": communicationObj.messageType, "to": communicationObj.to, "content": communicationObj.content};

						objInternal.socketEmit(objContent)
						.then(() =>{
							//log Notification sent
							objInternal.createCommunicationLogRecord({"communicationtypeid" : settings.communication().communicationTypeIdWebDesktop, "content" : JSON.stringify(objContent)})	
							.then((sentMessageId) => {
								console.log("NEW MESSAGE ID", sentMessageId);
								resolve(sentMessageId);
							});
						})
					}else{
						util.handleError(new Error("sendWebDesktopNotification failed.  communicationOjb is invalid" + validation.message)).then(() => { reject(new Error("sendWebDesktopNotification failed.  communicationOjb is invalid")); });												
					}
				});
			}else{
				util.handleError(new Error("sendWebDesktopNotification failed.  communicationObj does not exist.")).then(() => { reject(new Error("sendWebDesktopNotification failed.  communicationObj does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

/**	
* Disables Communication record in the database
*
* @example
* 	Communication.delete(obj).then((result) => { }).catch((err) => { });
*
* @method delete
* @param {obj} Disables the Communication record in the database
* @return {Object} Resolves or rejects with an error
*/

Communication.prototype.deleteCommunicationLog = function(obj){
	var objInternal = this;

	return new Promise((resolve, reject) => {
		try{
			if(obj && obj.id){
				resolve(Db.models.communicationlog.update({enabled: 0}, {where: {id: obj.id}}));
			}else{
				util.handleError(new Error("deleteCommunicationLog failed.  obj or obj.id does not exist.")).then(() => { reject(new Error("deleteCommunicationLog failed.  obj or obj.id does not exist.")); });
			}
		}catch(e){
			util.handleError(e).then(() => { reject(e); });
		}
	});
}

Communication.prototype.socketEmit = function(objMessage){
//Actions.prototype.socketEmit = function(socketMessage, area, action, contact, contactid, message, date, logged, status, notify, callback){
  	var objInternal = this;

  	return new Promise((resolve, reject) => {
	  	if(objMessage){	
			io.sockets.on('connection', function (socket, username) {
				console.log("about to send echo");
			    // When the client connects, they are sent a message
			    socket.emit(objMessage.messageType, 'You are connected!');
			});
			resolve("socketEmit");
		}else{

		}
	});
}

/**
* Initializes the Communication to load all Communications
*
* @example
* 	Communication.initialize(Communication).then((result) => { }).catch((err) => { });
*
* @method initialize
* @param {app}  App Object
* @return  Resolves or rejects with an error
*/

Communication.prototype.initialize = function(app){
	var objInternal = this;
}

/**
* Prepares the Communication object from the database for further operations.
*
* @example
* 	Communication.prepObject(communicationJob).then((result) => { }).catch((err) => { });
*
* @method prepObject
* @param {obj}  Object of the app
* @return {Object} Resolves or rejects with an error
*/
Communication.prototype.prepObject = function(obj){
	var objInternal = this;
   
	return new Promise((resolve, reject) => {
	 	try{	 	
		 	var tmpObject = obj
			 	resolve(tmpObject);
		}catch(e){
			util.handleError(new Error("Failed to prepare object for Communication.")).then(() => { reject(new Error("Failed to prepare object for Communication.")); });
	 	}
	});
}

