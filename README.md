LD31 - Never alone on this stupid screen
====
About
-----
"Never alone on this stupid screen" is a multiplayer survival game written in 48h for the LD31 challenge.

You are a shinny 8-bit guy who just wants to be alone on his CRT cave screen, but there's always stupid monsters, and
EVEN WORSE, other players, that comes to annoy you.

But maybe you'll get to the heaven of 8-bits guys if you kill enough guys. And don't worry, your guy will always remember
his stupid name and his level.

Please play using a modern, Chrome/Safari recommended, since Firefox tends to lag a bit sometimes :(.

Technical stuff
---------------

The game uses a cellular automate to generate the map, and a flood fill algorithm to check that the map is composed of
only one cave, to avoid obvious issues.

The game uses pixi.js for the graphics engine, keyboard.js for the... keyboard, buzz.js for the sound effects/music,
node.js/socket.io/mongoose server-side.

The player name is stored using localstorage.

You'll need a mongodb database if you want to try the server on your own machine.

The graphics are inspired from stuff generated from the Random Sprite Generator by bvanschooten
( http://ludumdare.com/compo/2013/04/03/random-sprite-generator-1-0/ ).

The annoying music has been generated using cgmusic (that thing is AWESOME) and slightly edited.