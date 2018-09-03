note on errors
===============
sometimes you may get a freindly error like:
{"errorId":6,"errorText":"Online already"}
Anything with a errorId more than one is an error. 1 is no error. The errorText is a discription of the error.
A blank brakeit is also and error like: {}

stored procedures
=================
*arguemnts/datatypes are between {}.
*most calls are context senstive based on pased actions on a Session id.
*replace thefurs.net:8080/
*there are a few test acounts. two of them have the username/password/email of "a/a/a" and "b/b/b". You can also make your own on the api


UserLogin
----------
ex: 192.168.0.8:8080/?proc=UserLogin&userEmail={char(255)}&userPassword={char(64)}
re: {"userId":30,"sessionId":"bb39a1cfb256134de3de15cf9ef1e26317322c34503ed1616a6edbf0844875e5"}


MakeAccount
-----------
ex: 192.168.0.8:8080/?proc=MakeAccount&userEmail={char(255)}&userPassword={char(64)}&userName={char(16)}
re: {"errorId":1,"errorText":"No errors"}
note: does not log the user in


ChangeUserLocation
===================
ex: 192.168.0.8:8080/?proc=ChangeUserLocation&userSession={char(64)}&newLocationId={int}
re: {"errorId":1,"errorText":"No errors"}


ChangeUserSprite
================
ex: 192.168.0.8:8080/?proc=ChangeUserSprite&userSession={char(64)}&newSpriteId={int}
re: {"errorId":1,"errorText":"No errors"}


GetBaseItem
===========
ex: http://192.168.0.8:8080/?proc=GetBaseItem
re: {"baseItemId":1,"itemFunctionId":2,"solid":1,"tileable":0,"name""test base item","text":"used to test base item stuff","itemCategoryId":2,"defaultSpriteId":2,"created":"2018-08-14T18:57:39.000Z"} ... <-elipises means you could get from 0 to many
note: some items have no arguments


GetChat
=======
ex: 192.168.0.8:8080/?proc=GetChat&userSession={char(64)}
re: {"userIdFrom":30,"userName":"b","text":"hello world!","created":"2018-08-14T19:24:44.000Z"}....


GetEmots
========
ex: 192.168.0.8:8080/?proc=GetEmots
re: {"emotId":1,"name":"non","public":1,"created":"2018-08-06T19:08:28.000Z"}...


GetErrorCodes
=============
ex: http://192.168.0.8:8080/?proc=GetErrorCodes
re: {"errorId":1,"errorText":"No errors"} ...
note: these are the friendly error codes that you will get from the other sections


GetLocaionInfo
==============
ex: 192.168.0.8:8080/?proc=GetLocaionInfo&userSession={char(64)}
re: {"locationName":"locaion b","locationBio":"land b bio","locationId":30}


GetGlobalData
=============
ex: http://192.168.0.8:8080/?proc=GetGlobalData
re: {"version":0,"tileWidth":32,"tileHeight":32,"tileDepth":32,"accountCreation":1,"login":1,"pullRate":60000,"mapPullRate":500,"userPullRate":100,"chatPullRate":1000,"maxLandItems":50000,"maxLandUsers":100,"created":"2018-08-10T17:10:18.000Z","graphicsPullRate":5000,"motd":"test motd","serverOffline":0,"serverTime":"2018-08-14T20:14:09.000Z"}


GetGrantedLocationsList
=======================
ex: 192.168.0.8:8080/?proc=GetGrantedLocationsList&userSession={char(64)}
re: {"locationOwner":"a","locationName":"locaion a","bio":"a bio","locationId":29}
note: these are the places the users can go to (has been granted by others)


GetInventoryInfo
================
ex: 192.168.0.8:8080/?proc=GetInventoryInfo&userSession={char(64)}&argInventoryId={int}
re: {"baseItemId":1,"spriteId":2,"created":"2018-08-14T20:46:37.000Z","text":"inv text 1","spriteName":"test sprite","icon":"test icon","baseItemName":"test base item"}..
note: this is used to get more info on a item


GetItemCategory
===============
ex: 192.168.0.8:8080/?proc=GetItemCategory
re: {"itemCategoryId":1,"name":"non","created":"2018-08-06T19:09:03.000Z"}...
note: just used for organization


GetItemFunction
===============
ex: 192.168.0.8:8080/?proc=GetItemFunction
re: {"itemFunctionId":1,"name":"non","created":"2018-08-06T19:09:16.000Z"}...


GetLocationItems
================
ex: 192.168.0.8:8080/?proc=GetLocationItems&userSession={char(64)}
re: {"inventoryId":1,"baseItemId":1,"locationId":30,"spriteId":2,"x":1,"y":1,"z":1,"state":0,"height":20,"width":30,"rotation":1}...
note: this will give you all the items on the map to draw the full map


GetLocationRights
=================
ex: 192.168.0.8:8080/?proc=GetLocationRights&userSession={char(64)}
re: {"userIdGrant":30,"edit":1,"created":"2018-08-14T20:24:50.000Z","name":"b"}...
note: these are the users allowed to visit this users land. The edit feild means that that user can edit your land


