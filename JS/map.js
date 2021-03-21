window.onload = start;                     // функция onload запускает функцию start при запуске web-страницы
var fon = new Image();                     // создаем изображение   
    fon.src = "../IMG/fon.jpg";            // путь к изображению фон    
var gamerR = new Image();                  // создаем изображение 
    gamerR.src = "../IMG/cat.png";         // путь к изображению персонаж R (& начальной позиции)
var gamerL = new Image();                  // создаем изображение 
    gamerL.src = "../IMG/cat_1.png";       // путь к изображению персонаж L
var catR = new Image();                    // создаем изображение 
    catR.src = "../IMG/cap.png";           // путь к изображению враг R
var catL = new Image();                    // создаем изображение 
    catL.src = "../IMG/capl.png";          // путь к изображению враг L
var shellBlue = new Image();               // создаем изображение 
    shellBlue.src = "../IMG/blue.png";     // путь к изображению бомбы
var skel = new Image();                    // создаем изображение 
    skel.src = "../IMG/skeletL.png";       // путь к изображению врага 2 левый
var skelR = new Image();                   // создаем изображение 
    skelR.src = "../IMG/skeletR.png";      // путь к изображению врага 2 правый
var hitR = new Image();                    // создаем изображение 
    hitR.src = "../IMG/kick.png";          // путь к изображению персонажа при ударе мечом
var hitL = new Image();                    // создаем изображение 
    hitL.src = "../IMG/kick_left.png";     // путь к изображению персонажа при ударе мечом

var mapX =  0;
var mapX1 = gameWidth + gameWidth;

var requestAnimFrame = window.requestAnimationFrame ||          // передаем переменной свойства анимации
                        window.webkitRequestAnimationFrame ||   // для работы в других браузерах (иначе при передачи может не отображаться)
                        window.mozRequestAnimationFrame ||      // для работы в других браузерах
                        window.oRequestAnimationFrame ||        // для работы в других браузерах
                        window.msRequestAnimationFrame;         // для работы в других браузерах

var mapCanvas;      // создание переменной для холста
var ctxMap;         // создание переменной для передачи контекста фона
var ctxMap1; 
 
var persCanvas;     // создание переменной для холста
var persR;          // создание переменной для передачи контекста 
var persL;          // создание переменной для передачи контекста
var persStat;       // создание переменной для передачи контекста
var timeCanvas;
var ctxTime;
var enemyCanvas;    // создание переменной для холста
var ctxEnemy;       // создание переменной для передачи контекста

mapCanvas = document.getElementById("game");            //поиск по ID и взоимодействия с полотном через переменную 
ctxMap = mapCanvas.getContext("2d");                    //тип взоимодействия "2d" через переменную 
ctxMap1 = mapCanvas.getContext("2d"); 
persCanvas =  document.getElementById("player");        //поиск по ID и взоимодействия с полотном через переменную 
persR = persCanvas.getContext("2d");                    //тип взоимодействия "2d" через переменную 
persL = persCanvas.getContext("2d");                    //тип взоимодействия "2d" через переменную 
persStat = persCanvas.getContext("2d");                 //тип взоимодействия "2d" через переменную

timeCanvas = document.getElementById("time");            //поиск по ID и взоимодействия с полотном через переменную 
ctxTime = timeCanvas.getContext("2d");  

enemyCanvas =  document.getElementById("enemy");        //поиск по ID и взоимодействия с полотном через переменную 
ctxEnemy = enemyCanvas.getContext("2d");                //тип взоимодействия "2d" через переменную 
ctxEnemy1 = enemyCanvas.getContext("2d");               //тип взоимодействия "2d" через переменную 

