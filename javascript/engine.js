
/*
 * Simple scaffolding javascript objects
 * to support the action engine.
 * and support methods attached
 */

var outputer = function(textToDemp){
	$("#outputbox").text($("#outputbox").text() + "| "+textToDemp + "\n" );
}

 var jobs = [
 	{"name": "Secretary", "time": [5,10], "money": [20,30], "skills":{
 		"Typing": 1.0, "ICT": 1.0
 	} },
 	{"name": "Bartender", "time": [5,10], "money": [10,20], "skills":{
 		"Retail": 0.5, "Persuasion": 0.5
 	}  },
 	{"name": "Shop Assistant", "time": [5,10], "money": [10,20], "skills":{
 		"Retail": 1.0
 	} },
 	{"name": "Stock Trader", "time": [5,10], "money": [30,200], "skills":{
 		"ICT": 0.5, "Persuasion": 0.5, "Trading": 2.0
 	} }, 
 	{"name": "Lawyer", "time": [5,10], "money": [30,200], "skills":{
 		"ICT": 0.5, "Legalese": 2.0, "Typing": 0.5, "Persuasion": 0.5
 	} }
 ];

var JobActionEngine = function(){
	this.findAvailableJobs = function(){
		var numberOfJobsAvailable = Math.round(Math.random()*jobs.length);
		var availableJobs = [];
		while(availableJobs.length<numberOfJobsAvailable){
			var jobNumber = Math.floor(Math.random()*jobs.length);
			var jobAvailable = jobs[jobNumber];
			if(!isJobAlreadyOffered(availableJobs,jobAvailable)){
				availableJobs.push( jobAvailable );
			}
		}
		return availableJobs;
	}
	this.attendJob = function(chosenJobName) {
		var job = findJob(chosenJobName);
		var moneyEarned = randomRange(job.money);
		var timeSpent = randomRange(job.time);
		return [moneyEarned,timeSpent];
	}
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
	this.findChance = function(){}
}


var BimboGame = function(){
	this.jobEngine = new JobActionEngine();
	this.chanceEngine = new ChanceActionEngine();
}

var bimboGame = new BimboGame();


$(document).ready(function(){
	$("#button1").click(function(){
		outputer("-----");
		var availableJobs = bimboGame.jobEngine.findAvailableJobs();
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
		var jobNumber = Math.floor(Math.random()*jobs.length);
		var jobAvailable = jobs[jobNumber];
		outputer(" Job attended is " + jobAvailable.name);
		var cost = bimboGame.jobEngine.attendJob(jobAvailable.name);
		outputer(" Money earned is " + cost[0]);
		outputer(" Time spent is " + cost[1]);
	}).text("choose random job");
	$("#button3").click(function(){
	});
});