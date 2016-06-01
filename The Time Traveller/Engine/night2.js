//variables used when questions are posed in the game
//user interface
var questionmessage = document.getElementById('questionmessage');
var questionbox = document.getElementById('questionbox');
var questionimg = document.getElementById('questionimg');
var questionselection = 1;

var userinventory = [];
var removeditem = [];

//state of the player
var movement = "running";

var inventoryshown = 0;

var messagetimeout = 0;

//game physics engine for collision
var leftcollide = ""
var rightcollide = ""
var topcollide = ""
var downcollide = ""

var moveinterval = function(){};
var leftinterval = function (){};
var rightinterval = function (){};
var upinterval = function (){};
var downinterval = function (){};

var objecttype = "";

//entities for doors
var doorleftpic = "../../Door/Doorleft.png";
var doorrightpic = "../../Door/Doorright.png";
var doorleftopenpic = "../../Door/Dooropenleft.png";
var doorrightopenpic = "../../Door/Dooropenright.png";
var labdoorclosed = "../../Labdoor/Closed.png"
var labdooropen = "../../Labdoor/Open.png"

//entities for buttons
var buttonpic = "../../Button/Button.png";

var backpic = "../../Static/Back.png";
var frontpic = "../../Static/Front.png";
var leftpic = "../../Static/Left.png";
var rightpic = "../../Static/Right.png";

//entities for different sides of player character
var frontsprite = "../../SpriteFront/spritefront.gif";
var leftsprite = "../../Spriteleft/spriteleft.gif";
var rightsprite = "../../Spriteright/spriteright.gif";
var backsprite = "../../Spriteback/spriteback.gif";

var bgtop = 40-(selfposy*6);
var bgleft = 52-(selfposx*6);

var input = document.getElementById('input');
var bg = document.getElementById('bg');
var obg = document.getElementById('obg');
var obghigher = document.getElementById('obghigher');
var player = document.getElementById('playerimg');

var totalparse = 0;

function load(){
	bg.style.width = (JSON.parse(mapsize).x+1)*6+"vw";
	obg.style.width = (JSON.parse(mapsize).x+1)*6+"vw";
	obghigher.style.width = (JSON.parse(mapsize).x+1)*6+"vw";
	function existsinstorage(){
		try{
			JSON.parse(localStorage.getItem("inventory"));
		} catch (e) {
			return false;
		}
		return true;
	}
	if (existsinstorage()){
		userinventory = JSON.parse(localStorage.getItem("inventory"));
		removeditem = JSON.parse(localStorage.getItem("removeditem"));
	}
	for (var i in window){
		if (i[0] == "o"){
			switch(i[1]){
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
				var iniobject = JSON.parse(eval(i));
				iniobjectx = Number(i[1]*100) + Number(i[2]*10) + Number(i[3]);
				iniobjecty = Number(i[4]*100) + Number(i[5]*10) + Number(i[6]);
				var noobject = 0;
				for (var removingitem in removeditem){
					if (iniobject.name == removeditem[removingitem]){
						var noobject = 1;
						window[i] = undefined;
					}
				}
				var objectwidth = 0;
				var newobject = document.createElement("img");
				switch(iniobject.type){
					case "collideable":
					objectwidth = 0;
					noobject = 1;
					break;
					
					case "object":
					objectwidth = 1;
					newobject.src = iniobject.image;
					break;
					
					case "button":
					newobject.src = buttonpic;
					objectwidth = 1;
					break;
					
					case "doorleft":
					newobject.src = doorleftpic;
					objectwidth = 1;
					break;
					
					case "doorright":
					newobject.src = doorrightpic;
					objectwidth = 1;
					break;

					case "labdoor":
					newobject.src = labdoorclosed;
					objectwidth = 2;
				}
				if (noobject == 0){
					newobject.id = i;
					newobject.className = "before";
					newobject.style.position = "absolute";
					newobject.style.left = -3+(iniobjectx*6)+"vw";
					if (iniobjecty == 1){
						newobject.style.top = -3+(iniobjecty*6) + "vw";
						newobject.style.zIndex = 1;
					}
					else{
						newobject.style.top = 6+(iniobjecty*6) + "vw";
						newobject.style.zIndex = 2;
					}
					newobject.style.height = "auto";
					newobject.style.width = (objectwidth*6) + "vw";
					obg.appendChild(newobject)
				}
				else{
					continue;
				}
			}
		}
	};
	orientate();
	bg.style.top=bgtop+"vw";
	bg.style.left=bgleft+"vw";
	obg.style.top=bgtop+"vw";
	obg.style.left=bgleft+"vw";
	obghigher.style.top=bgtop+"vw";
	obghigher.style.left=bgleft+"vw";
	setTimeout(function(){ document.getElementById('Black').style.zIndex=-2 }, 1000);
	setTimeout(function(){ document.getElementById('Chaptertext').style.color = "white"},1500);
	setTimeout(function(){ document.getElementById('Chaptertext').style.color = "black"},5000);
	setTimeout(function(){ document.getElementById('Chaptertext').style.display = "none"},6000);
}