var gameWidth = window.innerWidth;                      // создание переменной и задание ширины холста по размеру окна
var gameHeight = window.innerHeight;                    // создание переменной и задание высоты холста по размеру окна
mapCanvas.width = gameWidth;                            // холст по размеру переменной ширина (фон)
mapCanvas.height = gameHeight;                          // холст по размеру переменной высота (фон)
persCanvas.width = gameWidth;                           // холст по размеру переменной ширина (игрок)
persCanvas.height = gameHeight;                         // холст по размеру переменной высота (игрок)
enemyCanvas.width = gameWidth                           // холст по размеру переменной ширина (враг)
enemyCanvas.height = gameHeight;                        // холст по размеру переменной высота (враг)
timeCanvas.width = gameWidth                           // холст по размеру переменной ширина (враг)
timeCanvas.height = gameHeight; 

var fonposishio = 0;

var player = null ;             // создание переменной для обьекта (не являющейся ссылкой на обьект изначально)
var enemy = null;               // создание переменной для обьекта (не являющейся ссылкой на обьект изначально)
var bomb = null;                // создание переменной для обьекта (не являющейся ссылкой на обьект изначально)

player = new Player();          // создание обьекта игрока

var massBomb = [];              //массив бомб (массив где хранятсья все бомбы)
var timeStart = null;

var countEnemy = 0;
var maxEnemy = 10;

function start(){                                               // основная функия
    timeStart = Date.now();
    stat();
    loop();                                                     // вызов функции
    document.addEventListener("keydown", chekKeyDown, false);   //обработчик собития для объекта (для всего документа при событии нажатия клавиши вызывается фукнция)
}
var totalTime = 0;

function timerUpdate(){
    var curTime = Date.now();
    totalTime = curTime - timeStart;
    totalTime = Math.floor(totalTime / 1000);
    var min = Math.floor(totalTime / 60);
    var sec = totalTime % 60;
    var time = min + ":" + sec + " убито врагов " + countEnemy;
    ctxTime.clearRect(0, 0, gameWidth, gameHeight);
    ctxTime.font = "30px Comic Sans MS";
    ctxTime.fillStyle = "red";
    ctxTime.fillText(time, 500, 100);
}
function mainLoop(){
    startLoop();
    update();
}
function emptyLoop(){

}
function update(){
    backgraundImage();          // вызов функции прорисовки холста фона
    player.update();
    enemy.update();
    bobmsUpdate(); 
    timerUpdate();
}
var gameLoop = mainLoop;
function loop(){
    gameLoop();
    requestAnimFrame(loop);
}
function stopLoop()
{
    
}

function startLoop(){
    
    if(enemy == null){                                                    // условие при котором значение переменной enemy не хранит ссылку на обьект                                              // проверка 
        var type_emeny = Math.random();                                   // запись в перменную случайного значения  от 0 до 1
        if(type_emeny<0.5)                                                // условие выбора отрисовки одного из спрайтов
            enemy = new Enemy(0, 0, 100, 94, 282, 94, catL, catR, 100);   // отрисовка спрайта кота
        else 
            enemy = new Enemy(0, 0, 100, 99, 282, 94, skel, skelR, 150);  // отрисовка спрайта скелета //377 99 94 282
    } 
}

