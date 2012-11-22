
/*
 * Simple scaffolding javascript objects
 * to support the action engine.
 * and support methods attached
 */

var outputer = function(textToDemp){
	$("#outputbox").text( "| "+textToDemp + "\n" + $("#outputbox").text() );
}

var Bimbo = function(){
	this.money = 50;
	this.timeRemaining = 24*7;
	this.skills = {"Bartender":1,"Secretarial":1,"Persuasion":1};
	this.items = {"Gossip magazine":1,"Designer shoes":20,"Hairbrush":1,"Make up":1,"Phone":1};
	this.increaseSkill = function(skillName){
		if(this.skills[skillName]){
			if(this.skills[skillName] < 4 ){
				this.skills[skillName] = this.skills[skillName] + 1;
			}
		} else {
			this.skills[skillName] = 1;
		};
	};
	this.timeLapse = function(timeSpent){
		this.timeRemaining-=timeSpent;
	};
	this.saveMoney = function(newMoney){
		this.money+=newMoney;
	};
	this.addItem = function(item){
		if(this.items[item]){
			this.items[item] += 1;
		} else {
			this.items[item] = 1;
		}
	}
	this.takeChance = function(chance){
		if(chance.item){
			this.addItem(chance.item);
		} else {
			this.saveMoney(chance.money);
		}
		this.timeLapse(chance.time);
	}
}


var jobs = [
 	{"name": "Secretary", "time": [3,8], "money": [30,80], 
 		"skills":{ 		"Typing": {"requiredLevel":1,"multiplier":2}, "ICT": {"multiplier":1} 	} },
 	{"name": "Bartender", "time": [3,10], "money": [10,30], 
 		"skills":{ 		"Retail": {"requiredLevel":1,"multiplier":1}, "Persuasion": {"multiplier":1} 	}  },
 	{"name": "Shop Assistant", "time": [3,12], "money": [10,20], 
 		"skills":{ "Retail": {"multiplier":1} } },
 	//{"name": "Stock Trader", "time": [8,16], "money": [-1000,4000], 
 	//	"skills":{ 		"ICT": [0,1], "Persuasion": [0,2], "Trading": [1,3] } }, 
 	{"name": "Lawyer", "time": [8,16], "money": [30,500], 
 		"skills":{ 		"ICT": {"requiredLevel":0,"multiplier":1}, "Legalese":{"requiredLevel":1,"multiplier":3}, "Typing": {"requiredLevel":1,"multiplier":1}, "Persuasion": {"multiplier":2} } }, 
 	{"name": "TV Host", "time": [3,5], "money": [50,1000], 
 		"skills":{ 	"Presentation": {"requiredLevel":1,"multiplier":3}, "Persuasion": {"multiplier":1} } }
];

var chances = {
	"Dumpster diving": { "items": [ "Designer shoes", "Hairbrush", "Clothes", "Make up" ],
		 	"money": [5,100], "time": 1 },
	"Tidy up apartment": { "items": [ "Clothes", "Designer shoes", "Gossip magazine", "Make up", "Jewelery" ], 
			"money": [5,100], "time": 1 },
	"Cultivate a sugar daddy": { "items": [ "Plastic surgery voucher", "Designer dress", "Jewelery" ], 
			"money": [100,1000], "time": 5},
	"Visit parents": { "items": [ "Clothes", "Gossip magazine", "Make up"], 
			"money": [5,100], "time": 2 }
};

var JobActionEngine = function(){
	this.findAvailableJobs = function(bimbo){
		var numberOfJobsAvailable = Math.round(Math.random()*jobs.length);
		var availableJobs = [];
		while(availableJobs.length<numberOfJobsAvailable){
			var jobNumber = Math.floor(Math.random()*jobs.length);
			var jobAvailable = jobs[jobNumber];
			if(bimboHaveSkills(bimbo.skills,jobAvailable) && !isJobAlreadyOffered(availableJobs,jobAvailable)){
				availableJobs.push( jobAvailable );
			} else {
				numberOfJobsAvailable--;
			}
		}
		return availableJobs;
	}
	this.attendJob = function(bimbo,chosenJobName) {
		var job = findJob(chosenJobName);
		var timeSpent = randomRange(job.time);
		var moneyEarned = calculateSalary(bimbo,timeSpent,job);
		var skillGained = maybeGainSkill(job);
		if(skillGained){
			bimbo.increaseSkill(skillGained);
		}
		return {"money":moneyEarned,"time":timeSpent};
	}
}


function maybeGainSkill(job) {
	if(Math.random()>0.9){
		var skillChosen = Math.floor(Math.random()*Object.keys(job.skills).length);
		return Object.keys(job.skills)[skillChosen];
	}
}

function calculateSalary(bimbo,timeSpent,job){
	var multiplier = 1;
	for(var skillIndex=0;skillIndex<job.skills.length;skillIndex++){
		var jobSkill = job.skills[jobIndex];
		if(bimboHaveSkill(jobSkill,bimbo.skills)){
			multiplier=multiplier+jobSkill.multiplier;
		}
	}
	var baseSalary = randomRange(job.money);
	return timeSpent * multiplier * baseSalary;
}

