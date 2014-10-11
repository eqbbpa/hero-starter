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
	
	//味方の距離、方向
	var teamMemberStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team == myHero.team) {return true;}
	});
	var distanceToTeamMember = teamMemberStats.distance;
	var directionToTeamMember = teamMemberStats.direction;
	
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
	
	
	
	if (false) {
	} else if (myHero.health < 50) {
		if (distanceToHealthWell <= distanceToTeamMember) {
			return helpers.findNearestHealthWell(gameData);
		} else {
			return helpers.findNearestTeamMember(gameData);
		}
	} else if (myHero.health < 70) {
		if (distanceToHealthWell > 3) {
			if (distanceToHealthWell <= distanceToTeamMember) {
				return helpers.findNearestHealthWell(gameData);
			} else {
				return helpers.findNearestTeamMember(gameData);
			}
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
