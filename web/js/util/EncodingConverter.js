"use strict";

tutao.provide('tutao.util.EncodingConverter');

/**
 * Converts the given key to an Uint8Array.
 * @param {bitArray} key The key.
 * @return {Uint8Array} The uint8array key.
 */
tutao.util.EncodingConverter.keyToUint8Array = function(key) {
    return new Uint8Array(sjcl.codec.arrayBuffer.fromBits(key));
};

/**
 * Converts the given uint8array to a key.
 * @param {Uint8Array} uint8Array The uint8Array key.
 * @return {bitArray} The key.
 * @throws {tutao.crypto.CryptoError} If the conversion fails.
 */
tutao.util.EncodingConverter.uint8ArrayToKey = function(uint8Array) {
    return sjcl.codec.arrayBuffer.toBits(uint8Array.buffer);
};


/**
 * Converts the given key to a base64 coded string.
 * @param {bitArray} key The key.
 * @return {String} The base64 coded string representation of the key.
 */
tutao.util.EncodingConverter.keyToBase64 = function(key) {
    return sjcl.codec.base64.fromBits(key);
};

/**
 * Converts the given base64 coded string to a key.
 * @param {String} base64 The base64 coded string representation of the key.
 * @return {bitArray} The key.
 * @throws {tutao.crypto.CryptoError} If the conversion fails.
 */
tutao.util.EncodingConverter.base64ToKey = function(base64) {
    try {
        return sjcl.codec.base64.toBits(base64);
    } catch (e) {
        throw new tutao.crypto.CryptoError("hex to aes key failed", e);
    }
};

/**
 * Converts a hex coded string into a base64 coded string.
 *
 * @param {String} hex A hex encoded string.
 * @return {String} A base64 encoded string.
 */
tutao.util.EncodingConverter.hexToBase64 = function(hex) {
	return sjcl.codec.base64.fromBits(sjcl.codec.hex.toBits(hex));
};

/**
 * Converts a base64 coded string into a hex coded string.
 *
 * @param {String} base64 A base64 encoded string.
 * @return {String} A hex encoded string.
 */
tutao.util.EncodingConverter.base64ToHex = function(base64) {
	return sjcl.codec.hex.fromBits(sjcl.codec.base64.toBits(base64));
};

/**
 * Converts a base64 string to a url-conform base64 string. This is used for
 * base64 coded url parameters.
 *
 * @param {string} base64 The base64 string.
 * @return {string} The base64url string.
 */
tutao.util.EncodingConverter.base64ToBase64Url = function(base64) {
	var base64url = base64.replace(/\+/g, "-");
	base64url = base64url.replace(/\//g, "_");
	base64url = base64url.replace(/=/g, "");
	return base64url;
};

/**
 * Converts a base64 string to a base64ext string. Base64ext uses another character set than base64 in order to make it sortable.
 * 
 *
 * @param {string} base64 The base64 string.
 * @return {string} The base64url string.
 */
tutao.util.EncodingConverter.base64ToBase64Ext = function(base64) {
	var base64Alphabet =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64extAlphabet = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

	base64 = base64.replace(/=/g, "");
	var base64ext = new Array(base64.length);
	for (var i = 0; i < base64.length; i++) {
		var index = base64Alphabet.indexOf(base64.charAt(i));
		base64ext[i] = base64extAlphabet[index];
	}
	return base64ext.join("");
};

/**
 * Converts a timestamp number to a GeneratedId (the counter is set to zero) in hex format. 
 * 
 * @param {number} timestamp The timestamp of the GeneratedId
 * @return {string} The GeneratedId as hex string.
 */
tutao.util.EncodingConverter.timestampToHexGeneratedId = function(timestamp) {
	var id = timestamp * 4; // shifted 2 bits left, so the value covers 44 bits overall (42 timestamp + 2 shifted)
	var hex = parseInt(id).toString(16) + "0000000"; // add one zero for the missing 4 bits plus 6 more (3 bytes) to get 9 bytes 
	// add leading zeros to reach 9 bytes (GeneratedId length) = 18 hex
	for (var length = hex.length; length < 18; length++) {
		hex = "0" + hex;
	}
	return hex;
};

/**
 * Converts a timestamp number to a GeneratedId (the counter is set to zero).
 * 
 * @param {number} timestamp The timestamp of the GeneratedId
 * @return {string} The GeneratedId.
 */
tutao.util.EncodingConverter.timestampToGeneratedId = function(timestamp) {
	var hex = tutao.util.EncodingConverter.timestampToHexGeneratedId(timestamp);
	return tutao.util.EncodingConverter.base64ToBase64Ext(tutao.util.EncodingConverter.hexToBase64(hex));
};

/**
 * Converts a base64 url string to a "normal" base64 string. This is used for
 * base64 coded url parameters.
 *
 * @param {string} base64url The base64 url string.
 * @return {string} The base64 string.
 */
tutao.util.EncodingConverter.base64UrlToBase64 = function(base64url) {
	var base64 = base64url.replace(/\-/g, "+");
	base64 = base64.replace(/_/g, "/");
	var nbrOfRemainingChars = base64.length % 4;
	if (nbrOfRemainingChars === 0) {
		return base64;
	} else if (nbrOfRemainingChars === 2) {
		return base64 + "==";
	} else if (nbrOfRemainingChars === 3) {
		return base64 + "=";
	}
	throw new Error("Illegal base64 string.");
};

/**
 * Converts a string to a Uint8Array containing a UTF-8 string data.
 *
 * @param {string} string The string to convert.
 * @return {Uint8Array} The array.
 */
tutao.util.EncodingConverter.stringToUtf8Uint8Array = function(string) {
    var utf8 = unescape(encodeURIComponent(string));
    var uint8Array = new Uint8Array(utf8.length);
    for (var i = 0; i < utf8.length; i++) {
        uint8Array[i] = utf8.charCodeAt(i);
    }
    return uint8Array;
};

/**
 * Converts an Uint8Array containing UTF-8 string data into a string.
 *
 * @param {Uint8Array} uint8Array The Uint8Array.
 * @return {string} The string.
 */
tutao.util.EncodingConverter.utf8Uint8ArrayToString = function(uint8Array) {
    return decodeURIComponent(escape(String.fromCharCode.apply(null, uint8Array)));
};

tutao.util.EncodingConverter.hexToUint8Array = function(hex) {
	var bufView = new Uint8Array(hex.length / 2);
	for (var i=0; i<bufView.byteLength; i++) {
		bufView[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
	}
	return bufView;
};

tutao.util.EncodingConverter.uint8ArrayToHex = function(uint8Array) {
	var hexDigits = '0123456789abcdef';
	var hex = "";
	for (var i=0; i<uint8Array.byteLength; i++) {
		var value = uint8Array[i];
		hex += hexDigits[value >> 4] + hexDigits[value & 15];
	}
	return hex;
};

/**
 * Converts an Uint8Array to a Base64 encoded string.
 *
 * @param {Uint8Array} bytes The bytes to convert.
 * @return {string} The Base64 encoded string.
 */
tutao.util.EncodingConverter.uint8ArrayToBase64 = function(bytes) {
    var binary = '';
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary);
};

/**
 * Converts a base64 encoded string to a Uint8Array.
 *
 * @param {string} base64 The Base64 encoded string.
 * @return {Uint8Array} The bytes.
 */
tutao.util.EncodingConverter.base64ToUint8Array = function(base64) {
    return new Uint8Array(atob(base64).split("").map(function(c) {
        return c.charCodeAt(0);
    }));
};
