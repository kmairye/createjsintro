"use strict";
// LOAD THE DOM
window.addEventListener("load", init);


// SETTINGS
const settings = {
    speed: 8,
    width: 600,
    height: 600,
    carWidth: 50,
    carHeight: 50,
    bulletSpeed: 20,
    enemySpeed: 5,
    counter: 0,
    keys: {
        left: false,
        right: false,
        up: false,
        down: false
    },
    enemyRadius: 40,
    bulletRadius: 4 
}



// GLOBAL VARIABLES, SOME ARE ARRAY
let stage, car, bullets=[], enemies=[];



// 
function init(){
    // STAGE
    stage = new createjs.Stage("stage");
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tock);
    console.log("load event happened");
    
    // CAR
    car = new createjs.Container();
    car.brand = "Ferrari";
    car.direction="right";
    car.x = settings.width/2-settings.carWidth/2;
    car.y=settings.height-settings.carHeight;
    
    // BOX
    let box = new createjs.Shape();
    box.graphics.beginFill("#bada55");
    box.graphics.drawRect(0,0, settings.carWidth, settings.carHeight);
    car.addChild(box);

    // CIRCLE
    /* let circle = new createjs.Shape();
    circle.graphics.beginFill("#c0ffee");
    circle.graphics.drawCircle(0,0, settings.bulletRadius);
    circle.x=20;
    circle.y=60; */
/*     car.addChild(circle);
 */
    // CIRCLE2
    /* let circle2 = new createjs.Shape();
    circle2.graphics.beginFill("#c0ffee");
    circle2.graphics.drawCircle(0,0, settings.bulletRadius);
    circle2.x=80;
    circle2.y=60;
    car.addChild(circle2);
    stage.addChild(car); */

    // ADD CHILDREN
/*     car.addChild(circle2);
 */    stage.addChild(car);

    // ADD CONTROL BUTTONS

    // ON KEY DOWN
    window.addEventListener(`keydown`, (e) => {
        const keyName = e.key; 
        if (keyName === "ArrowLeft") {
            settings.keys.left = true;
        } else if(keyName === "ArrowUp") {
            settings.keys.up = true;
        } else if(keyName === "ArrowDown") {
            settings.keys.down = true;
        } else if(keyName === "ArrowRight") {
            settings.keys.right = true;
        }
    });

    // ON KEY UP
    window.addEventListener(`keyup`, (e) => {
        const keyName = e.key; 

        if (keyName === "ArrowLeft") {
            settings.keys.left = false;
        } else if(keyName === "ArrowUp") {
            settings.keys.up = false;
        } else if(keyName === "ArrowDown") {
            settings.keys.down = false;
        } else if(keyName === "ArrowRight") {
            settings.keys.right = false;
        } 
        // ON SPACE
        if(keyName === " "){ 
         let bullet = getEntity(settings.bulletRadius, (car.x+settings.carWidth/2), car.y);
          bullets.push(bullet);
        }
    })
}



// GET ELEMENT / CREATE ELEMENT
function getEntity(radius, x, y) {
    let entity = new createjs.Shape();
    entity.graphics.beginFill("#fff").drawCircle(0,0,radius);
    entity.x = x;
    entity.y = y;
    stage.addChild(entity);
    return entity;
} 



// ENEMIES
function moveEnemies(){
    enemies.forEach((b, i)=>{
        b.y+=settings.enemySpeed;
        if(b.y > settings.height+settings.enemyRadius) {
            stage.removeChild(b);
            enemies.splice(i, 1);
        }
    });
}



// BULLETS
function moveBullets(){
    bullets.forEach((b, i)=>{
        b.y-=settings.bulletSpeed;
        if(b.y < 0) {
            stage.removeChild(b);
            bullets.splice(i, 1);
        }
    });
}



// HERO
function moveHero() {
    if(settings.keys.left){
        car.x-=settings.speed;
        if(car.x < 0) {
            car.x = 0;
        }
    }
    if(settings.keys.right){
        car.x+=settings.speed;
        if(car.x+settings.carWidth > settings.width){
            car.x = settings.width - settings.carWidth;
        }
    }
    if(settings.keys.up){
        car.y-=settings.speed;
        if(car.y+70 < 0+70){
            car.y = 0;
        }
    }
    if(settings.keys.down){
        car.y+=settings.speed;
        if(car.y > settings.height-70) {
            car.y = settings.height-70;
        }
    }
}



// BULLETS VS ENEMIES
function bulletsVsEnemies() {
    bullets.forEach((b, i)=> {
        enemies.forEach((e, j) => {
            if(distance(b, e) < settings.bulletRadius+settings.enemyRadius) {
                console.log("HIT");
                stage.removeChild(e);
                stage.removeChild(b);
                bullets.splice(i, 1);
                enemies.splice(j, 1);
            }
        });
    });
}



// ENEMIES VS HERO
function enemiesVsHero() {
    let imaginaryCir = {
        x: car.x + settings.carWidth / 2,
        y: car.y + 60/2,
        r: 40
    };
    //console.log(imaginaryCir);
    enemies.forEach((e,i) => {
        if(distance(e, imaginaryCir) < 60) {
            console.log("An enemy hit the car");
            stage.removeChild(e);
            enemies.splice(i, 1);
        };
    });
}


// HIT DETECTION
function hitDetection() {
    bulletsVsEnemies();
    enemiesVsHero();
    
}

// THE TOCK FUNCTION
function tock(e){//refractoring
    moveBullets();
    moveEnemies();
    moveHero();

    hitDetection();


    settings.counter++;
    if(settings.counter%100===0) {
        console.log("stop counting");
        let enemy = getEntity(25, Math.random()*settings.width, 25);
        enemies.push(enemy);
    }
    stage.update(e);
}




// THE DISTANCE FUNCTION
function distance(obj1, obj2) {
    var difx = obj1.x - obj2.x;
    var dify = obj1.y - obj2.y;
    var t = Math.sqrt( ( difx*difx ) + (dify*dify) );
    return t;
}