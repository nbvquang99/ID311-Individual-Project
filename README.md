## Table of contents

- [ID311 Individual project submission form](#id311-individual-project-submission-form)
- [Game Description](#game-description)
  - [1. The story](#1-the-story)
  - [2. The game mechanics](#2-the-game-mechanics)
    - [*Game control*](#game-control)
    - [*Game mission*](#game-mission)
    - [*Game objects*](#game-objects)
    - [*Notes*](#notes)
- [Code Description](#code-description)
  - [1. Techstack](#1-techstack)
  - [2. Implementation](#2-implementation)
- [Acknowledge](#acknowledge)
---
# ID311 Individual project submission form

1. **Name**: Nguyen Ba Vinh Quang
2. **KAIST ID**: 20190710
3. **Email**: nbvquang99@kaist.ac.kr / nbvquang99@gmail.com
4. **GIT URL**: [Click here](https://github.com/nbvquang99/ID311-Individual-Project)
5. **Youtube Demo Video**: [Click here](https://youtu.be/T5KPD_Y2Cfg)
   
# Game Description
<p align="center">
  <img src="assets/Text/title.png" alt="Logo">
</p>

## 1. The story
My first proposal is a 2D game with a single button to control the character - Itachi. Itachi will run on an endless road where the enemy will be spawned randomly, the player has to control Itachi to dodge the enemy's attacks as well as obstacles. It likes the Dinosaur game in Chrome.

However, due to lacking Sprite assets to create character movement as well as the improvement idea for the game. I decide to switch my project to the Missile Command Game. As the name, your mission in the game is to control a missile launcher to defend four cities from attackers (rockets and UFOs).
<p align="center"><img src="assets/readme/gameplay1.png" width=50% height=50% alt></p>
<p align="center"><em>Gameplay</em></p>

## 2. The game mechanics
*In this section, briefly describe game features (for more details and visualization, please refer to [Demo Video](https://youtu.be/T5KPD_Y2Cfg)).*
### *Game control*
- Aiming by `Mouse` dragging. `Left mouse` to shoot a normal missile. `Right mouse` to shoot a special missile.
### *Game mission*
- We have to protect four cities from enemies which will be spawned randomly and fall down from the top of the screen, the player has to control the missile to hit enemies.
- The more enemy we destroy, the more scores and levels we earn. To increase one level, **10 enemies** must be destroyed. At each level, the number and speed of enemies will increase. Therefore, it will be more difficult in the later game.
- The player will lose if all four cities are destroyed.
### *Game objects*
- `The enemies` include normal rockets and a UFO which is the **Boss** of the game. 
- `The UFO boss` has a unique type of bullet to attack our cities, these bullets are blue spheres that are inspired by Naruto's Rasengan Skills. We can hit both the boss and its bullets. During the low health status, the boss will be fuming.
- `The airdrop` will be randomly spawned during the gameplay, hit it to gain the number of our missiles.
- `Leaderboard` system that stores the top 5 highest scores through multiple gameplays.
### *Notes*
- In order to make a short video demo, I set up the game so that the player only needs to reach **level 3** to fight with the UFO boss. The player is victorious after defeating the boss.

# Code Description
## 1. Techstack
- Javascript with OOP and Pattern design.
- Libraries: p5.js and p5play.

## 2. Implementation

# Acknowledge
- Reference: [Taylor Edgerton Repository](https://github.com/TaylorEdgerton/Creative-Coding-Game)
- Some of the assets (audios, videos, images) are taken from the repository of Tayler.
- The **BASIC** game idea is based on the game of Taylor Edgerton.
- All the source code in this repository, gameplay logic and improvement are implemented from scratch by Nguyen Ba Vinh Quang.