//moving the player around using the WASD keys
function move(dir){
	switch(dir){
		case "W":
		case "w":
		case "Up":
		orientation = "Up";
		selfposy -= 1;
		player.src= backsprite;
		break;
		
		case "A":
		case "a":
		case "Left":
		orientation = "Left";
		selfposx -= 1;
		player.src= leftsprite;
		break;
		
		case "S":
		case "s":
		case "Down":
		orientation = "Down";
		selfposy += 1;
		player.src= frontsprite;
		break;
		
		case "D":
		case "d":
		case "Right":
		orientation = "Right";
		selfposx += 1;
		player.src= rightsprite;
		break;
		
		case "jump":
		case "Jump":
		player.style.top="43vh";
		setTimeout(function(){ 
			player.style.top="48vh";
		}, 300);
		break;
		
		case "Q":
		case "q":
		if (inventoryshown == 0){
			document.getElementById('inventory').style.display="block";
			setTimeout(function(){document.getElementById('inventory').style.opacity="1";},200)
			inventoryshown = 1;
		}
		else{
			document.getElementById('inventory').style.opacity="0";
			setTimeout(function(){document.getElementById('inventory').style.display="none";},200)
			inventoryshown = 0;
		}
		break;

		case "E":
		case "e":
		var selfposxit = selfposx;
		var selfposyit = selfposy;
		switch(orientation){
			case "Up":
			selfposyit -= 1;
			break;
			
			case "Down":
			selfposyit += 1;
			break;
			
			case "Left":
			selfposxit -= 1;
			break;
			
			case "Right":
			selfposxit += 1;
		}
		if (selfposxit.toString().length == 1){
			selfposxit = "00"+selfposxit;
		}
		else if (selfposxit.toString().length == 2){
			selfposxit = "0"+selfposxit;
		}

		if (selfposyit.toString().length == 1){
			selfposyit = "00"+selfposyit;
		}
		else if (selfposyit.toString().length == 2){
			selfposyit = "0"+selfposyit;
		}
		var poscode = "o"+selfposxit+selfposyit;
		function IsJsonString(str) {
			try {
				JSON.parse(eval(poscode));
			} catch (e) {
				return false;
			}
			return true;
		}
		if (IsJsonString(poscode) == true) {
			var objectbyid =  document.getElementById(poscode);
			var object = JSON.parse(eval(poscode));
			if(object.goto != "null"){
				window.location.href = object.goto;
			}
			switch(object.type){
				case "labdoor":
				var objectstate = objectbyid.className;
				switch(objectstate){
					case "before":
					objectbyid.className = "after";
					objectbyid.src = labdooropen;
					break;
					case "after":
					objectbyid.className = "before";
					objectbyid.src = labdoorclosed;
				}
				break;
				case "object":
					userinventory.push(object.name);
					removeditem.push(object.name);
					window.localStorage.setItem("inventory", JSON.stringify(userinventory));
					window.localStorage.setItem("removeditem", JSON.stringify(removeditem));
					eval(object.function)
					document.getElementById(poscode).remove();
					console.log(window[poscode])
					window[poscode] = undefined;	//fixed with much thanks to Stackoverflow user: BadIdeaException
				break;
				case "button":
					objectbyid.src = buttonpic;
				break;
				case "doorleft":
				var objectstate = objectbyid.className;
				switch(objectstate){
					case "before":
					objectbyid.className = "after";
					objectbyid.src = doorleftopenpic;
					break;
					case "after":
					objectbyid.className = "before";
					objectbyid.src = doorleftpic;
				}
				case "bothdoors":
				var leftdoor = document.getElementById(object.leftdoor);
				var rightdoor = document.getElementById(object.rightdoor);
				var leftdoorstate = leftdoor.className;
				var rightdoorstate = rightdoor.className;
				switch(leftdoorstate){
					case "before":
					leftdoor.className = "after";
					leftdoor.src = doorleftopenpic;
					break;
					case "after":
					leftdoor.className = "before";
					leftdoor.src = doorleftpic;
				}
				switch(rightdoorstate){
					case "before":
					rightdoor.className = "after";
					rightdoor.src = doorrightopenpic;
					break;
					case "after":
					rightdoor.className = "before";
					rightdoor.src = doorrightpic;
				}
				break;
				case "doorright":
				var objectstate = objectbyid.className;
				switch(objectstate){
					case "before":
					objectbyid.className = "after";
					objectbyid.src = doorrightopenpic;
					break;
					case "after":
					objectbyid.className = "before";
					objectbyid.src = doorrightpic;
				}
			}
		}
	}
	var bgtop = 40-(selfposy*6);
	var bgleft = 52-(selfposx*6);
	bg.style.top=bgtop+"vw";
	bg.style.left=bgleft+"vw";
	obg.style.top=bgtop+"vw";
	obg.style.left=bgleft+"vw";
	obghigher.style.top=bgtop+"vw";
	obghigher.style.left=bgleft+"vw";
}

