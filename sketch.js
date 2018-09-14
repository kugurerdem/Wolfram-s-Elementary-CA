var WIDTH = 420;
var HEIGHT = 640;
var w = 1;

var cells = new Array(WIDTH/w);
var ruleset = [0,0,0,1,1,1,1,0]; 
var generation = 0;

for (var i = 0; i < cells.length; i++) {
	cells[i] = 0;
}

cells[Math.round(cells.length/2)] = 1;

function setup() {
	createCanvas(WIDTH,HEIGHT);  
	ctx = document.getElementById('defaultCanvas0').getContext('2d');
	// frameRate(16);
}

function draw() {
	// background(0);
	show();
	generate();
}

function generate(){
	var newcells = [];
	
	for(var i = 0; i < cells.length; i++){
		var left = cells[index(i-1)];
		var middle = cells[i];
		var right = cells[index(i+1)];

		var newState = rules(left, middle, right);
		
		newcells[i] = newState;
	}

	cells = newcells;
	if(generation < HEIGHT/w - 1){
		generation++;
	} else{
		generation = HEIGHT/w - 1;
		var imageData = ctx.getImageData(0,w,WIDTH,HEIGHT);
		ctx.putImageData(imageData, 0, 0); 
	}
}

function rules(a,b,c){
	if (a == 1 && b == 1 && c == 1) return ruleset[0];
	else if (a == 1 && b == 1 && c == 0) return ruleset[1];
	else if (a == 1 && b == 0 && c == 1) return ruleset[2];
	else if (a == 1 && b == 0 && c == 0) return ruleset[3];
	else if (a == 0 && b == 1 && c == 1) return ruleset[4];
	else if (a == 0 && b == 1 && c == 0) return ruleset[5];
	else if (a == 0 && b == 0 && c == 1) return ruleset[6];
	else if (a == 0 && b == 0 && c == 0) return ruleset[7];

	return 0;
}

function show(){
	for (var i = 0; i < cells.length; i++) {
		if (cells[i] == 1) stroke(255);
		else stroke(0);

		// rect(i*w, generation*w, w, w);
		point(i*w, generation*w);
	}
}

function index(i){
	return (i<0) ? (cells.length + i) : (i % cells.length)
}