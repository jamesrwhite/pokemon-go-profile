'use strict';

// Dependencies
const fs = require('fs'),
      inert = require('inert'),
      log = require('winston-color'),
      Pokemon = require('./pokemon'),
      Mustache = require('mustache'),
      Hapi = require('hapi');

// Auth details
const USER = process.env.USER,
      PASSWORD = process.env.PASSWORD,
      PORT = process.env.PORT || 9999,
      LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

// Set the logging level
log.level = LOG_LEVEL;

// Load the template
const template = fs.readFileSync('./profile.mustache').toString();
const logos = {
    instinct: fs.readFileSync('./assets/img/instinct.svg').toString(),
    mystic: fs.readFileSync('./assets/img/mystic.svg').toString(),
    valor: fs.readFileSync('./assets/img/valor.svg').toString()
};

// Init the server
const server = new Hapi.Server();
server.connection({
    port: PORT
});

log.debug('Fetching Pokemon data');

// Fetch the users pokemon go data
Pokemon.getData(USER, PASSWORD).then(player => {
    log.debug('Fetched Pokemon data');

    server.register(inert, err => {
        // Handle serving our assets
        server.route({
            method: 'GET',
            path: '/assets/{filename*}',
            handler: {
                directory: {
                    path: 'assets'
                }
            }
        });

        // Render out the player data as html
        server.route({
            method: 'GET',
            path: '/profile',
            handler: (request, reply) => {
                log.debug('GET /profile');

                // Hack in the svg team logo to the view data
                player.logo = logos[player.team.key];

                const view = Mustache.render(template, player);

                return reply(view);
            }
        });

        // Render out the player data as json
        server.route({
            method: 'GET',
            path: '/profile.json',
            handler: (request, reply) => {
                log.debug('GET /profile.json');

                return reply(player);
            }
        });

        server.start(err => {
            if (err) {
                throw err;
            }

            log.info(`Server now running at ${server.info.protocol}://${server.info.address}:${server.info.port}`)
        });
    });
}).catch(err => {
    log.error(err);
    process.exit();
});