//game physics engine-collider for player
function checkpos(){

	if (selfposy<2){
		selfposy=2;
		var bgtop = 40-(selfposy*6);
		var bgleft = 52-(selfposx*6);
		bg.style.top=bgtop+"vw";
		bg.style.left=bgleft+"vw";
		obg.style.top=bgtop+"vw";
		obg.style.left=bgleft+"vw";
		obghigher.style.top=bgtop+"vw";
		obghigher.style.left=bgleft+"vw";
		//collider
	}
	if (selfposy>(JSON.parse(mapsize).y)+1){
		selfposy=(JSON.parse(mapsize).y+1);
		var bgtop = 40-(selfposy*6);
		var bgleft = 52-(selfposx*6);
		bg.style.top=bgtop+"vw";
		bg.style.left=bgleft+"vw";
		obg.style.top=bgtop+"vw";
		obg.style.left=bgleft+"vw";
		obghigher.style.top=bgtop+"vw";
		obghigher.style.left=bgleft+"vw";
		//collider
	}

	if (selfposx==0){
		selfposx=1;
		var bgtop = 40-(selfposy*6);
		var bgleft = 52-(selfposx*6);
		bg.style.top=bgtop+"vw";
		bg.style.left=bgleft+"vw";
		obg.style.top=bgtop+"vw";
		obg.style.left=bgleft+"vw";
		obghigher.style.top=bgtop+"vw";
		obghigher.style.left=bgleft+"vw";
		//collider
	}

	if (selfposx>(JSON.parse(mapsize).x)){
		selfposx=(JSON.parse(mapsize).x);
		var bgtop = 40-(selfposy*6);
		var bgleft = 52-(selfposx*6);
		bg.style.top=bgtop+"vw";
		bg.style.left=bgleft+"vw";
		obg.style.top=bgtop+"vw";
		obg.style.left=bgleft+"vw";
		obghigher.style.top=bgtop+"vw";
		obghigher.style.left=bgleft+"vw";
		//collider
	}

	selfposxit = selfposx;
	selfposyit = selfposy;
	if (selfposxit.toString().length == 1){
		selfposxit = "00"+selfposxit;
	}
	else if (selfposxit.toString().length == 2){
		selfposxit = "0"+selfposxit;
	}

	if (selfposyit.toString().length == 1){
		selfposyit = "00"+selfposyit;
	}
	else if (selfposyit.toString().length == 2){
		selfposyit = "0"+selfposyit;
	}
	var poscode = "o"+selfposxit+selfposyit;
	function IsJsonString(str) {
		try {
			JSON.parse(eval(poscode));
		} catch (e) {
			return false;
		}
		return true;
	}
	if (IsJsonString(poscode) == true) {
		var linkmessage = 0;
		var objectbyid =  document.getElementById(poscode);
		var object = JSON.parse(eval(poscode));
		if (object.type == "collideable"||object.type == "object"){
			switch(orientation){
				case "Up":
				selfposy += 1;
				break;
				case "Left":
				selfposx += 1;
				break;
				case "Down":
				selfposy -= 1;
				break;
				case "Right":
				selfposx -= 1;
			}
			var bgtop = 40-(selfposy*6);
			var bgleft = 52-(selfposx*6);
			bg.style.top=bgtop+"vw";
			bg.style.left=bgleft+"vw";
			obg.style.top=bgtop+"vw";
			obg.style.left=bgleft+"vw";
			obghigher.style.top=bgtop+"vw";
			obghigher.style.left=bgleft+"vw";
			linkmessage = object.goto;	
			if (object.type == "object"){
				largemessage("I should press 'e' to use it!");
			}					
			else if (linkmessage == "null"){
				largemessage("I can't get there!");
			}
			else{
				largemessage("I should press 'e' to use it!");
			}
		}			
	}

	
}

