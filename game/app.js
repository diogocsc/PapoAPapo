
/* Note : Cards variable is declared in cards.js file, which should be loaded before app.js"*/

var playCardss;
var usedDeck = [];
var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

// from https://stackoverflow.com/a/28461750/1461972
var promptCount = 0;
window.pw_prompt = function(options) {
    var lm = options.lm || "Palavra-Passe:",
        bm = options.bm || "Submeter";
    if(!options.callback) { 
        alert("No callback function provided! Please provide one.") 
    };
                   
    var prompt = document.createElement("div");
    prompt.className = "pw_prompt";
    
    var submit = function() {
        options.callback(input.value);
        document.body.removeChild(prompt);
    };

    var label = document.createElement("label");
    label.textContent = lm;
    label.for = "pw_prompt_input" + (++promptCount);
    prompt.appendChild(label);

    var input = document.createElement("input");
    input.id = "pw_prompt_input" + (promptCount);
    input.type = "password";
    input.addEventListener("keyup", function(e) {
        if (e.keyCode == 13) submit();
    }, false);
    prompt.appendChild(input);

    var button = document.createElement("button");
    button.textContent = bm;
    button.addEventListener("click", submit, false);
    prompt.appendChild(button);

    document.body.appendChild(prompt);
};




function getcards (){
	pw_prompt({
    lm:"Por favor introduza a sua palavra passe:", 
    callback: function(password) {
      if(password=="p4po4p4po2020"){
			// console.log(cards);
		  alert("Bem-vind@ ao Papo a Papo. Bom jogo!");

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
		else {
			document.getElementById("main").innerHTML = ' <div class="card main"> Para jogar, precisa de primeiro efetuar pagamento (5 eur) ou ter um baralho físico. Para mais informações por favor envie email para papoapapo2020@gmail.com</div>'
		}
    }
});
     
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

var ixcard;
if(playCards.length>1){ 
	ixcard = getRandomInt(0,playCards.length);
}
else {
	ixcard = getRandomInt(0,playCards.length-1);
}
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
		document.getElementById("main").innerHTML = ' <div class="card main"><div class="padTop"> '+ card + '</div></div>'
      }
      else if(url !="") {
		  document.getElementById("main").innerHTML = ' <div class="card main"> <img src="' + url + '" alt='+ card +' width="300" height="400"></div>' 
	  } 
	  else document.getElementById("main").innerHTML = ' <div class="card main"><div class="padTop"> '+ card + '</div></div>'

     document.getElementById("main").innerHTML +=  '<div class="next" title="Próxima Carta" onclick="loadcard();"> Seguinte</div>'
     +'<div class="restart" title="Recomeçar" onclick="restart();"> Recomeçar</div>'
      
}

function restart(){
  
  getcards();
  usedDeck = [];
//  loadcard();
  
}
