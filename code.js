var player; // プレイヤーオブジェクトを保持
var backgroundImage; // 背景画像を保持
var playerImage; // プレイヤー画像を保持
var velocityX; // プレイヤーのX方向の速度
var velocityY; // プレイヤーのY方向の速度
var enemy; // 敵オブジェクトを保持
var enemyImage; // 敵の画像を保持
var enemyPositionX; // 敵のX座標
var enemyPositionY; // 敵のY座標
var enemyGroup; // 敵のグループを保持
var enemyCount = 1; // 敵の数を初期化
var enemyAngle; // 敵の角度を保持
var enemies = []; // 敵の配列を初期化
var goal; // ゴールオブジェクトを保持
var goalImage; // ゴールの画像を保持
var angle; // 角度を保持
var dx; // X座標の差分
var dy; // Y座標の差分
var dx2; // X座標の差分2
var dy2; // Y座標の差分2
var playerAngle; // プレイヤーの角度を保持
var dx3; // X座標の差分3
var dy3; // Y座標の差分3
var score = 0; // スコアを初期化
var gamePlaying = false; // ゲームがプレイ中かどうかを保持
var GameOverImage; // ゲームオーバーの画像を保持
var goalSound; // ゴール時のサウンドを保持
var gameOverSound; // ゲームオーバー時のサウンドを保持
var title; // タイトルを保持
var titleImage; // タイトルの画像を保持
var playButtom; // プレイボタンを保持
var playButtomImage; // プレイボタンの画像を保持
var gameFinished = false; // ゲームが終了したかどうかを保持
var bgm; // BGMを保持
var playSound; // プレイ時のサウンドを保持
var playerPosHistory = []; // プレイヤーの位置の履歴を保持
var Thumbnail; // サムネイルを保持
var ThumbnailImage; // サムネイルの画像を保持
var Thumbnail2; // サムネイル2を保持
var Thumbnail2Image; // サムネイル2の画像を保持
var drawThumbnail = true; // サムネイルを描画する
var drawThumbnail2 = true; // サムネイル2を描画するかどうか
var enemySpeedIncrease; // 敵のスピードが増加する際のオブジェクト
var enemySpeedIncreaseImage; // 敵のスピードが増加する際のイメージ
var isBlinking = false; // 点滅中かどうかを保持
var timer; // タイマーを保持
var flashingTime = 10; // 点滅する間隔


// データの準備（読み込み）
function preload() {
  // 各種画像とサウンドの読み込み
  playerImage = loadImage('data/player.png');
  backgroundImage = loadImage('data/backdrop2 (1).png');
  enemyImage = loadImage('data/Enemy.png');
  goalImage = loadImage('data/Goal.png');
  GameOverImage = loadImage('data/GameOver.png');
  goalSound = loadSound('data/goalSound.mp3');
  gameOverSound = loadSound('data/gameOverSound.mp3');
  titleImage = loadImage('data/Title.png');
  playButtomImage = loadImage('data/playButtom.png');
  bgm = loadSound('data/BGM.mp3');
  playSound = loadSound('data/playSound.mp3');
  ThumbnailImage = loadImage('data/Thumbnail.png');
  Thumbnail2Image = loadImage('data/Thumbnail2.png');
  enemySpeedIncreaseImage = loadImage('data/EnemySpeedIncrease.png');
}

// 敵の動きを計算する関数
function enemyMotion(enemy) {
  // 敵がプレイヤーに向かって移動する角度を計算
  angle = atan2(player.position.y - enemy.position.y, player.position.x - enemy.position.x);
  
//一定の速度でプレイヤーに向かって移動する
  dx = (3.5 + score / 4) * cos(angle);
  dy = (3.5 + score / 4) * sin(angle);

  // 敵の位置を更新
  enemy.position.x += dx;
  enemy.position.y += dy;

  // 敵がプレイヤーを向く角度を計算
  dx2 = player.position.x - enemy.position.x;
  dy2 = player.position.y - enemy.position.y;
  enemyAngle = atan2(dy2, dx2);

  // 敵の向きを更新
  enemy.rotation = degrees(enemyAngle);
}