function Player(){                      // конструктор коррдинат положения и действий игрока
    this.srcX = 0;                      // созадние переменной (перемешение картинки по х относительно выделенной области (выходя за область будет обрезаться))
    this.srcY = 0;                      // созадние переменной (перемешение картинки по у относительно выделенной области (выходя за область будет обрезаться))
    this.drawX = 0;                     // созадние переменной (координаты по оси х)
    this.drawY = gameHeight-180;        // созадние переменной (координаты по оси у)
    this.width = 60;                    // созадние переменной (размеры ширины)
    this.height = 75;                   // созадние переменной (размеры длины)
    this.speed = 7;                     // созадние переменной (скорость передвежения игрока)
    this.isRight = true;                // созадние переменной (переиешение вправо изначально в false чтобы игрок никуда не двигался)
    this.isLeft = false;                // созадние переменной (переиешение влево изначально в false чтобы игрок никуда не двигался)
    this.hp = 100;                      // значение hp игрока
    this.mp = 100;                      // значение mp игрока
    this.isDie = false;
    
    this.getDamag = function(saze){       // функция снятия здоровья игрока (входное значение размер снятия hp)
        this.hp -= saze;                  // снятие hp
        scaleHp();
        if(this.hp <= 0){                 // условие при котром игрок умирает
            this.die();                   // вызов функции при смерти игрока
        }
    }
    this.die = function(){                  // функция смерти игрока
        gameLoop = emptyLoop;
       // addLiderBoard();
        this.isDie = true;
        document.getElementById("block").style.display = "flex";
    }

    this.addMp = function(saze){        // функция восстановления энергии (передается параметр размера начисляемого mp)
        this.mp += saze;                // начисление mp на saze
        if(this.mp > 100)               // условие при котром энергия не начилсется (ограничение до 100)
            this.mp = 100;              // присвоение значению энергии размера 100
    }
    this.coolDowe = 0;
    this.chekEnemy = function(){
        if(enemy == null) return;
        if(this.drawX >= enemy.drawX &&
            this.drawX <= enemy.drawX + enemy.width ||
            this.drawX <= enemy.drawX &&
            this.drawX >= enemy.drawX - enemy.width){
                enemy.getDamag(25);
        }
    }

    this.regeneretMp = function(){
        if(this.coolDowe >= 100 && !this.isDie){
            this.addMp(10);
            scaleMp();
        }
        this.coolDowe = (this.coolDowe + 1) % 101;
    }

    this.moveLeft = function(){
        if(!this.isDie){
            player.isRight = false; 
            player.isLeft = true;   
            if (this.drawX > gameWidth/4)
            this.drawX -= this.speed;                 // скорость перменешия игрока по координате Х
            if(this.drawX < 0) this.drawX = 0;        // ограничения игрока по карте
            player.draw();                            // вызов функции отрисовки спрайта игрока при хотьбе

            if(fonposishio >=0)
              fonposishio-=4;
        }                         
    }

    this.moveRight = function(){
        if(!this.isDie){   
            player.isLeft = false;      
            player.isRight = true;   
            if (this.drawX < gameWidth/2)
              this.drawX += this.speed;                           // скорость перменешия игрока по координате Х
            if(this.drawX > gameWidth - this.width) 
              this.drawX = gameWidth - this.width;              // ограничения игрока покарте
              player.draw();                                   // вызов функции отрисовки спрайта игрока при хотьбе
            fonposishio+=4;
            if(fonposishio == 1920)
                fonposishio = 0;   
        }
    }

    this.shout = function(){            // функция снятия энергии
        if(this.mp >= 15 && !this.isDie){              // условие при котром снимается энергия
            this.mp -= 15;              // снятие энегрии
            scaleMp();
            getOrCreatBomb(this.drawX, this.isRight); // вызов функции отрисовки бомбы
        }
    }

    this.hit = function(){         // функция отрисовки спрайта удара мечом
        if(this.isDie)
            return;
        if(this.isRight){
            clearCtxPlayer(); 
            persR.drawImage(hitR, 0, 0, this.width, this.height,  // задание кординат для конкретного изображение (коррекция изображения если оно большое )
            this.drawX, this.drawY, this.width, this.height); 
        }
        else if(this.isLeft){
            clearCtxPlayer(); 
            persL.drawImage(hitL, 0, 0, this.width, this.height,  // задание кординат для конкретного изображение (коррекция изображения если оно большое )
            this.drawX, this.drawY, this.width, this.height); 
        }
        this.chekEnemy();
        setTimeout(function(){player.draw()}, 100);
    }
}

