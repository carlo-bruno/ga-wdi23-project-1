# ga-wdi23-project-1

General Assembly Web Development Immersive - Project 1

# Tetris

## Carlo Bruno | General Assembly Web Development Immersive

### Project \#1 Game - HTML CSS JavaScript

[LIVE DEMO](https://carlo-bruno.github.io/ga-wdi23-project-1/)

## Table of Contents

- [Introduction](#introduction)
- [How to Play](#how-to-play)
- [Building the App](#building-the-app)

## Introduction

>"At it's core, Tetris is all about quick decision-making. You want to make as many decisions, they do not have to be good. You just have to make them and move on."
> — Jonas Neubauer, 7-time Classic Tetris World Champion

<img src="./screen-shots/ss-tetris-demo.gif" width="500" >

A Tetris Clone built using JavaScript, HTML5 and CSS3.

### Project Specification

This is Portfolio Project 1 of General Assembly Web Development Immersive. The goal is to assimilate what we have learned in Unit 1 - Front-end Development into a web game that we can showcase to future employers and fellow developers.

### Technical Requirements

Technical Requirements:

- Display a game in the browser
- Switch turns between two players, or switch turns between a player and the computer (AI) \*
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript or jQuery for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

## How to Play

1. Clone this [repo](https://github.com/carlo-bruno/ga-wdi23-project-1) or `git clone https://github.com/carlo-bruno/ga-wdi23-project-1.git`
   OR Click the LIVE DEMO to launch the game in your browser.
2. To move the active piece left and right, use :arrow_left: **Arrow Left** and :arrow_right: **Arrow Right**.
3. To soft drop the piece, use :arrow_down: **Arrow Down**.
4. To rotate the piece clockwise, use :arrow_up: **Arrow Up**.
5. On devices less than 768px, 4 buttons will appear to control the piece. they are marked :arrow*left:, :arrow_right:, :arrow_down:, :arrows_clockwise:. \_Note: Mobile gameplay is sub-optimal at the moment.*
6. Buttons on the game panel: Pause/Play Toggle, Restart Game, Music On/Off Toggle, and Info

### Scores and Levels

1. Scores are earned by clearing lines. More lines cleared = more points.
2. Game Level goes up by clearing certain number of lines. And scores are increased accordingly.

- Single = 40 Pts x Level
- Double = 100 Pts x Level
- Triple = 300 Pts x Level
- Tetris = 1200 Pts x Level

3. Every level, the pieces drop a little faster.
4. The game is over when your piece locks at the top of the board.
5. High Scores are stored in your browser's Local Storage.

## Building the App

### Big Picture

The key to understanding this particular tetris game is matrices. This implementation uses arrays within arrays to paint and store cells. Let us begin with a **Tetromino**.

```javascript
const Tetro = [ [0, 1, 0],    // a T shaped Tetromino
                [1, 1, 1],    // this shows which cell needs be painted
                [0, 0, 0] ];  // and which ones to leave vacant
```
Now, the **Board** is an array of 20 arrays and 10 _cells_ corresponding to the games **20 Rows** and **10 Columns**. The board will be instantiated with all zero values, and will remain so until we _set or lock_ a piece to the board. (more on this later)

Our tetromino piece will then traverse this board by changing its _position_, its **X** and **Y** coordinates matching the board's columns and rows.

#### The Micro
The function `drawCell(x,y,value)` takes a cell's X, Y, and the value inside that cell, it then matches the value to a _colors_ array for what paint to use on the canvas. And yes, even zeros have to be painted to the board.

`drawMatrix()` takes a matrix, and its starting position and calls `drawCell()` on each cell of every row it's given. It will be called to draw the board and its current state, and the active piece matrix.

#### Game Loop
Because the state of the board is always changing, and we want to move the active piece constantly, we will have to call both our `drawMatrix`... a lot. We implement this inside our game loop, which also holds the automatic drop functionality of our game.

In early versions, I was using setInterval, but eventually switched to requestAnimationFrame. Since then, I have noticed a slight increase in performance, and less intermittent spinning of my laptop's cooling fan. (which, to me, is a sign of a straining cpu)

#### Locking Piece
The idea is to freeze our active piece by copying it's matrix into the board. And to implement that, we have to
1. go through each cell of the matrix
2. get the ones with value (!==0)
3. get the cell's x and y _relative to the board_
4. get the specific cell _in the board_ and set the value from the piece

By the end of this, our board will have non-zero values in it, and our draw functions will render them accordingly.

#### Check Collision
Although quite simple logically, function `collideCheck()` is probably the trickiest to implement in this game. I did not have it fully functioning until day 4 of project week.

The earliest version only checks the bottom row of the matrix and 'looking' one row below it, ideal for locking pieces to the floor, and stacking O-shaped tetrominoes on top of each other. However, it does not check the sides. That is a problem for the next day.

#### Moving Piece
Simple enough, listen for key events, use left arrow key to decrement the column (x--) and right arrow key to increment (x++). I included two conditions for either direction to prevent the tetromino from escaping out of bounds. which works, but only for walls because alas, we still do not have a decent collision checker.

Adding a manual drop, I though was as simple as adding to the y, but I found instead was a nest full of bugs. All because of my unpolished check collision.

#### Check Collision, Revisited
(...to be continued)


### Built with

- [Google Fonts - Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- [FontAwesome Icons](https://fontawesome.com/)
- [Tetris Gameboy Theme](https://commons.wikimedia.org/wiki/File:Tetris_theme.ogg)

### Tutorials, Ideas and Inspiration

- [Tetris - Wikipedia](https://en.wikipedia.org/wiki/Tetris)
- [Tetris Guideline - Fandom Tetris Wiki](https://tetris.fandom.com/wiki/Tetris_Guideline)
- [Tetris Speed and Level - Tetris Wiki](<https://tetris.wiki/Tetris_(NES,_Nintendo)>)
- [Tetris Scoring - Tetris Wiki](https://tetris.wiki/Scoring)
- Write a Tetris Game in JavaScript by Meth Meth Method [Youtube](https://youtu.be/H2aW5V46khA)
- Tetris Game using Javascript by Code Explained [Youtube](https://youtu.be/HEsAr2Yt2do)
- Tooltip Display Tutorial [jsFiddle](http://jsfiddle.net/AndreaLigios/jtLbpy62/)
- Matrix Rotation [Medium](https://medium.com/front-end-weekly/matrix-rotation-%EF%B8%8F-6550397f16ab)

- The Classic Tetris World Championships Explained [Youtube](https://www.youtube.com/watch?v=9RaqVGzhQTM)
