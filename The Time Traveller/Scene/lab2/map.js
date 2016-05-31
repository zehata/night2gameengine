var mapsize = '{"x":10, "y":6}';

var o001002 = '{"type":"collideable", "goto":"null"}';
var o002002 = '{"type":"collideable", "goto":"null"}';
var o003002 = '{"type":"collideable", "goto":"null"}';
var o004002 = '{"type":"collideable", "goto":"null"}';
var o005002 = '{"type":"collideable", "goto":"null"}';
var o006002 = '{"type":"collideable", "goto":"null"}';
var o007002 = '{"type":"collideable", "goto":"null"}';
var o008002 = '{"type":"collideable", "goto":"null"}';
var o002003 = '{"type":"collideable", "goto":"null"}';
var o003003 = '{"type":"collideable", "goto":"null"}';
var o004003 = '{"type":"collideable", "goto":"null"}';
var o005003 = '{"type":"collideable", "goto":"null"}';
var o001004 = '{"type":"collideable", "goto":"null"}';
var o003004 = '{"type":"collideable", "goto":"null"}';
var o002005 = '{"type":"collideable", "goto":"null"}';
var o003005 = '{"type":"collideable", "goto":"null"}';
var o003006 = '{"type":"collideable", "goto":"null"}';
var o004006 = '{"type":"collideable", "goto":"null"}';
var o006007 = '{"type":"object", "name":"time_machine", "image":"../../Objects/scenes/timemachine.png" ,"function":"inventory();", "goto":"null"}';
var o009001 = '{"type":"labdoor", "goto":"null"}';

// largemessage(); 		for banner message
// smallmessage("smallmessage");		for fading small message
// question("Yes?","Yes!","nope.",function(answer){smallmessage(answer);});
// for asking question. Anonymous function receives and do something with the answer

function inventory(){
	smallmessage("Press \"Q\" to open inventory!")
}