Player.prototype.draw = function(){                                             // функция для обьекта Player
    clearCtxPlayer();                                                           // функция передающая отчистку экрана (задана ниже)
    this.srcX = (this.srcX === 300 ? 0 : this.srcX + 60);                       // уравнение обновления кадра (проверяем дошел ли Х до придела и возвращаем Х в начальную позицию)
    if(this.isRight)                                                                  // условие для выполнения отрисовки кадра при r=1 через функцию chekKeyDown
        persR.drawImage(gamerR, this.srcX, this.srcY, this.width, this.height,  // задание кординат для конкретного изображение (коррекция изображения если оно большое )
        this.drawX, this.drawY, this.width, this.height);                       // (двигать изображение по экрану)
    if(this.isLeft)                                                                  // условие для выполнения отрисовки кадра при r=2 через функцию chekKeyDown
        persL.drawImage(gamerL, this.srcX, this.srcY, this.width, this.height,  // задание кординат для конкретного изображение (коррекция изображения если оно большое )
            this.drawX, this.drawY, this.width, this.height);                   // (двигать изображение по экрану)
}   

Player.prototype.update = function(){
    this.regeneretMp();
}

function chekKeyDown(e){                        // функция нажатия клавиш
    var keyID = e.keyCode || e.which;           // поддержка других браузеров и присвоение кодам клавиш переменной
    var keyChar = String.fromCharCode(keyID);   // преобразование кода клавиш к строковому виду и запись ее в переменную
    if(keyChar == "X"){  
        e.preventDefault();
        player.moveRight();
    }
    if(keyChar == "Z"){                        
        e.preventDefault();        
        player.moveLeft();              
    }
    if(keyChar == "N"){                         
        e.preventDefault();                     
        player.shout();
    }
    if(keyChar == "M"){                         
        e.preventDefault();                     
        player.hit();
    }
}

function Bomb(playerPoz, right = true){                        // конструктор коррдинат положения и действий игрока
    this.srcX = 0;                      // созадние переменной (перемешение картинки по х относительно выделенной области (выходя за область будет обрезаться))
    this.srcY = 0;                      // созадние переменной (перемешение картинки по у относительно выделенной области (выходя за область будет обрезаться))
    this.drawX = playerPoz;             // созадние переменной (координаты по оси х)
    this.drawY = gameHeight-160;        // созадние переменной (координаты по оси у)
    this.width = 64;                    // созадние переменной (размеры ширины)
    this.height = 60;                   // созадние переменной (размеры длины)
    this.speed = right ? 7 : -7;                     // созадние переменной (скорость передвежения игрока)
    this.isBombBlue = false;            // созадние переменной (переиешение влево изначально в false чтобы игрок никуда не двигался)
    this.use = true;                  // 
    this.bombBlue =  document.createElement("canvas");            //поиск по ID и взоимодействия с полотном через переменную 
    this.bombBlue.className = "bomb";
    document.body.appendChild(this.bombBlue);
    this.ctxBomb = this.bombBlue.getContext("2d");                    //тип взоимодействия "2d" через переменную 
    this.bombBlue.width = gameWidth;                              // холст по размеру переменной ширина (враг)
    this.bombBlue.height = gameHeight;                           // холст по размеру переменной высота (враг)
   
    this.isUse = function(){                    // функция возврата значения 
        return this.use;                        // возвращение use значения true
    };
    this.startBomb= function(x, right){                    // функция начала движения с параметром коррдинаты по Х
        this.drawX = x;                             // присвоение коориднате по Х значнеия пераметра х
        this.use = true;                            // присовение use значения true
        this.speed = right ? 7 : -7;
    }
    this.deleteBomb = function(){                            // функция удаления бомбы
        this.use = false;                                   // присовение use значения false
        this.ctxBomb.clearRect(0, 0, gameWidth, gameHeight); // отчистка холста
    }
    this.chekEnemy = function(){
        if(enemy == null) return;
        if(this.drawX >= enemy.drawX &&
            this.drawX <= enemy.drawX + enemy.width ||
            this.drawX <= enemy.drawX &&
            this.drawX >= enemy.drawX - enemy.width){
                enemy.getDamag(25);
                this.deleteBomb();
        }
    }
}
Bomb.prototype.draw = function(){                                                
    this.ctxBomb.clearRect(0, 0, gameWidth, gameHeight);                                // отчистка слоя от начала координат и по его размерам                                                                                     
    this.ctxBomb.drawImage(shellBlue, this.srcX, this.srcY, this.width, this.height,     // задание кординат для конкретного изображение (коррекция изображения если оно большое )
        this.drawX, this.drawY, this.width/2, this.height/2);                            // (двигать изображение по экрану)
}
Bomb.prototype.update = function(){
    if(this.use){
        this.draw();
        this.chekEnemy();
        this.drawX += this.speed;
        if(this.drawX <= 0 || this.drawX >= gameWidth){
            this.deleteBomb();
        }
    }
}

