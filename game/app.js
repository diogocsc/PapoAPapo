
/* Note : Cards variable is declared in cards.js file, which should be loaded before app.js"*/

var playCards = cards;
var usedDeck = [];
var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');


function getcards (){
	
     // console.log(cards);
      mycards = cards.split("},"); 

      for (i=0; i<mycards.length; i++){
        if(i==0){
          mycards[i]=mycards[i].replace("[","");
        }
        if (i!=mycards.length -1){
          mycards[i]+="}";  
        }
		else {
			mycards[i]=mycards[i].replace("]","");
		}
      //  console.log(cards[i]);
        mycards[i]=JSON.parse(mycards[i]);
      }
	  playCards = mycards;
      startMeUp();
}

getcards();



function startMeUp() {
  if (document.readyState == 'complete' ) {
    loadcard();
  } else {
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
          loadcard();
        }
    }
  }
}


/* from https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/* borrowed from https://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm*/

function loadcard() {

var ixcard = getRandomInt(0,playCards.length-1);
var card;
let url="";
if (ixcard != undefined && ixcard != -1) {
	card = playCards[ixcard].card;
    url = playCards[ixcard].url;

      usedDeck.push(card);
      playCards.splice(ixcard,1);
}
      if(card == undefined) {
        card = "Chegou ao fim do baralho. Clique em Recomeçar para continuar"
		document.getElementById("main").innerHTML = ' <div class="card main"> '+ card + '</div>'
      }
      else if(url !="") {
		  document.getElementById("main").innerHTML = ' <div class="card main"> <img src="' + url + '" alt='+ card +' width="300" height="400"></div>' 
	  } 
	  else document.getElementById("main").innerHTML = ' <div class="card main"> '+ card + '</div>'

      
}

function restart(){
  
  getcards();
  usedDeck = [];
//  loadcard();
  
}
