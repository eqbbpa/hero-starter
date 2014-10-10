/* 

	The only function that is required in this file is the "move" function

	You MUST export the move function, in order for your code to run
	So, at the bottom of this code, keep the line that says:

	module.exports = move;

	The "move" function must return "North", "South", "East", "West", or "Stay"
	(Anything else will be interpreted by the game as "Stay")

	The "move" function should accept two arguments that the website will be passing in: 
	- a "gameData" object which holds all information about the current state
	  of the battle

	- a "helpers" object, which contains useful helper functions
	  - check out the helpers.js file to see what is available to you

	(the details of these objects can be found on javascriptbattle.com/#rules)

	This file contains four example heroes that you can use as is, adapt, or
	take ideas from and implement your own version. Simply uncomment your desired
	hero and see what happens in tomorrow's battle!

	Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)


// // The "Northerner"
// // This hero will walk North.  Always.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   return 'North';
// };

// // The "Blind Man"
// // This hero will walk in a random direction each turn.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   var choices = ['North', 'South', 'East', 'West'];
//   return choices[Math.floor(Math.random()*4)];
// };

// // The "Priest"
// // This hero will heal nearby friendly champions.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 60) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestTeamMember(gameData);
//   }
// };

// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 50) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestWeakerEnemy(gameData);
//   }
// };

// // The "Safe Diamond Miner"
//var move = function(gameData, helpers) {
//  var myHero = gameData.activeHero;
//
//  //Get stats on the nearest health well
//  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//    if (boardTile.type === 'HealthWell') {
//      return true;
//    }
//  });
//  var distanceToHealthWell = healthWellStats.distance;
//  var directionToHealthWell = healthWellStats.direction;
//  
//
//  if (myHero.health < 40) {
//    //Heal no matter what if low health
//    return directionToHealthWell;
//  } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//    //Heal if you aren't full health and are close to a health well already
//    return directionToHealthWell;
//  } else {
//    //If healthy, go capture a diamond mine!
//    return helpers.findNearestNonTeamDiamondMine(gameData);
//  }
//};

// // The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };

// // The "Coward"
// // This hero will try really hard not to die.
// var move = function(gameData, helpers) {
//   return helpers.findNearestHealthWell(gameData);
// }



//document.write(gameData.toSource());

//eqbbpa
var move = function(gameData, helpers) {
	var myHero = gameData.activeHero;

	//回復ポイントの距離、方向
	var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'HealthWell') {return true;}
	});
	var distanceToHealthWell = healthWellStats.distance;
	var directionToHealthWell = healthWellStats.direction;
	
	//敵の距離、方向
	var enemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team != myHero.team) {return true;}
	});
	var distanceToEnemy = enemyStats.distance;
	var directionToEnemy = enemyStats.direction;
	
	//自分より弱ってる敵の距離、方向
	var weakerEnemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team != myHero.team && boardTile.Health < myHero.health) {return true;}
	});
	var distanceToWeakersEnemy = weakerEnemyStats.distance;
	var directionToWeakerEnemy = weakerEnemyStats.direction;
	
	
	
	/*
	distance	距離
	direction	方向
	
	Tile.type
		"Hero"
		"HealthWell"
		"DiamondMine"
	
	Mine.owner.id
	Mine.owner.team
	
	Hero.id
	Hero.team
	Hero.health
	
	helpers.findNearestNonTeamDiamondMine	//
	helpers.findNearestUnownedDiamondMine	//
	helpers.findNearestHealthWell			//近くの回復ポイントへ
	helpers.findNearestWeakerEnemy			//自分よりHPの低い近く敵のとこへ
	helpers.findNearestEnemy				//近く敵のとこへ
	helpers.findNearestTeamMember			//近くの仲間のとこへ
	*/
	
	//test
	if (false) {
	} else if (myHero.health < 50) {
		return helpers.findNearestHealthWell(gameData);
	} else if (myHero.health < 70) {
		if (distanceToHealthWell > 3) {
			return helpers.findNearestHealthWell(gameData);
		} else {
			if (distanceToWeakersEnemy <= 3) {
				return helpers.findNearestWeakerEnemy(gameData);
			} else {
				return helpers.findNearestEnemy(gameData);
			}
		}
	} else if (myHero.health < 90) {
		if (distanceToWeakersEnemy <= 5) {
			return helpers.findNearestWeakerEnemy(gameData);
		} else {
			return helpers.findNearestEnemy(gameData);s
		}
	} else {
		return helpers.findNearestEnemy(gameData);
	}
	
	
	
	//default
	//HPが40より下だったら
	if (myHero.health < 40) {
		//Heal no matter what if low health
		//回復ポイントの方へ
		return directionToHealthWell;
		
	//HPが100より下かつ回復ポイントの隣なら
	} else if (myHero.health < 100 && distanceToHealthWell === 1) {
		//Heal if you aren't full health and are close to a health well already
		//回復ポイントの方へ
		return directionToHealthWell;
		
	//上記以外（HPが満タン）
	} else {
		//If healthy, go capture a diamond mine!
		//誰も所有していないダイアモンドの方へ
		return helpers.findNearestNonTeamDiamondMine(gameData);
	}

};


// Export the move function here
module.exports = move;
