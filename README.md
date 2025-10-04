# Angular Tetris

A Tetris game built with Angular and Akita.

![A Tetris game built with Angular and Akita][demo]

The game has sounds, wear your 🎧 or turn on your 🔊 for a better experience.

![A Tetris game built with Angular and Akita][iphonex]

## Why?

This is a recreation of the classic Tetris game, built with modern Angular framework and Akita state management.

> The game can hold up to a maximum score of 999999 (one million minus one 😂)

## How to play

### Before playing

- You can use both keyboard and mouse to play. But prefer to use <u>keyboard</u>
- Press arrow left and right to change the speed of the game **(1 - 6)**. The higher the number, the faster the piece will fall
- Press arrow up and down to change how many of lines have been filled before starting the game **(1 - 10)**
- Press `Space` to start the game
- Press `P` for pause/resume game
- Press `R` for resetting the game
- Press `S` for the turn on/off the sounds

### Playing game

- Press `Space` make the piece drop quickly
- Press `Arrow left` and `right` for moving left and right
- Press `Arrow up` to rotate the piece
- Press `Arrow down` to move a piece faster
- When clearing lines, you will receive a point - 100 points for 1 line, 300 points for 2 lines, 700 points for 3 lines, 1500 points for 4 lines
- The drop speed of the pieces increases with the number of rows eliminated (one level up for every 20 lines cleared)

## Techstack

Built with Angular and Akita, no additional UI framework/library was required.

![Angular Tetris][techstack]

## Tetris Core

The core game logic is built using TypeScript classes with proper OOP principles.

### Akita state management + dev tool support

Akita state management with [Redux DevTools][redux-devtool] support. Remember to put that option into your `AppModule`

```ts
imports: [environment.production ? [] : AkitaNgDevtools.forRoot()];
```

![Angular Tetris][akita-devtool]

> Note: opening the DevTools could reduce the performance of the game significantly.

### Customizing Piece

A base [Piece class][piece-class] is defined for each piece. Each type of piece extends from the same base class to inherit the same capability.

[piece-class]: src/app/interface/piece/piece.ts

```ts
export class Piece {
  x: number;
  y: number;
  rotation = PieceRotation.Deg0;
  type: PieceTypes;
  shape: Shape;
  next: Shape;

  private shapes: Shapes;
  private lastConfig: Partial<Piece>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  store(): Piece {
    this.lastConfig = {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      shape: this.shape
    };
    return this.newPiece();
  }

  //code removed for brevity
}
```

For example, piece L is created with class [PieceL][piecel]. It contains the shape of L in four different rotations. If you see 1, it means on the matrix it will be filled, 0 mean empty tile.

One important property of the Piece is the `next` property to display the piece shape on the decoration box for the upcoming piece.

[piecel]: src/app/interface/piece/L.ts

```ts
const ShapesL: Shapes = [];
ShapesL[PieceRotation.Deg0] = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 1, 0, 0]
];

ShapesL[PieceRotation.Deg90] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
  [1, 0, 0, 0]
];
//code removed for brevity

export class PieceL extends Piece {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = PieceTypes.L;
    this.next = [
      [0, 0, 1, 0],
      [1, 1, 1, 0]
    ];
    this.setShapes(ShapesL);
  }
}
```

You can create a custom piece by creating a new class that extends from `Piece` with different rotations.

### Animation

Animations are built with RxJS for smooth, reactive behavior.

### Web Audio API

There are many sound effects in the game. All of the sounds reference a single file [assets/tetris-sound.mp3][sounds].

- See the [official documentation][webaudio]
- See how the mp3 file is loaded and stored in [sound-manager.service.ts][sound-manager]
- [Writing Web Audio API code that works in every browser][web_audio_api_cross_browser]

### Keyboard handling

Keyboard controls are implemented using `@HostListener`:

```typescript
@HostListener(`${KeyDown}.${TetrisKeyboard.Left}`)
keyDownLeft() {
  this.soundManager.move();
  this.keyboardService.setKeỵ({
    left: true
  });
  if (this.hasCurrent) {
    this.tetrisService.moveLeft();
  } else {
    this.tetrisService.decreaseLevel();
  }
}
```

See more at [containers/angular-tetris/angular-tetris.component.ts][hotkeys-implementation]

## Features

- [x] Proven, scalable, and easy to understand project structure
- [x] Basic Tetris functionality
- [x] Six levels
- [x] Local storage high score
- [x] Sounds effects
- [x] Limited mobile support

## Setting up development environment 🛠

- Clone the repository
- `cd angular-tetris`
- `npm install`
- `npm start`
- The app should run on `http://localhost:4200/`

## Credits and references

| Resource                                      | Description                                                                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [@Binaryify/vue-tetris][vue]                  | Vue Tetris, reused part of HTML, CSS and static assets from that project                                                        |
| [@chrum/ngx-tetris][ngx-tetris]               | A comprehensive core Tetris written with Angular, reused part of that for the brain of the game.                                |
| [Game Development: Tetris in Angular][medium] | A detailed excellent article about how to build a complete Tetris game.                                                          |
| [Super Rotation System][srs]                  | A standard for how the piece behaves.                                                                                            |

## License

[MIT](https://opensource.org/licenses/MIT)

[medium]: https://medium.com/angular-in-depth/game-development-tetris-in-angular-64ef96ce56f7
[srs]: https://tetris.fandom.com/wiki/SRS
[vue]: https://github.com/Binaryify/vue-tetris
[tetris]: src/assets/readme/retro-tetris.jpg
[demo]: src/assets/readme/angular-tetris-demo.gif
[iphonex]: src/assets/readme/angular-tetris-iphonex.gif
[ngx-tetris]: https://github.com/chrum/ngx-tetris
[techstack]: src/assets/readme/tech-stack.png
[compare01]: src/assets/readme/compare01.png
[compare02]: src/assets/readme/compare02.png
[compare02-result]: src/assets/readme/compare02-result.gif
[timespending]: src/assets/readme/time-spending.png
[akita-devtool]: src/assets/readme/akita-devtool.gif
[sounds]: src/assets/tetris-sound.mp3
[sound-manager]: src/app/services/sound-manager.service.ts
[webaudio]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
[redux-devtool]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
[hotkeys-implementation]: src/app/containers/angular-tetris/angular-tetris.component.ts
[web_audio_api_cross_browser]: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Web_Audio_API_cross_browser
