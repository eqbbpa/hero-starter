var move = function(gameData, helpers) {
	var myHero = gameData.activeHero;
	
	//�񕜃|�C���g�̋����A����
	var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'HealthWell') {return true;}
	});
	var distanceToHealthWell = healthWellStats.distance;
	var directionToHealthWell = healthWellStats.direction;
	
	//�G�̋����A����
	var enemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team != myHero.team) {return true;}
	});
	var distanceToEnemy = enemyStats.distance;
	var directionToEnemy = enemyStats.direction;
	
	//����������Ă�G�̋����A����
	var weakerEnemyStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team != myHero.team && boardTile.Health < myHero.health) {return true;}
	});
	var distanceToWeakersEnemy = weakerEnemyStats.distance;
	var directionToWeakerEnemy = weakerEnemyStats.direction;
	
	//�����̋����A����
	var teamMemberStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'Hero' && boardTile.team == myHero.team) {return true;}
	});
	var distanceToTeamMember = teamMemberStats.distance;
	var directionToTeamMember = teamMemberStats.direction;
	
	/*
	distance	����
	direction	����
	
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
	helpers.findNearestHealthWell			//�߂��̉񕜃|�C���g��
	helpers.findNearestWeakerEnemy			//�������HP�̒Ⴂ�߂��G�̂Ƃ���
	helpers.findNearestEnemy				//�߂��G�̂Ƃ���
	helpers.findNearestTeamMember			//�߂��̒��Ԃ̂Ƃ���
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
	//HP��40��艺��������
	if (myHero.health < 40) {
		//Heal no matter what if low health
		//�񕜃|�C���g�̕���
		return directionToHealthWell;
		
	//HP��100��艺���񕜃|�C���g�ׂ̗Ȃ�
	} else if (myHero.health < 100 && distanceToHealthWell === 1) {
		//Heal if you aren't full health and are close to a health well already
		//�񕜃|�C���g�̕���
		return directionToHealthWell;
		
	//��L�ȊO�iHP�����^���j
	} else {
		//If healthy, go capture a diamond mine!
		//�N�����L���Ă��Ȃ��_�C�A�����h�̕���
		return helpers.findNearestNonTeamDiamondMine(gameData);
	}
};

// Export the move function here
module.exports = move;