function getOrCreatBomb(positionX, right = true){                      //функция создает или взятия бомб из массива
    var freeBombs = massBomb.filter(function(item){     // создание перменной и запись в нее отфильтрованных значений массива через фильтр 
        return !item.isUse();                           // выбираем все у кого значения false
    });
   // console.log(massBomb);
   // console.log(freeBombs);
    if(freeBombs.length){                               // условие для списка ненуделвой длины
        var bomb = freeBombs[0];                        // берем бомбы из списка 
        bomb.startBomb(positionX, right);                      // запускаем отрисовку бомбы с переданным параметром позиции игрока
    }
    else{
        var bomb = new Bomb(positionX, right);                // создание новой бомбы если список пуст и в нем нет бомб
        massBomb.push(bomb);                            // добавление в массив новой бомбы
    }
}
function bobmsUpdate(){                                 // фукнция отрисовки бомбы находящихся в состоянии 
    var useBombs = massBomb.filter(function(item){       // фильтр 
        return item.isUse();                            // возврашение 
    });
    useBombs.forEach(function(item){      //для каждого элемента мы вызываем функцию update     
        item.update();
    });
}

function Enemy(srcX, srcY, width, height, maxSprat, step, sprateL, sprateR, hpEnemy){               // конструктор коррдинат положения и действий врага
    this.srcX = srcX;                                                                               // созадние переменной (перемешение картинки по х относительно выделенной области (выходя за область будет обрезаться))
    this .srcY= srcY;                                                                           // созадние переменной (перемешение картинки по у относительно выделенной области (выходя за область будет обрезаться))
    this.drawX = (Math.random() * gameWidth) + gameWidth;                                         // созадние переменной (координаты по оси х)
    this.drawY = gameHeight-190;                                                                 // созадние переменной (координаты по оси у)
    this.width = width;                                                                             // созадние переменной (размеры ширины)
    this.height = height;                                                                             // созадние переменной (размеры длины)
    this.speed = 2;                                                                               // созадние переменной (скорость передвежения игрока)
    this.hpEnemy = hpEnemy;                                                                  // созадние переменной здоровья врага
    this.maxSprat = maxSprat;                                                                //максимальный кадр спрайта
    this.step = step;                                                                        //шаг на который меняется кадр
    this.sprateL = sprateL;                                                                 //изображение спрайта левой стороны
    this.sprateR = sprateR;                                                                  //изображение спрайта правой стороны
    this.tc = 0;
    this.getDamag = function(saze){                                                                     // функция снятия hp у врага
        this.hpEnemy -= saze;                                                                           // снятие hp врага
        if(this.hpEnemy <= 0){                                                                          // условие смерти игрока
            enemy = null;
            countEnemy ++;
            if(countEnemy == maxEnemy){
              gameLoop = emptyLoop;
              addLiderBoard();
              player.isDie = true;
              document.getElementById("block1").style.display = "flex";
            }                                                                               // затирание ссылки на отрисованный обьект

          }   
    }
    this.chekEnemy = function(){
        if(this.drawX >= player.drawX &&
            this.drawX <= player.drawX + player.width ||
            this.drawX <= player.drawX &&
            this.drawX >= player.drawX - player.width){
                player.getDamag(10);
        }
    }
}
function addLiderBoard(){
  var namePlayer = localStorage.getItem("nameplayer");
  var liderBoard = localStorage.getItem("liderboard");
  if(liderBoard){
    liderBoard = JSON.parse(liderBoard);
  }
  else{
    liderBoard = [];
  }
  var item = {"playername" : namePlayer, "countenemy" : countEnemy, "time" : totalTime};
  liderBoard.push(item);
  liderBoard = JSON.stringify(liderBoard);
  localStorage.setItem("liderboard", liderBoard);
}

