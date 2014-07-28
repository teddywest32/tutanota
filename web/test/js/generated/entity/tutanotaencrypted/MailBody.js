"use strict";

goog.provide('tutao.entity.tutanotaencrypted.MailBody');

/**
 * @constructor
 * @param {Object=} data The json data to store in this entity.
 */
tutao.entity.tutanotaencrypted.MailBody = function(data) {
  if (data) {
    this.__area = data._area;
    this.__format = data._format;
    this.__id = data._id;
    this.__owner = data._owner;
    this.__permissions = data._permissions;
    this._text = data.text;
  } else {
    this.__area = null;
    this.__format = "0";
    this.__id = null;
    this.__owner = null;
    this.__permissions = null;
    this._text = null;
  };
  this._entityHelper = new tutao.entity.EntityHelper(this);
  this.prototype = tutao.entity.tutanotaencrypted.MailBody.prototype;
};

/**
 * The version of the model this type belongs to.
 * @const
 */
tutao.entity.tutanotaencrypted.MailBody.MODEL_VERSION = '1';

/**
 * The url path to the resource.
 * @const
 */
tutao.entity.tutanotaencrypted.MailBody.PATH = '/rest/tutanotaencrypted/mailbody';

/**
 * The id of the root instance reference.
 * @const
 */
tutao.entity.tutanotaencrypted.MailBody.ROOT_INSTANCE_ID = 'EXR1dGFub3RhZW5jcnlwdGVkAAg';

/**
 * The generated id type flag.
 * @const
 */
tutao.entity.tutanotaencrypted.MailBody.GENERATED_ID = true;

/**
 * The encrypted flag.
 * @const
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.ENCRYPTED = true;

/**
 * Provides the data of this instances as an object that can be converted to json.
 * @return {Object} The json object.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.toJsonData = function() {
  return {
    _area: this.__area, 
    _format: this.__format, 
    _id: this.__id, 
    _owner: this.__owner, 
    _permissions: this.__permissions, 
    text: this._text
  };
};

/**
 * The id of the MailBody type.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.TYPE_ID = 8;

/**
 * The id of the _area attribute.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype._AREA_ATTRIBUTE_ID = 14;

/**
 * The id of the _owner attribute.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype._OWNER_ATTRIBUTE_ID = 13;

/**
 * The id of the text attribute.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.TEXT_ATTRIBUTE_ID = 15;

/**
 * Provides the id of this MailBody.
 * @return {string} The id of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.getId = function() {
  return this.__id;
};

/**
 * Sets the area of this MailBody.
 * @param {string} area The area of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.setArea = function(area) {
  this.__area = area;
  return this;
};

/**
 * Provides the area of this MailBody.
 * @return {string} The area of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.getArea = function() {
  return this.__area;
};

/**
 * Sets the format of this MailBody.
 * @param {string} format The format of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.setFormat = function(format) {
  this.__format = format;
  return this;
};

/**
 * Provides the format of this MailBody.
 * @return {string} The format of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.getFormat = function() {
  return this.__format;
};

/**
 * Sets the owner of this MailBody.
 * @param {string} owner The owner of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.setOwner = function(owner) {
  this.__owner = owner;
  return this;
};

/**
 * Provides the owner of this MailBody.
 * @return {string} The owner of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.getOwner = function() {
  return this.__owner;
};

/**
 * Sets the permissions of this MailBody.
 * @param {string} permissions The permissions of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.setPermissions = function(permissions) {
  this.__permissions = permissions;
  return this;
};

/**
 * Provides the permissions of this MailBody.
 * @return {string} The permissions of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.getPermissions = function() {
  return this.__permissions;
};

/**
 * Sets the text of this MailBody.
 * @param {string} text The text of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.setText = function(text) {
  var dataToEncrypt = text;
  this._text = tutao.locator.aesCrypter.encryptUtf8(this._entityHelper.getSessionKey(), dataToEncrypt);
  return this;
};

/**
 * Provides the text of this MailBody.
 * @return {string} The text of this MailBody.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.getText = function() {
  if (this._text == "") {
    return "";
  }
  var value = tutao.locator.aesCrypter.decryptUtf8(this._entityHelper.getSessionKey(), this._text);
  return value;
};

/**
 * Loads a MailBody from the server.
 * @param {string} id The id of the MailBody.
 * @return {Promise.<tutao.entity.tutanotaencrypted.MailBody>} Resolves to the MailBody or an exception if the loading failed.
 */