// 初期設定
function setup() {
  // キャンバスを作成
  createCanvas(windowWidth, windowHeight);

  // スピードアップイメージを作成し非表示に設定
  enemySpeedIncrease = createSprite(width / 2 + 500, height / 2 + 400);
  enemySpeedIncrease.addImage(enemySpeedIncreaseImage);
  enemySpeedIncrease.visible = false;

  // BGMを再生
  bgm.play();

  title = createSprite(width/2, height/2 -180, 200, 200); // スクリーンの中心より少し上にタイトルを作成
  title.addImage(titleImage); // タイトルに画像を追加
  playButtom = createSprite(width/2, height/2 +180); // スクリーンの中心より少し下に再生ボタンを作成
  playButtom.addImage(playButtomImage); // 再生ボタンに画像を追加
  
  Thumbnail = createSprite(width/2 +600, height/2); // スクリーンの中心より右側にサムネイルを作成
  Thumbnail.addImage(ThumbnailImage); // サムネイルに画像を追加
  
  Thumbnail2 = createSprite(width/2 -600 ,height/2); // スクリーンの中心より左側に2つ目のサムネイルを作成
  Thumbnail2.addImage(Thumbnail2Image); // 2つ目のサムネイルに画像を追加
  
}


function enemyCreate() {

  // createSprite()関数で新しいスプライトを生成し、それをnewEnemyという変数に格納
  var newEnemy = createSprite();
  // newEnemyに敵の画像を追加
  newEnemy.addImage(enemyImage);

  // 敵を格納する配列(enemies)に新たに生成した敵(newEnemy)を追加
  enemies.push(newEnemy);

  // enemyCountの数だけ敵の位置をランダムに生成
  for (var i = 0; i < enemyCount; i++) {
    enemyPositionX = random(width);
    enemyPositionY = random(height);
  }

  // windowSideRandomPosition関数でウィンドウのランダムな位置を取得し、新たな敵の位置に設定
  var result = windowSideRandomPosition();
  newEnemy.position.x = result[0];
  newEnemy.position.y = result[1];

  // 敵グループに新たに生成した敵を追加
  enemyGroup.add(newEnemy);

  // 敵の数を1つ増やす
  enemyCount++;

  // スコアを1増やす
  score += 1;

}



function windowSideRandomPosition() {
  // 0から2までのランダムな数を生成
  var a = random(2);

  // プレイヤーの位置が画面の左上にいる場合
  if (player.position.x < width / 2 && player.position.y < height / 2) {
    // aが1より小さい場合は画面の右側からランダムな高さで位置を決定
    if (a < 1) {
      return [width, random(height)];
    } else { // aが1以上の場合は画面の上辺からランダムな位置で位置を決定
      return [random(width), height];
    }
  } 
  // プレイヤーの位置が画面の右上にいる場合
  else if (player.position.x > width / 2 && player.position.y < height / 2) {
    // aが1より小さい場合は画面の左側からランダムな高さで位置を決定
    if (a < 1) {
      return [0, random(height)];
    } else { // aが1以上の場合は画面の上辺からランダムな位置で位置を決定
      return [random(width), height];
    }
  } 
  // プレイヤーの位置が画面の左下にいる場合
  else if (player.position.x < width / 2 && player.position.y > height / 2) {
    // aが1より小さい場合は画面の右側からランダムな高さで位置を決定
    if (a < 1) {
      return [width, random(height)];
    } else { // aが1以上の場合は画面の下辺からランダムな位置で位置を決定
      return [random(width), 0];
    }
  } 
  // プレイヤーの位置が画面の右下にいる場合
  else {
    // aが1より小さい場合は画面の左側からランダムな高さで位置を決定
    if (a < 1) {
      return [0, random(height)];
    } else { // aが1以上の場合は画面の下辺からランダムな位置で位置を決定
      return [random(width), 0];
    }
  }
}


function playerMotion() {
  // プレイヤーの移動速度を減速させるための定数
  var playerDelaySpeed = 0.4;

  // マウスのX座標とプレイヤーのX座標の差を求める
  velocityX = mouseX - player.position.x;
  // プレイヤーのX座標を遅延させる
  velocityX *= playerDelaySpeed;

  // マウスのY座標とプレイヤーのY座標の差を求める
  velocityY = mouseY - player.position.y;
  // プレイヤーのY座標を遅延させる
  velocityY *= playerDelaySpeed;

  // プレイヤーの新しいX座標を設定する
  player.position.x += velocityX;
  // プレイヤーの新しいY座標を設定する
  player.position.y += velocityY;
}

function gameOver() {
  // ゲームオーバー画面の描画設定
  imageMode(CENTER);
  // ゲームオーバー画像を描画する
  image(GameOverImage, windowWidth / 2, windowHeight / 2 - 55);

  // 敵オブジェクトを全て削除する
  for (var i = enemies.length - 1; i >= 0; i--) {
    enemies[i].remove();
    enemies.splice(i, 1);
  }

  // プレイヤーと目標オブジェクトを削除する
  player.remove();
  goal.remove();

  // スコアテキストを表示（'end'）
  scoreText('end');
}

