# Pokémon Go Profile

A very simple, and very much wip, web ui for your Pokémon profile that pulls data from
the games private api.

!["Screenshot"](https://d3vv6lp55qjaqc.cloudfront.net/items/0E3Z0c2c1W101R0Z3B3q/Image%202016-07-31%20at%2011.35.02%20pm.png?v=8e0fb5d9)

## Installation

	$ git clone https://github.com/jamesrwhite/pokemon-go-profile.git
	$ npm install

## Running

	$ USERNAME=you@gmail.com PASSWORD=supersecret1 node server.js

## TODO

- [x] Google Login
- [ ] Pokémon Trainer Club Login
- [x] Fetch player data
- [x] Team theming
- [ ] Level progression
- [ ] Pokémon Count
- [ ] Item Count
- [ ] Pokémon List
- [ ] Item List
- [ ] Moar stats
- [ ] Refresh data periodically
- [ ] Avatar (not sure if this is even possible, the game uses what I presume are Unity models so it will be tricky..)
- [ ] View other players data (no api to do this currently)


## Credits

- [Node Library](https://github.com/cyraxx/pogobuf)
- [Awesome Team Logo Vectors](https://dribbble.com/shots/2831980-Pok-mon-GO-Team-Logos-Vector-Download)

## License

The MIT License (MIT)

Copyright (c) 2016 James White

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