tutao.entity.tutanotaencrypted.MailBody.load = function(id) {
  return tutao.locator.entityRestClient.getElement(tutao.entity.tutanotaencrypted.MailBody, tutao.entity.tutanotaencrypted.MailBody.PATH, id, null, {"v" : 1}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entity) {
    return entity._entityHelper.loadSessionKey();
  });
};

/**
 * Loads a version of this MailBody from the server.
 * @param {string} versionId The id of the requested version.
 * @return {Promise.<tutao.entity.tutanotaencrypted.MailBody>} Resolves to MailBody or an exception if the loading failed.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.loadVersion = function(versionId) {
  var map = {};
  map["version"] = versionId;
  map["v"] = 1
  return tutao.locator.entityRestClient.getElement(tutao.entity.tutanotaencrypted.MailBody, tutao.entity.tutanotaencrypted.MailBody.PATH, this.getId(), null, map, tutao.entity.EntityHelper.createAuthHeaders());
};

/**
 * Loads information about all versions of this MailBody from the server.
 * @return {Promise.<tutao.entity.sys.VersionReturn>} Resolves to an tutao.entity.sys.VersionReturn or an exception if the loading failed.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.loadVersionInfo = function() {
  var versionData = new tutao.entity.sys.VersionData()
    .setApplication("tutanotaencrypted")
    .setType(8)
    .setId(this.getId());
  return tutao.entity.sys.VersionReturn.load(versionData, {}, tutao.entity.EntityHelper.createAuthHeaders());
};

/**
 * Loads multiple MailBodys from the server.
 * @param {Array.<string>} ids The ids of the MailBodys to load.
 * @return {Promise.<Array.<tutao.entity.tutanotaencrypted.MailBody>>} Resolves to an array of MailBody or rejects with an exception if the loading failed.
 */
tutao.entity.tutanotaencrypted.MailBody.loadMultiple = function(ids) {
  tutao.locator.entityRestClient.getElements(tutao.entity.tutanotaencrypted.MailBody, tutao.entity.tutanotaencrypted.MailBody.PATH, ids, {"v": 1}, tutao.entity.EntityHelper.createAuthHeaders(), function(entities) {
    return tutao.entity.EntityHelper.loadSessionKeys(entities);
  });
};

/**
 * Stores this MailBody on the server and updates this instance with _id and _permission values generated on the server.
 * @param {tutao.entity.BucketData} bucketData The bucket data for which the share permission on instance shall be created.
 * @return {Promise.<>} Resolves when finished, rejected if the post failed.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.setup = function(bucketData) {
  var self = this;
  var params = this._entityHelper.createPostPermissionMap(bucketData)
  params["v"] = 1
  return tutao.locator.entityRestClient.postElement(tutao.entity.tutanotaencrypted.MailBody.PATH, this, null, params, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entity) {
    self.__id = entity.getGeneratedId();
    self.setPermissions(entity.getPermissionListId());
    self._entityHelper.notifyObservers(false);
  })
};

/**
 * Updates this MailBody on the server.
 * @return {Promise.<>} Resolves when finished, rejected if the update failed.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.update = function() {
  var self = this;
  return tutao.locator.entityRestClient.putElement(tutao.entity.tutanotaencrypted.MailBody.PATH, this, {"v": 1}, tutao.entity.EntityHelper.createAuthHeaders()).then(function() {
    self._entityHelper.notifyObservers(false);
  });
};

/**
 * Deletes this MailBody on the server.
 * @return {Promise.<>} Resolves when finished, rejected if the delete failed.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.erase = function() {
  var self = this;
  return tutao.locator.entityRestClient.deleteElement(tutao.entity.tutanotaencrypted.MailBody.PATH, this.__id, null, {"v": 1}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(data) {
    self._entityHelper.notifyObservers(true);
  });
};

/**
 * Register a function that is called as soon as any attribute of the entity has changed. If this listener
 * was already registered it is not registered again.
 * @param {function(Object,*=)} listener. The listener function. When called it gets the entity and the given id as arguments.
 * @param {*=} id. An optional value that is just passed-through to the listener.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.registerObserver = function(listener, id) {
  this._entityHelper.registerObserver(listener, id);
};

/**
 * Removes a registered listener function if it was registered before.
 * @param {function(Object)} listener. The listener to unregister.
 */
tutao.entity.tutanotaencrypted.MailBody.prototype.unregisterObserver = function(listener) {
  this._entityHelper.unregisterObserver(listener);
};