Enemy.prototype.draw = function(){                                                   //377 104  4 94.25 282.75
    clearCtxEnemy();                                                                //вызов функции отчистки холста
    this.srcX = (this.srcX >= this.maxSprat ? 0 : this.srcX + this.step);                           // уравнение обновления кадра (проверяем дошел ли Х до придела и возвращаем Х в начальную позицию)
    if (i == 1) {                                                                   // условие для выполнения отрисовки кадра при r=1 через функцию enemy.update
        ctxEnemy.drawImage(this.sprateL, this.srcX, this.srcY, this.width, this.height,     // задание кординат для конкретного изображение (коррекция изображения если оно большое )
            this.drawX, this.drawY, this.width, this.height);                       // (двигать изображение по экрану)
    }
    else
        ctxEnemy.drawImage(this.sprateR, this.srcX, this.srcY, this.width, this.height,     // задание кординат для конкретного изображение (коррекция изображения если оно большое )
            this.drawX, this.drawY, this.width, this.height);                       // (двигать изображение по экрану)
}

Enemy.prototype.update = function(){                        // функция перемешения по карте
    
    if(this.drawX > player.drawX+3){                        // условие при котором меняется координа Х персонажа
        i = 0;                                              // условие для отрисовки кадра через функцию enemy.draw
        this.drawX -= this.speed;                                    // смена координа Х персонажа (движение персонажа по карте)
    }
    else{
        if(this.drawX < player.drawX-50){                   // условие при котором меняется координа Х персонажа 
                i = 1;                                      // условие для отрисовки кадра через функцию enemy.draw
                this.drawX += this.speed;                            // смена координа Х персонажа (движение персонажа по карте)
        }       
    }
    if(this.drawX + this.width + 500  < 0)
        this.drawX = (Math.random() * 5);

    if(this.tc > 7)                 // количество кадров
    {                             
        enemy.draw();             // вызов функции enemy.draw  
        enemy.chekEnemy();
        this.tc = 0;                // обнуление кадров
    }
    this.tc += 1.5;               // увелечение кадра на 1.5
}

