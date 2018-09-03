//libraries
let http = require( 'http' );
let url = require( 'url' );
let fs = require('fs');
let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log(Date() + " mySql connected ");
});


////////////////////////////

//server port
const PORT = 8080;


//main server code
console.log( Date() + " server started on port: " + PORT );
http.createServer( function( request, resolution ) {

	console.log( Date() + " request for " + request.url + " from " + request.connection.remoteAddress );
	const parsedUrl = url.parse(request.url, true).query;
	const proc = parsedUrl.proc;

	
	//decoding and running proc
	if (request.method === 'POST') {
		//uploading sprites
		(function () {
			let body = '';
			request.on('data', chunk => {
				
				try {
					body = JSON.parse(chunk);
				} catch (e) {
					SendError( resolution );
				}
				
			});
			request.on('end', () => {
				
				console.log(body.userSession);
				
				if (body.userSession === undefined ||
				body.argRemove === undefined ||
				body.argPublic === undefined ||
				body.argUserSprite === undefined ||
				body.argName === undefined ||
				body.argBio === undefined ||
				body.argSprite === undefined ||
				body.argIcon === undefined ||
				body.argSpriteId === undefined ||
				body.argBaseItemId === undefined ){
					SendError( resolution );
					return;
				}
				
				con.query('call thefurs.InsertUpdateRemoveSprite('
				+ mysql.escape(body.userSession) + ','
				+ mysql.escape(body.argRemove) + ','
				+ mysql.escape(body.argPublic) + ','
				+ mysql.escape(body.argUserSprite) + ','
				+ mysql.escape(body.argName) + ','
				+ mysql.escape(body.argBio) + ','
				+ mysql.escape(body.argSprite) + ','
				+ mysql.escape(body.argIcon) + ','
				+ mysql.escape(body.argSpriteId) + ','
				+ mysql.escape(body.argBaseItemId) + ');', function (error, results, fields) {
					SendContent(resolution, JSON.stringify(results));
				});
				
				
			});
		}());
		

	}
	else if ( proc === "UserLogin" ){
		UserLogin(resolution, parsedUrl.userEmail, parsedUrl.userPassword);
	}
	else if ( proc == "MakeAccount" ) {
		MakeAccount(resolution, parsedUrl.userEmail, parsedUrl.userPassword, parsedUrl.userName);
	}
	else if ( proc == "ChangeUserLocation" ) {
		ChangeUserLocation(resolution, parsedUrl.userSession, parsedUrl.newLocationId);
	}
	else if ( proc == "ChangeUserSprite" ) {
		ChangeUserSprite(resolution, parsedUrl.userSession, parsedUrl.newSpriteId);
	}
	else if ( proc == "GetBaseItem" ) {
		GetBaseItem(resolution);
	}
	else if ( proc == "GetChat" ) {
		GetChat(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetEmots" ) {
		GetEmots(resolution);
	}
	else if ( proc == "GetErrorCodes" ) {
		GetErrorCodes(resolution);
	}
	else if ( proc == "GetGlobalData" ) {
		GetGlobalData(resolution);
	}
	else if ( proc == "GetGrantedLocationsList" ) {
		GetGrantedLocationsList(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetGrantedLocationsList" ) {
		GetGrantedLocationsList(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetInventoryInfo" ) {
		GetInventoryInfo(resolution, parsedUrl.userSession, parsedUrl.argInventoryId);
	}
	else if ( proc == "GetItemCategory" ) {
		GetItemCategory(resolution);
	}
	else if ( proc == "GetItemFunction" ) {
		GetItemFunction(resolution);
	}
	else if ( proc == "GetLocaionInfo" ) {
		GetLocaionInfo(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetLocationItems" ) {
		GetLocationItems(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetLocationRights" ) {
		GetLocationRights(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetLocationSprites" ) {
		GetLocationSprites(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetLocationUsers" ) {
		GetLocationUsers(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetSpriteSearch" ) {
		GetSpriteSearch(resolution, parsedUrl.userSession, parsedUrl.searchOffset, parsedUrl.argSearchName, parsedUrl.argSeachUserId, parsedUrl.argSearchUserSprites, parsedUrl.argSearchBaseItem, parsedUrl.argSpriteId);
	}
	else if ( proc == "GetUserGrantedLocationsList" ) {
		GetUserGrantedLocationsList(resolution, parsedUrl.userSession);
	}
	else if ( proc == "GetUserInfo" ) {
		GetUserInfo(resolution, parsedUrl.userSession, parsedUrl.userIdLookup);
	}
	else if ( proc == "LogoutSession" ) {
		LogoutSession(resolution, parsedUrl.userSession);
	}
	else if ( proc == "UpdateUser" ) {
		UpdateUser(resolution, parsedUrl.userSession, parsedUrl.argpassword, parsedUrl.argname, parsedUrl.argspriteId, parsedUrl.argemoteId, parsedUrl.argx, parsedUrl.argy, parsedUrl.argz, parsedUrl.argrotation, parsedUrl.arglocationName, parsedUrl.argbio, parsedUrl.argemail, parsedUrl.arglocationBio);
	}
	else if ( proc == "InsertUpdateRemoveLandItem" ) {
		InsertUpdateRemoveLandItem(resolution, parsedUrl.userSession, parsedUrl.argRemove, parsedUrl.arginventoryId, parsedUrl.argbaseItemId, parsedUrl.argspriteId, parsedUrl.argx, parsedUrl.argy, parsedUrl.argz, parsedUrl.argstate, parsedUrl.argheight, parsedUrl.argwidth, parsedUrl.argrotation, parsedUrl.argText);
	}
	else if ( proc == "debugJobTimeoutSession" ) {
		JobTimeoutSession(resolution);
	}
	else{
		SendError( resolution );
	}
	
}).listen( PORT );

////////////////////////////



//stored procedures
function UserLogin(resolution, userEmail, userPassword){
	if ( 
		   userEmail === undefined 
		|| userPassword === undefined 
	){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.UserLogin(' + mysql.escape(userEmail) + ', ' + mysql.escape(userPassword) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function MakeAccount(resolution, userEmail, userPassword, userName) {
		if ( 
		   userEmail === undefined 
		|| userPassword === undefined 
		|| userName === undefined
	){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.MakeAccount('+mysql.escape(userEmail)+', '+mysql.escape(userPassword)+', '+mysql.escape(userName)+');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function ChangeUserLocation(resolution, userSession, newLocationId){
	if ( userSession === undefined
	|| newLocationId === undefined )
	{
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.ChangeUserLocation('+mysql.escape(userSession)+', '+mysql.escape(newLocationId)+');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function ChangeUserSprite(resolution, userSession, newSpriteId){
	if ( userSession === undefined
	|| newSpriteId === undefined )
	{
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.ChangeUserSprite(' + mysql.escape(userSession) + ', '+mysql.escape(newSpriteId)+');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetBaseItem(resolution){
	con.query('call thefurs.GetBaseItem();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetChat(resolution, userSession){
	if ( userSession === undefined )
	{
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetChat(' + mysql.escape(userSession) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetEmots(resolution){
	con.query('call thefurs.GetEmots();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetErrorCodes(resolution){
	con.query('call thefurs.GetErrorCodes();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetGlobalData(resolution){
	con.query('call thefurs.GetGlobalData();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetGrantedLocationsList(resolution, userSession){
	if ( userSession === undefined )
	{
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetGrantedLocationsList('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetInventoryInfo(resolution, userSession, argInventoryId){
	if ( userSession === undefined
	|| argInventoryId === undefined	)
	{
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetInventoryInfo('+ mysql.escape(userSession) +', ' + mysql.escape(argInventoryId) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetItemCategory(resolution){

	con.query('call thefurs.GetItemCategory();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetItemFunction(resolution){
	con.query('call thefurs.GetItemFunction();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetLocaionInfo(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetLocaionInfo('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetLocationItems(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetLocationItems('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetLocationRights(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetLocationRights('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetLocationSprites(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetLocationSprites('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetLocationUsers(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetLocationUsers('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetSpriteSearch(resolution, userSession, searchOffset, argSearchName, argSeachUserId, argSearchUserSprites, argSearchBaseItem, argSpriteId){
	if ( userSession === undefined 
	|| searchOffset === undefined
	|| argSearchName === undefined
	|| argSeachUserId === undefined
	|| argSearchUserSprites === undefined
	|| argSearchBaseItem === undefined
	|| argSpriteId === undefined
	){
		SendError( resolution );
		return;
	}

	con.query('call thefurs.GetSpriteSearch('
	+ mysql.escape(userSession) + ','
	+ mysql.escape(searchOffset) + ','
	+ mysql.escape(argSearchName) + ','
	+ mysql.escape(argSeachUserId) + ','
	+ mysql.escape(argSearchUserSprites) + ','
	+ mysql.escape(argSearchBaseItem) + ','
	+ mysql.escape(argSpriteId) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetUserGrantedLocationsList(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetLocationUsers('+ mysql.escape(userSession) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function GetUserInfo(resolution, userSession, userIdLookup){
	if ( userSession === undefined || userIdLookup === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.GetUserInfo('+ mysql.escape(userSession) +','+ mysql.escape(userIdLookup) +');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function LogoutSession(resolution, userSession){
	if ( userSession === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.LogoutSession('+ mysql.escape(userSession) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function UpdateUser(resolution, userSession, argpassword, argname, argspriteId, argemoteId, argx, argy, argz, argrotation, arglocationName, argbio, argemail, arglocationBio){
		if ( userSession === undefined ||
		argpassword === undefined ||
		argname === undefined ||
		argspriteId === undefined ||
		argemoteId === undefined ||
		argx === undefined ||
		argy === undefined ||
		argz === undefined ||
		argrotation === undefined ||
		arglocationName === undefined ||
		argbio === undefined ||
		argemail === undefined ||
		arglocationBio === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.UpdateUser('
	+ mysql.escape(userSession) + ','
	+ mysql.escape(argpassword) + ','
	+ mysql.escape(argname) + ','
	+ mysql.escape(argspriteId) + ','
	+ mysql.escape(argemoteId) + ','
	+ mysql.escape(argx) + ','
	+ mysql.escape(argy) + ','
	+ mysql.escape(argz) + ','
	+ mysql.escape(argrotation) + ','
	+ mysql.escape(arglocationName) + ','
	+ mysql.escape(argbio) + ','
	+ mysql.escape(argemail) + ','
	+ mysql.escape(arglocationBio) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}


function InsertUpdateRemoveLandItem(resolution, userSession, argRemove, arginventoryId, argbaseItemId, argspriteId, argx, argy, argz, argstate, argheight, argwidth, argrotation, argText){

	if ( userSession === undefined ||
	argRemove === undefined ||
	arginventoryId === undefined ||
	argbaseItemId === undefined ||
	argspriteId === undefined ||
	argx === undefined ||
	argy === undefined ||
	argz === undefined ||
	argstate === undefined ||
	argheight === undefined ||
	argwidth === undefined ||
	argrotation === undefined ||
	argText === undefined ){
		SendError( resolution );
		return;
	}
	
	con.query('call thefurs.InsertUpdateRemoveLandItem('
	+ mysql.escape(userSession) + ','
	+ mysql.escape(argRemove) + ','
	+ mysql.escape(arginventoryId) + ','
	+ mysql.escape(argbaseItemId) + ','
	+ mysql.escape(argspriteId) + ','
	+ mysql.escape(argx) + ','
	+ mysql.escape(argy) + ','
	+ mysql.escape(argz) + ','
	+ mysql.escape(argstate) + ','
	+ mysql.escape(argheight) + ','
	+ mysql.escape(argwidth) + ','
	+ mysql.escape(argrotation) + ','
	+ mysql.escape(argText) + ');', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});

}


function JobTimeoutSession(resolution){
		con.query('call thefurs.JobTimeoutSession();', function (error, results, fields) {
		SendContent(resolution, JSON.stringify(results));
	});
}



//sending data back
function SendError( resolution ) {
  resolution.writeHead( 404, { 'Content-Type': 'text/html' } );
  resolution.write("");
  resolution.end();
  console.log( Date() + " sending error " );
}

function SendContent(resolution, data ) {
	data = (data === undefined ? JSON.stringify( {} ) : data ); //data error handling
	
	resolution.writeHead( 200, { 'Content-Type': 'text/html' } );
	resolution.write( data );
	resolution.end();
	console.log( Date() + " sending data " );
}