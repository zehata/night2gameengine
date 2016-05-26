//dimensions of the map 
var mapsize = '{"x":10, "y":10}';

//collision objects
//some are interactive - can be linked into other maps
//others are not interactive- they are only there for aesthetic purposes
//naming convention of objects is as follows, "o" + x-coordinate of object + y-coordinate of object
var o004008 = '{"type":"collideable", "goto":"null"}';
var o005008 = '{"type":"collideable", "goto":"null"}';
var o006008 = '{"type":"collideable", "goto":"null"}';
var o006007 = '{"type":"collideable", "goto":"null"}';
var o007008 = '{"type":"collideable", "goto":"null"}';
var o008008 = '{"type":"collideable", "goto":"null"}';
var o008009 = '{"type":"collideable", "goto":"null"}';
var o005007 = '{"type":"collideable", "goto":"null"}';
var o007009 = '{"type":"collideable", "goto":"null"}';
var o006009 = '{"type":"collideable", "goto":"null"}';
var o010006 = '{"type":"collideable", "goto":"null"}';
var o008006 = '{"type":"collideable", "goto":"null"}';
var o009006 = '{"type":"collideable", "goto":"null"}';
var o007006 = '{"type":"collideable", "goto":"null"}';
var o008005 = '{"type":"collideable", "goto":"null"}';
var o007004 = '{"type":"collideable", "goto":"null"}';
var o006004 = '{"type":"collideable", "goto":"null"}';
var o005004 = '{"type":"collideable", "goto":"null"}';
var o004004 = '{"type":"collideable", "goto":"null"}';
var o003005 = '{"type":"collideable", "goto":"../levels/lab2.html"}';
var o002005 = '{"type":"collideable", "goto":"../levels/lab2.html"}';
var o001006 = '{"type":"collideable", "goto":"null"}';
var o001007 = '{"type":"collideable", "goto":"null"}';
var o002008 = '{"type":"collideable", "goto":"null"}';
var o002009 = '{"type":"collideable", "goto":"null"}';
var o002010 = '{"type":"collideable", "goto":"null"}';
var o003010 = '{"type":"collideable", "goto":"null"}';

function popup (){
	smallmessage("Press WASD to move around");
	setTimeout(function(){smallmessage("Arrow keys works too")},5000);
}
// largemessage(); 		for banner message
// smallmessage("smallmessage");		for fading small message
// question("Yes?","Yes!","nope.",function(answer){smallmessage(answer);});
// for asking question. Anonymous function receives and do something with the answer