function clearCtxPlayer(){                                  // функция отчистки холста
    persR.clearRect(0, 0, gameWidth, gameHeight);           // отчистка слоя от начала координат и по его размерам 
}
function clearCtxEnemy(){                                   // функция отчистки холста
    ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);        // отчистка слоя от начала координат и по его размерам 
}
function backgraundImage(){                                 //функция прорисовки фона
    ctxMap.drawImage(fon, fonposishio, 0, 1920, 1080,                  // задание кординат для конкретного изображение (коррекция изображения если оно большое)
        0, 0, gameWidth, gameHeight);                                                     // (двигать изображение по экрану)
}
function stat(){                                            // функция коррдинат положения игрока (начальная отрисовка игрока)
    persStat.drawImage(gamerR, 0, 0, 60, 75,                // задание кординат для конкретного изображение (коррекция изображения если оно большое )
        0, gameHeight-180, 60, 75);                         // (двигать изображение по экрану)
}
function scaleMp() {
    var scale = player.mp;
    switch (scale) {
    case 100: {
      document.getElementById("MP").style.width = "200px";
      break;
    }
    case 95: {
      document.getElementById("MP").style.width = "191px";
      break;
    }
    case 90: {
      document.getElementById("MP").style.width = "182px";
      break;
    }
    case 80: {
      document.getElementById("MP").style.width = "173px";
      break;
    }
    case 85: {
      document.getElementById("MP").style.width = "164px";
      break;
    }
    case 80: {
      document.getElementById("MP").style.width = "165px";
      break;
    }
    case 75: {
      document.getElementById("MP").style.width = "146px";
      break;
    }
    case 70: {
      document.getElementById("MP").style.width = "137px";
      break;
    }  
    case 65: {
      document.getElementById("MP").style.width = "128px";
      break;
    }
    case 60: {
      document.getElementById("MP").style.width = "119px";
      break;
    }
    case 55: {
      document.getElementById("MP").style.width = "110px";
      break;
    }
    case 50: {
      document.getElementById("MP").style.width = "101px";
      break;
    }
    case 45: {
      document.getElementById("MP").style.width = "92px";
      break;
    }
    case 40: {
      document.getElementById("MP").style.width = "83px";
      break;
    }
    case 35: {
      document.getElementById("MP").style.width = "74px";
      break;
    }
    case 30: {
      document.getElementById("MP").style.width = "65px";
      break;
    }
    case 25: {
      document.getElementById("MP").style.width = "56px";
      break;
    }
    case 20: {
      document.getElementById("MP").style.width = "47px";
      break;
    }
    case 15: {
      document.getElementById("MP").style.width = "38px";
      break;
    }
    case 10: {
      document.getElementById("MP").style.width = "29px";
      break;
    }
    case 5: {
      document.getElementById("MP").style.width = "20px";
      break;
    }
    default: {
      document.getElementById("MP").style.width = "0px";
      break;
    }
  }
}
function scaleHp() {
    var life = player.hp;
    switch (life) {
    case 100: {
      document.getElementById("HP").style.width = "200px";
      break;
    }
    case 95: {
      document.getElementById("HP").style.width = "191px";
      break;
    }
    case 90: {
      document.getElementById("HP").style.width = "182px";
      break;
    }
    case 80: {
      document.getElementById("HP").style.width = "173px";
      break;
    }
    case 85: {
      document.getElementById("HP").style.width = "164px";
      break;
    }
    case 80: {
      document.getElementById("HP").style.width = "165px";
      break;
    }
    case 75: {
      document.getElementById("HP").style.width = "146px";
      break;
    }
    case 70: {
      document.getElementById("HP").style.width = "137px";
      break;
    }  
    case 65: {
      document.getElementById("HP").style.width = "128px";
      break;
    }
    case 60: {
      document.getElementById("HP").style.width = "119px";
      break;
    }
    case 55: {
      document.getElementById("HP").style.width = "110px";
      break;
    }
    case 50: {
      document.getElementById("HP").style.width = "101px";
      break;
    }
    case 45: {
      document.getElementById("HP").style.width = "92px";
      break;
    }
    case 40: {
      document.getElementById("HP").style.width = "83px";
      break;
    }
    case 35: {
      document.getElementById("HP").style.width = "74px";
      break;
    }
    case 30: {
      document.getElementById("HP").style.width = "65px";
      break;
    }
    case 25: {
      document.getElementById("HP").style.width = "56px";
      break;
    }
    case 20: {
      document.getElementById("HP").style.width = "47px";
      break;
    }
    case 15: {
      document.getElementById("HP").style.width = "38px";
      break;
    }
    case 10: {
      document.getElementById("HP").style.width = "29px";
      break;
    }
    case 5: {
      document.getElementById("HP").style.width = "20px";
      break;
    }
    default: {
      document.getElementById("HP").style.width = "0px";
      break;
    }
  }
}