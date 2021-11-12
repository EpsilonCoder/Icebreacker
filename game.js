var direction=0;//1 for left and -1 for right
var isShooting=false;

const moveLeft=()=>{
    direction=1;
}
const moveRight=()=>{
    direction=-1;
}
const shoot=()=>{
    isShooting=true;
}

window.onload=()=>{
//load requirement elements
var container=document.getElementById('container');
var spaceShip=document.getElementById('spaceship');
var spaceShipImg=document.getElementById('spaceship-img');
var scoreElement=document.getElementById('score');


var score=0;
var playerPos=33;
var rocketsArray=[];
var rocketsPositionX=[];
var rocketsPositionY=[];
var stonesArray=[];
var stonesPositionX=[];
var stonesPositionY=[];
var stonesMoveTime=30;
var stonesCreateTime=2500;
var level=1;
var lastChangeLevel=0;
var gameFinished=false;
//cette constante permet de se deplacer dans l espace
const move=()=>{
    if(!gameFinished){
    //bouger a gauche
    if(direction==1)
            if(playerPos>-10)
                playerPos-=3;
        
    //bouger a droite
    if(direction==-1)
            if(playerPos<65)
                playerPos+=3;
    
    spaceShip.style.left=playerPos+"vw";
    }
}

//handle shooting rockets
const Shoot=()=>{
    if(!gameFinished)
    if(isShooting){
        createNewRocket(playerPos);
        isShooting=false;
    }
}

const createNewRocket=(posX)=>{
    if(!gameFinished){
    //la creation d un nouveau div
    var rocketDiv=document.createElement("div");
    rocketDiv.className="rocket";
    //generation d une nouvelle image
    var rocketImg=document.createElement("img");
    rocketImg.className="rocket-img";
    rocketImg.src="img/kane.png";
 
    rocketDiv.appendChild(rocketImg);
    rocketDiv.style.left=(posX+15)+"vw";
    rocketDiv.style.top=57+"vh";
    
    rocketsArray.push(rocketDiv);
    rocketsPositionX.push(posX+15);
    rocketsPositionY.push(57);
    
    container.appendChild(rocketDiv);
    }
}

const rocketsMove=()=>{
   //ici on va gerer le changement de position 
    if(!gameFinished)
    for(let i=0;i<rocketsArray.length;i++)
    {
        //if they exist
        if(rocketsPositionY[i]!=200){
        rocketsPositionY[i]--;
        rocketsArray[i].style.top=rocketsPositionY[i]+"vh";
        }
      
        if(rocketsPositionY[i]<-10)
        {
            rocketsPositionX[i]=200;
            rocketsPositionY[i]=200;
            container.removeChild(rocketsArray[i]);
                
        }
     
        if(rocketsPositionY[i]!=200)
        RocketHitStone(i);
    }
}

const createNewStone=()=>{
    if(!gameFinished){
    //creation d'un  nouveau element div
    for(let i=0;i<level;i++){
    var stoneDiv=document.createElement("div");
    stoneDiv.className="stone";
    //creation de nouveau ele,ent 
    var stoneImg=document.createElement("img");
    stoneImg.className="stone-img";
    stoneImg.src="img/sekou.png";
    stoneDiv.appendChild(stoneImg);

    var r=Math.random()*70+10;
    var x=Math.floor(r);
    stoneDiv.style.left=x+"vw";
    stoneDiv.style.top=0+"vh";
 
    var s=(Math.random()*4)+8;
    var w=Math.floor(s);
    stoneImg.style.width=w+"vw";
    stoneImg.style.height=w+"vh";

    stonesArray.push(stoneDiv);
    stonesPositionX.push(x);
    stonesPositionY.push(0);

    container.appendChild(stoneDiv);
    }
    }
}
const stonesMove=()=>{
    //changer la position du tireur
    if(!gameFinished){
    for(let i=0;i<stonesArray.length;i++)
    {
        //if they exist
        if(stonesPositionY[i]!=-200){
        stonesPositionY[i]++;
        stonesArray[i].style.top=stonesPositionY[i]+"vh";
        }
       
        if(stonesPositionY[i]>100)
        {
            if(stonesPositionY[i]!=-200)
            container.removeChild(stonesArray[i]);
            
            stonesPositionY[i]=-200;
            stonesPositionX[i]=-200;  
        }
        
    }
    StoneHitSpaceShip();
}
}

const RocketHitStone=(rocketIndex)=>{
    if(!gameFinished)
        for(let i=0;i<stonesArray.length;i++){
         
            if((rocketsPositionY[rocketIndex]>stonesPositionY[i]-1)&&(rocketsPositionY[rocketIndex]<=stonesPositionY[i]+8)&&(rocketsPositionX[rocketIndex]>stonesPositionX[i]-4)&&(rocketsPositionX[rocketIndex]<stonesPositionX[i]+10)){
            stonesPositionY[i]=-200;
            stonesPositionX[i]=-200;
            container.removeChild(stonesArray[i]);
            rocketsPositionX[rocketIndex]=200;
            rocketsPositionY[rocketIndex]=200;
            container.removeChild(rocketsArray[rocketIndex]);
            //change the score
             score++;
             scoreElement.innerHTML="score:"+score;
            }
        }
}

const StoneHitSpaceShip=()=>{
    if(!gameFinished)
    for(let i=0;i<stonesArray.length;i++){
        if((60<stonesPositionY[i])&&(80>stonesPositionY[i])&&(playerPos<stonesPositionX[i])&&(playerPos+30>=stonesPositionX[i])){
            gameOver();
        
        }
    }
}


const changeGameLevel=()=>{
    if(!gameFinished)
    if(score%5==0&&level<8&&lastChangeLevel!=score){
        stonesMoveTime-=3;
        stonesCreateTime-=150;
        level++;
        lastChangeLevel=score;
        
        
    }
}


var movePlayerTimer=setInterval(move,30);
var shootTimer=setInterval(Shoot,30);
var moveRocketsTimer=setInterval(rocketsMove,30);
var movestonesTimer=setInterval(stonesMove,stonesMoveTime);
var createStoneTimer=setInterval(createNewStone,stonesCreateTime);
var changeLevelTimer=setInterval(changeGameLevel,stonesCreateTime);


const gameOver=()=>{
    if(!gameFinished){
        clearInterval(movePlayerTimer);
        clearInterval(moveRocketsTimer);
        clearInterval(movestonesTimer);
        clearInterval(shootTimer);
        clearInterval(createStoneTimer);
        clearInterval(changeLevelTimer);
        movestonesTimer=null;
        movePlayerTimer=null;
        shootTimer=null;
        createStoneTimer=null;
        changeLevelTimer=null; 
        moveRocketsTimer=null;
        spaceShipImg.src="img/fire.png";
        alert("Game Over!");
        alert("Wahaha voici votre score:"+score);
        return;
    }
}

}