GetLocationSprites
=================
ex: 192.168.0.8:8080/?proc=GetLocationSprites&userSession={char(64)}
re: {"spriteId":2,"sprite":"test data"}...
note: please cache these values and update them sparingly. 


GetLocationUsers
================
ex: 192.168.0.8:8080/?proc=GetLocationUsers&userSession={char(64)}
re: {"userId":29,"admin":0,"name":"a","spriteId":1,"emoteId":null,"locationId":29,"x":0,"y":0,"z":0,"rotation":0}...


GetSpriteSearch
===============
ex: 192.168.0.8:8080/?proc=GetSpriteSearch&userSession={char(64)}&searchOffset={int}&argSearchName={char(32)}&argSeachUserId={int}&argSearchUserSprites={int}&argSearchBaseItem={int}&argSpriteId={int}
re: {"spriteId":1,"userIdCreated":null,"name":"Base User Sprite","userCreatedName":null,"modified":"2018-08-10T15:09:24.000Z","bio":"Default","icon":"base icon","public":1,"userSprite":1,"baseItemId":null}....
note: search the sprite database, only shows top 20 ordered by modified (can be offsetted)
searchOffset: 0 no offset
listed below are the default values to put in for the search to ignore those arguemnts
argSearchName: '' (blank string)
argSeachUserId: 0
argSearchUserSprites: -1 (to ignore, 1 to search only sprites that can be used on users, 0 for ones that cant)
baseItemId: 0
argSpriteId: 0


GetUserGrantedLocationsList
===========================
ex: 192.168.0.8:8080/?proc=GetUserGrantedLocationsList&userSession={char(64)}
re: {"userId":29,"admin":0,"name":"a","spriteId":1,"emoteId":null,"locationId":29,"x":0,"y":0,"z":0,"rotation":0}...
note: this list tells the user who they gave rights to for their land


GetUserInfo
===========
ex: 192.168.0.8:8080/?proc=GetUserInfo&userSession={char(64)}&userIdLookup={int}
re: {"admin":0,"created":"2018-08-10T14:31:51.000Z","name":"a","bio":"a bio","SpriteIconData":"base icon"}


LogoutSession
=============
ex: 192.168.0.8:8080/?proc=LogoutSession&userSession={char(64)}
re: {"errorId":1,"errorText":"No errors"}


UpdateUser
==========
ex: 192.168.0.8:8080/?proc=UpdateUser&userSession=d6b44068e9bae15b81e14756f844bf9b5116d6daed61b9a89ce2a718376b0b1c&argpassword=&argname=&argspriteId=0&argemoteId=0&argx=-1&argy=-1&argz=-1&argrotation=-1&arglocationName=&argbio=&argemail=&arglocationBio=
re: {"errorId":1,"errorText":"No errors"}
note: values that should be used to reuse old values
argpassword: blank
argname: blank
argspriteId: 0
argemoteId: 0
argx: -1
argx: -1
argx: -1
argrotation: -1
arglocationName: blank
argbio: blank
argemail: blank
arglocationBio: blank


InsertUpdateRemoveLandItem
==========================
ex: 192.168.0.8:8080/?proc=InsertUpdateRemoveLandItem&userSession={char(64)}&argRemove={int}&arginventoryId={int}&argbaseItemId=0&argspriteId=0&argx={int}&argy={int}&argz={int}&argstate={int}&argheight={int}&argwidth={int}&argrotation={int}&argText=char(255)}
re: {"errorId":1,"errorText":"No errors"} Or {"inventoryId":1} when you insert a new one
note:
argRemove: 0 to remove
arginventoryId: zero for new item

ignord values
argbaseItemId: 0
argspriteId: 0
argx: -1
argy: -1
argz: -1
argstate: -1
argheight: -1
argwidth: -1
argrotation: -1
argText: blank


debugJobTimeoutSession
======================
ex: 192.168.0.8:8080/?proc=debugJobTimeoutSession
re: only the quary data will come back ex. {"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
note: forces the timeout job. logs out accounts with no activity for 15 seconds


InsertUpdateRemoveSprite (uses post)
====================================
ex:
{
	"userSession": "656d769f96527aa1e776cd8da9091b1d33e3ef1fc3bc25b6b1a9e08e95590d66", //char(64)
	"argRemove": 1, //int, zero to remove, one to keep. must be set
	"argPublic": 1, //int, -1 to keep its setting. else 0/1
	"argUserSprite": 1, //int, -1 to keep
	"argName": "hhh", //char(32), blank string "" to leave same
	"argBio": "bio sprite service", //char(255), blank string "" to leave same
	"argSprite": "data sprite service", //text, blank string "" to leave same
	"argIcon": "icon sprite service", //text, blank string "" to leave same
	"argSpriteId": 7, //int, 0 to add new sprite or old sprite it to mod old one
	"argBaseItemId": 0 //int, 0 to not set
}

re: {"errorId":1,"errorText":"No errors"}