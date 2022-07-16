start = Date.now();
RATE = 0.002
var goal_sea_level = 0.5;
var current_sea_level = 1;
var rise_or_fall_rate = -RATE;
var picture_ind = -1;
var API_IP = "http://127.0.0.1:5000"

function map_meter_to_px(sea_level_m){
	var max_level = 0.8;
	var min_level = 0.2;
	var max_meter = 1;
	var min_meter = 0;

	var animation_frame = document.getElementById("animation_frame");
	sea_level_perc = (max_level - min_level) / (max_meter - min_meter) * sea_level_m;
	return (1 - sea_level_perc - min_level) * animation_frame.clientHeight;
}

function set_sea_level(sea_level_m){
	var sea_img = document.getElementById("sea");
	//console.log(map_meter_to_px(sea_level_m));
	current_sea_level = sea_level_m;
	sea_img.style.top = map_meter_to_px(sea_level_m);
	if (picture_ind == -1){
		sea_img.src = "/static/imgs/Meer.jpg";
		picture_ind*=-1;
	}else{
		sea_img.src = "/static/imgs/Meer.jpg";
		picture_ind*=-1;
	}
}

function animateSeaLevel(){
	var input_field = document.getElementById("input_sea_level");
	let start = Date.now()
	let goal_sea_level = input_field.value;
	console.log("the goal: "+goal_sea_level);
	if (goal_sea_level >= current_sea_level){
		rise_or_fall_rate = RATE;
	} else{
		rise_or_fall_rate = -RATE;
	}

	let timer = setInterval(function() {
  	// how much time passed from the start?
  		let timePassed = Date.now() - start;

		// if current_sea_level and goal_sea_level are the same stop the animation
		if ((current_sea_level - goal_sea_level)*rise_or_fall_rate > 0){
			return;
		}else{
			console.log("current:"+current_sea_level);
			set_sea_level(current_sea_level + rise_or_fall_rate );}
	}, 20);
}


function animateSeaLevelUsingCO2(){
	var input_field = document.getElementById("input_co2_gesamt_uni");
	fetch(API_IP+"/uni_co2",{
		method: "POST",
		headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'},
		body: '{"uni_co2" : '+input_field.value+'}'})
	.then((res) => res.json())
	.then((data) => {
		console.log("I got: "+data.sea_level);

		var input_field = document.getElementById("input_sea_level");
		input_field.value = data.sea_level;
	})
	.then(() => animateSeaLevel())
}

function animateSeaLevelUsingEnergy(){
	var input_field_strom = document.getElementById("input_stromverbrauch");
	var input_field_waerme = document.getElementById("input_waerme");
	
	fetch(API_IP+"/uni_energy",{
		method: "POST",
		headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'},
		body: '{"uni_strom" : '+input_field_strom.value+','
				+ '"uni_waerme":  '+input_field_waerme.value +
				'}'})
	.then((res) => res.json())
	.then((data) => {
		console.log("I got: "+data.sea_level);

		var input_field = document.getElementById("input_sea_level");
		input_field.value = data.sea_level;
	})
	.then(() => animateSeaLevel());
}

animateSeaLevel();
