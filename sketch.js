console.log("The script is working!")

let model
let video
let gif
let gif2
let button
let font
let background1
let background2

let CynnVisible = false

let detection = "loading..."

function preload(){
  gif = loadImage("overheardText2.gif")
  gif2 = loadImage("useless.gif")
  //font = loadFont ("ComicNeue-Bold.ttf")
  model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/AeZG1Kd5m/")
  background1 = loadImage("BG_WO.png")
  background2 = loadImage("BG_Wpara.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO)
  model.classifyStart(video, gotResults)

  let button = createButton('Publish!');
  button.position(720, 780);
  button.mousePressed (publish)
  button.style ("font-size", "30px")
  button.style ("background", "#edb228")
  button.style ("border-radius","8px")
  button.style ("font-family","Astloch")
  button.style ("font-weight","500")
  button.style ("padding","6px")
}

function draw() {
  background(164, 207, 72);

  //image(video, 0, 0, width, height)
  textSize(30)
  //text(detection, 100, 700)
  image(gif, 10, 80, 700, 500)
  image(gif2, 1050, 300, 450, 250)
  textFont ("Astloch")
  fill (255, 255, 255)
  stroke(255, 255, 255);
  strokeWeight(1)


  if (CynnVisible == false){
    image(video, 0, 0, width, height)
    image(background1, 0, 0, width, height)
    image(gif, 0, 150, 650, 450)
    gif.play()
    image(gif2, 1050, 300, 450, 250)
    gif2.play()
    text("Step Into Frame", 650, 60)

  }

  if (CynnVisible == true){
    image(video, 0, 0, width, height)
    image(background2, 0, 0, width, height)
    image(gif, 0, 150, 650, 450)
   gif.pause()
   image(gif2, 1050, 300, 450, 250)
   gif2.pause()
   text("Parasite Detected...", 650, 60)
  }
}


function gotResults(result){
  console.log(result)

  detection = result [0].label
  console.log(detection)

  if(detection.includes("Cynn")){
    CynnVisible = true
  } else {
    CynnVisible = false
  }

}

function publish(){
  saveCanvas("published", "jpg")

}