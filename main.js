song1 = "";
song2 = "";

function preload()
{
    song1 = loadSound("Faded.mp3");
    song2 = loadSound("Darkside.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
}