const PokemonApi = require('pogobuf'),
      Promise = require('bluebird');

exports.getData = (username, password) => {
    const google = new PokemonApi.GoogleLogin(),
          api = new PokemonApi.Client();

    return new Promise((resolve, reject) => {
        google.login(username, password).then(token => {
            api.setAuthInfo('google', token);

            return api.batchStart()
                      .getPlayer()
                      .getPlayerProfile()
                      .getInventory()
                      .batchCall();
        }).then(response => {
            resolve(format(response));
        }).catch(err => {
            reject(err);
        });
    });
};

function format(response) {
    const player = response[0].player_data,
          badges = response[1].badges,
          inventory = response[2].inventory_delta.inventory_items;

    return {
        username: player.username,
        joined: new Date(parseInt(player.creation_timestamp_ms, 10)).toString(),
        team: parseTeam(player.team),
        level: getPlayerStats(inventory).level,
        badges: badges
    };
}

function parseTeam(id) {
    var teams = {
        0: {
            key: 'instinct',
            name: 'Instinct'
        },
        1: {
            key: 'mystic',
            name: 'Mystic'
        },
        2: {
            key: 'valor',
            name: 'Valor'
        }
    };

    return teams[id];
}

function getPlayerStats(inventory) {
    const stats = inventory.filter(item => {
        return item.inventory_item_data.player_stats !== null;
    });

    return stats[0].inventory_item_data.player_stats;
}