function bimboHaveSkill(jobSkill,skills){
	if(jobSkill.requiredLevel){
		var skill = skills[jobSkill.name];
		if(!skill || skill.level < jobSkill.requiredLevel){
			return false;
		}	
	}
	return true;
}

function bimboHaveSkills(skills,job){
	for(jobSkill in job.skills){
		if(!bimboHaveSkill(jobSkill,skills)){
			return false;
		}
	}
	return true;
}

function randomRange(range){
	var topRange = range[1] - range[0];
	return Math.round(Math.random()*topRange) + range[0];
}

function findJob(jobName) {
	for(var jobIndex=0;jobIndex<jobs.length;jobIndex++){
		if(jobs[jobIndex].name == jobName){
			return jobs[jobIndex];
		}
	}
}

function isJobAlreadyOffered(availableJobs,jobAvailable){
	for( var jobNumber=0; jobNumber<availableJobs.length;jobNumber++){
		if(availableJobs[jobNumber].name == jobAvailable.name){
			return true;
		}
	}
	return false;
}

var ChanceActionEngine = function(){
	this.chooseChance = function(){
		var chanceName = findRandomChance();
		var chance = chances[chanceName];
		if(Math.random()>0.2){
			var item = pickRandomFromArray(chance.items);
			return {"name": chanceName, "time": chance.time, "item": item};
		} else {
			var money = randomRange(chance.money);	
			return {"name": chanceName, "time": chance.time, "money": money};
		}
	}
}

function pickRandomFromObject(associatedArray){
	var index = Math.floor(Math.random()*Object.keys(associatedArray).length);
	return Object.keys(associatedArray)[index];
}

function pickRandomFromArray(associatedArray){
	var index = Math.floor(Math.random()*associatedArray.length);
	return associatedArray[index];
}


var BimboGame = function(){
	this.jobEngine = new JobActionEngine();
	this.chanceEngine = new ChanceActionEngine();
}

var bimboGame = new BimboGame();

var bimbo = new Bimbo();

function chooseRandomJob(){
	return pickRandomFromArray(jobs);
}

function findRandomChance(){
	return pickRandomFromObject(chances);
}

$(document).ready(function(){
	$("#button1").click(function(){
		outputer("-----");
		var availableJobs = bimboGame.jobEngine.findAvailableJobs(bimbo);
		if(availableJobs.length==0){
			outputer("No jobs available");			
		} else {
			for( var jobNumber=0; jobNumber<availableJobs.length;jobNumber++){
				outputer("Available job is "+availableJobs[jobNumber].name);
			}
		}
	}).text("random available jobs");
	$("#button2").click(function(){
		outputer("-----");
		var jobAvailable = chooseRandomJob();
		outputer(" Job attended is " + jobAvailable.name);
		var cost = bimboGame.jobEngine.attendJob(bimbo,jobAvailable.name);
		outputer(" Money earned is $" + cost.money + " ");
		outputer(" Time spent is " + cost.time + " hours");
		for(skillName in Object.keys(bimbo.skills)){
			outputer("Bimbo has skill " + Object.keys(bimbo.skills)[skillName] + " at level " + bimbo.skills[Object.keys(bimbo.skills)[skillName]]);
		}
	}).text("attend random job");
	$("#button3").click(function(){
		outputer("-----");
		var jobAvailable = chooseRandomJob();
		outputer(" Job attended is " + jobAvailable.name);
		var cost = bimboGame.jobEngine.attendJob(bimbo,jobAvailable.name);
		bimbo.timeLapse(cost.time);
		bimbo.saveMoney(cost.money);
		outputer("Bimbo has " + bimbo.money + " in cash but only " + bimbo.timeRemaining + " time left");
	}).text("acrue money and spend time");
	$("#button4").click(function(){
		outputer("-----");
		var chance = bimboGame.chanceEngine.chooseChance();
		if(chance.item){
			outputer("Chance " + chance.name + " found/received "+ chance.item + " for " + chance.time + " hours");
		} else {
			outputer("Chance " + chance.name + " earned $"+ chance.money + " for " + chance.time + " hours" );
		}
	}).text("Pick random chance event");
	$("#button5").click(function(){
		outputer("-----");
		var chance = bimboGame.chanceEngine.chooseChance();
		bimbo.takeChance(chance);
		outputer("Chance " + chance.name );
		if(chance.item){
			if(bimbo.items[chance.item]){
				bimbo.items[chance.item] += 1;
			} else {
				bimbo.items[chance.item] = 1;
			}
		} else {
			bimbo.money+=chance.money;
		}
		outputer("Bimbo has " + bimbo.money + " in cash but only " + bimbo.timeRemaining + " time left");
		var inventory = "";
		for(var key in Object.keys(bimbo.items)){
			inventory += Object.keys(bimbo.items)[key] + " x " + bimbo.items[Object.keys(bimbo.items)[key]] + ",";
		}
		outputer("Inventory: "+inventory);
	}).text("Receive random chance event");

});