//how the player moves when jumping (legacy code)
function jump(){
	player.style.top="25vh";
	setTimeout(function(){ 
		player.style.top="30vh";
	}, 100);
}

var lastEvent;
var heldKeys = {};

window.onkeydown = function(event) {
	if (movement == "running"){
		if (lastEvent && lastEvent.keyCode == event.keyCode) {
			return;
		}
		lastEvent = event;
		heldKeys[event.keyCode] = true;
		switch (event.keyCode) {
			case 65:
			case 37:
				leftinterval = setInterval(function(){move("Left"); checkpos();}, 250);
			break;
			case 87:
			case 38:
			upinterval = setInterval(function(){move("Up");  checkpos();}, 250);
			break;
			case 68:
			case 39:
				rightinterval = setInterval(function(){move("Right");  checkpos();}, 250);
			break;
			case 83:
			case 40:
			downinterval = setInterval(function(){move("Down"); checkpos();}, 250);
			break;
			case 81:
			move('q');
			break;
			case 69:
			move('e');
		}
	}
};

document.onkeyup = function(e) {
	lastEvent = null;
	delete heldKeys[event.keyCode];
	clearInterval(leftinterval);
	clearInterval(rightinterval);
	clearInterval(upinterval);
	clearInterval(downinterval);
	orientate();
	leftinterval = false;
	upinterval = false;
	rightinterval = false;
	downinterval = false;
	setTimeout(function(){
		clearTimeout(messagetimeout)
		messagetimeout = false
		var largedialoguebox = document.getElementById('dialoguebox');
		largedialoguebox.style.top="101vh";
	},500);
}

//how a large message would appear at the bottom of the screen
//user interface
function largemessage(message="..."){
		messagetimeout = setTimeout(function(){
		var largedialoguebox = document.getElementById('dialoguebox');
		largedialoguebox.style.top = "80vh";
		var largemessagebox = document.getElementById('dialoguemessage');
		largemessagebox.innerHTML = message;},500)
}
function question(question="...",option1="...",option2="...",callback){
		usersanswer = 0;
		movement = "pause";
		questionbox.style.top = "75vh";
		questionselection = 1;
		questionmessage.innerHTML = question;
		document.getElementById('option1').style.top = "93vh";
		document.getElementById('option1').innerHTML = option1;
		document.getElementById('option2').style.top = "93vh";
		document.getElementById('option2').innerHTML = option2;
		window.onkeydown = function(event) {
	
		if (lastEvent && lastEvent.keyCode == event.keyCode) {
			return;
		}
		lastEvent = event;
		heldKeys[event.keyCode] = true;
		switch(event.keyCode){
			case 65:
			case 37:
			case 68:
			case 39:
				if (questionselection == 1){
						questionselection = 0;
						questionimg.src = "../../Dialoguebox/Question2.png";
					}
				else{
					questionselection = 1;
					questionimg.src = "../../Dialoguebox/Question1.png";
				}
			break;
			case 69:
				usersanswer = questionselection;
				movement = "running";
				questionmessage = "";
				questionbox.style.top = "101vh";
				document.getElementById('option1').style.top = "101vh";
				document.getElementById('option1').innerHTML = "";
				document.getElementById('option2').style.top = "101vh";
				document.getElementById('option2').innerHTML = "";
				callback(usersanswer);
		}
	};
}

//how a small message would appear at the bottom of the screen
//user interface
function smallmessage(message="..."){
		setTimeout(function(){
		var smalldialoguebox = document.getElementById('smalldialoguebox');
		smalldialoguebox.style.opacity = 1;
		var smallmessagebox = document.getElementById('smalldialoguemessage');
		smallmessagebox.innerHTML = message;},1000);
		setTimeout(function (){
			smalldialoguebox.style.opacity=0;
		},5000)
}

//how the player picture would change in relation to player movement
function orientate(){
	switch(orientation){
		case "Up":
		case "up":
		player.src=backpic;
		break;
		case "Left":
		case "left":
		player.src=leftpic;
		break;
		case "Down":
		case "down":
		player.src=frontpic;
		break;
		case "Right":
		case "right":
		player.src=rightpic;
		break;
	}
}