function goalPosition() {
  // 目標オブジェクトのX座標とY座標をランダムに設定する
  goal.position.x = random(width);
  goal.position.y = random(height);
}

function playerDirection() {
  // プレイヤーが目標オブジェクトに向けてどの角度を向くべきかを計算する
  dx3 = goal.position.x - player.position.x;
  dy3 = goal.position.y - player.position.y;
  playerAngle = atan2(dy3, dx3);

  // プレイヤーの回転角度を設定する
  player.rotation = degrees(playerAngle);
}

function scoreText(condition) {
  // 'play'のときのスコアテキスト設定
  if (condition == 'play') {
    fill(0, 190, 255);
    textSize(60);
    textFont('Tahoma');
    textStyle(BOLD);
    text('score ' + score, 20, 55);
  } 
  // 'end'のときのスコアテキスト設定
  else if (condition == 'end') {
    textAlign(CENTER);
    fill(0, 190, 255);
    textSize(100);
    textFont('serif');
    textStyle(BOLD)
    //ゲーム終了時のスコアテキストを絵画(画面中央に大きなサイズで)
    text('score ' + score, width / 2, height / 2 + 250);

  }
}


function draw() {
  // 背景に画像を設定
  background(backgroundImage);

  // 敵のスピードが増加しているときに点滅させるロジック
  if (isBlinking) {
    // frameCountによる一定の間隔で点滅させる
    enemySpeedIncrease.visible = frameCount % flashingTime < flashingTime / 2;

    // 点滅が一定時間（ここでは80フレーム）以上続いた場合、点滅を停止
    if (frameCount - timer > 80) {
      isBlinking = false;
    }
  } else {
    // 点滅していないときは、enemySpeedIncreaseを非表示にする
    enemySpeedIncrease.visible = false;
    // タイマーをリセット
    timer = frameCount;
  }

  // プレイボタンがマウスカーソルと重なっているかを判定
  if (playButtom.overlapPoint(mouseX, mouseY)) {
    // マウスがスプライト上にある場合、スプライトを大きくする
    playButtom.scale = 1.2;
  } else {
    // マウスがスプライト上にない場合、スプライトを元の大きさに戻す
    playButtom.scale = 1;
  }

  // ThumbnailとThumbnail2を描画する条件を満たしている場合、それぞれを描画
  if (drawThumbnail) {
    drawSprite(Thumbnail);
  }

  if (drawThumbnail2) {
    drawSprite(Thumbnail2);
  }

  // ゲームがプレイ中のときの処理
  if (gamePlaying) {
    // プレイヤーの動きを制御
    playerMotion();

    // スコアテキストを表示
    scoreText('play');

    // プレイヤーがゴールに到達したときの処理
    if (player.overlap(goal)) {
      // ゴールの音を再生
      goalSound.play();
      // 敵を作成
      enemyCreate();
      // ゴールの位置を変更
      goalPosition();
      // 点滅を開始
      isBlinking = true;
    }

    // すべての敵の動きを制御
    for (var i = 0; i < enemies.length; i++) {
      enemyMotion(enemies[i]);
    }

    // プレイヤーの方向を制御
    playerDirection();

    // プレイヤーが敵と重なったときの処理
    if (enemyGroup.overlap(player)) {
      // ゲームを終了状態に設定
      gamePlaying = false;
      gameFinished = true;
      // ゲームオーバーの音を再生
      gameOverSound.play();
    }

    // プレイヤーの位置履歴を保存
    playerPosHistory.push(createVector(player.position.x, player.position.y));

  }

 
  playButtom.onMousePressed = function () {
    // プレイボタンが押されたときの処理
  
    // プレイボタン音を再生
    playSound.play();
  
    // タイトル画面の要素を削除
    title.remove();
    playButtom.remove();
    Thumbnail.remove();
    Thumbnail2.remove();
  
    // ゲームを開始状態に設定
    gamePlaying = true;
  
    // プレイヤースプライトを作成し、画像を設定
    player = createSprite();
    player.addImage(playerImage);
  
    // ゴールスプライトを作成し、画像を設定
    goal = createSprite(width / 2, height / 2);
    goal.addImage(goalImage);
  
    // プレイヤーの初期位置を設定
    player.position.x = 0;
    player.position.y = 0;
  
    // ゲームオーバー画像を読み込む
    GameOverImage = loadImage('data/GameOver.png');
  
    // 敵グループを作成
    enemyGroup = new Group();
  
    // BGMを再生する（具体的なコードは省略されています）
  }
  
  if (gameFinished) {
    // ゲームが終了していたらゲームオーバー画面を表示
    gameOver();
  }
  
  
  // すべてのスプライトを描画
  drawSprites();
  

  }


