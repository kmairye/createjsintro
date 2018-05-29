"use strict";
window.addEventListener("load", init);

const settings = {
    speed: 8,
    width: 600,
    height: 400,
    carWidth: 100,
    bulletSpeed: 20,
    keys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
}
let stage, car, bullets=[];

function init(){
    stage = new createjs.Stage("stage");//the id of the canvas
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tock);
    console.log("load event happened");
    
    car = new createjs.Container();
    car.brand = "Ferrari";

    car.direction="right";
    car.x = settings.width/2-settings.carWidth/2;
    car.y=settings.height-70;
    
    let box = new createjs.Shape();
    box.graphics.beginFill("#bada55");
    box.graphics.drawRect(0,0, settings.carWidth, 60);
    car.addChild(box);

    let circle = new createjs.Shape();
    circle.graphics.beginFill("#c0ffee");
    circle.graphics.drawCircle(0,0, 10);
    circle.x=20;
    circle.y=60;
    car.addChild(circle);

    let circle2 = new createjs.Shape();
    circle2.graphics.beginFill("#c0ffee");
    circle2.graphics.drawCircle(0,0, 10);
    circle2.x=80;
    circle2.y=60;
    car.addChild(circle2);
    stage.addChild(car);

    car.addChild(circle2);
    stage.addChild(car);


    //change direction on click
    /* car.addEventListener(`click`, () => {
        if(car.direction === "right") {
            car.direction = "left";
        } else {
            car.direction = "right";
        }
    }); */

    // on down
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
        console.log(keyName);
    });

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
        if(keyName === " "){
            shoot();
        }
    })
}
function shoot(){
    let bullet = new createjs.Shape();
    bullet.graphics.beginFill("#fff").drawCircle(0,0,4);
    bullet.x = car.x+50;
    bullet.y=car.y;
    bullets.push(bullet);
    stage.addChild(bullet);
}
    
//function for the bullets
function moveBullets(){
    bullets.forEach(b=>{
        b.y-=settings.bulletSpeed;
    });
}
function moveHero() {
    if(settings.keys.left){
        car.x-=settings.speed;
        if(car.x<0) {
            car.x = 0;
            console.log("stop!")
        }
    }
    if(settings.keys.right){
        car.x+=settings.speed;
        if(car.x+settings.carWidth > settings.width){
            car.x = settings.width-carWidth;

        }
    }
    if(settings.keys.up){
        car.y-=settings.speed;
    }
    if(settings.keys.down){
        car.y+=settings.speed;
    }
}
function tock(e){//refractoring
    moveBullets();
    moveHero();
    /*if(car.direction==="right"){
        car.x+=settings.speed;
        if(car.x>settings.width-settings.carWidth){
            car.direction="left";
        }
    } else {
        car.x-=settings.speed;
        if(car.x<=0){
            car.direction="right";
        }
    }*/
    stage.update(e);
}