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
          badges = response[1].badges;

    return {
        username: player.username,
        team: parseTeam(player.team),
        joined: new Date(parseInt(player.creation_timestamp_ms, 10)).toString(),
        badges: badges,
        _debug: response
    }
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
