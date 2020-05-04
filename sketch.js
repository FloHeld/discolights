let cnv, soundFile, amp, level;
let red = 252;
let green = 227;
let blue = 138;
let beatSchwellenwert = 0.15;
let beatPause = 40;
let beatDecay = 0.98;
let beatTiefpass = 0;
let waitedFrames = 0;
let hidden = true;
let micon = false;
let levelar = [];
let c;
let active = 0;

// gif_createImg1 = createImg("https://media.giphy.com/media/xpLocgdzHqW9G/giphy.gif");

function preload() {
  // soundFile = loadSound('sis.mp3');



}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);

  mic.start();
  // home();
  // styleButton();
  // makeToggleSwitch();
  // amp = new p5.Amplitude();
  // amp.setInput(soundFile);



  gif_createImg2 = createImg("https://media.giphy.com/media/SUtvUAbKeBXiVdqCMB/giphy.gif");
  gif_createImg2.position(150, 350);
  gif_createImg2.hide();
  $('#startbtn').click(function() {
    $("#napbtn").slideToggle();
    $(".header").toggleClass('header-active');
    active = 1;
  });
  $('#napbtn').click(function() {
    toggleNapoleon();

  });

}

function draw() {
  background(red, green, blue);
  // console.log(micon);


  level = mic.getLevel();


  if (c < 100) {

    levelar[c] = level;
    c++

  } else {
    c = 0;
  }
  console.log("MaxC=" + Math.max(...levelar) + " Avar= " + sum(levelar) / levelar.length);
  


  if (active === 1) {
    findBeat(level);
  }
  // label2.mouseReleased(toggleMic);



}

function findBeat() {
  if (level > beatTiefpass && level > beatSchwellenwert) {
    whenBeat();
    beatTiefpass = level * 1.5;
    waitedFrames = 0;
  } else {
    if (waitedFrames < beatPause) {
      waitedFrames++;
    } else {
      beatTiefpass *= beatDecay;
      beatTiefpass = Math.max(beatTiefpass, beatSchwellenwert);
    }
    if (Math.max(...levelar) < beatSchwellenwert) {
      decSchwelle();
    }
  }
}

function whenBeat() {
  red = random(0, 255);
  green = random(0, 255);
  blue = random(0, 255);
}

function togglePlay() {
  startt.getTime();
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {

    soundFile.loop();
  }
}

function styleButton() {
  button = createButton('Play/Pause');
  button.addClass('button');
  button.mousePressed(togglePlay);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function makeToggleSwitch() {
  // label2 = createElement('label')
  // label2.addClass("switch swimic");
  // micText = createP("Aktiviere dein Mikro!");
  // micText.addClass("mic");
  // input2 = createInput("", "checkbox").parent(label2);
  // span2 = createSpan("").parent(label2);
  // span2.addClass("slider round")
  // label2.mouseReleased(toggleMic);

  label = createElement('label')
  label.addClass("switch swipedro");
  napoText = createP("Tanz nicht allein!");
  napoText.addClass("pedro");
  input = createInput("PEDRO", "checkbox").parent(label);
  span = createSpan("").parent(label);
  span.addClass("slider round")
  label.mouseReleased(toggleNapoleon);
  // #########   Mic   ########


}

function toggleNapoleon() {
  if (hidden === true) {
    gif_createImg2.show();
    hidden = false;

  } else {
    gif_createImg2.hide();
    hidden = true;
  }
}

function home() {
  headline = createElement('h1', "Do You Want To Party?")
  headline.addClass("headline");
}

function toggleMic() {
  if (micon === false) {
    micon = true;
    mic.start();
    // beatSchwellenwert = 0.08;
  } else {
    micon = false;
    mic.stop();
    // beatSchwellenwert = 0.08;
  }

}

function sum(array) {
  var sum = 0;
  array.forEach(function(num) {
    sum += num;
  });
  return sum;
}

function decSchwelle() {
  beatSchwellenwert *= beatDecay;
  beatTiefpass = beatSchwellenwert;
}
