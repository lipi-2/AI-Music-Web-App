song1 = "";
song2 = "";

song_status = "";
song_status2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

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

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw()
{
    image(video,0,0,500,400);
    fill("#FF0000");
    stroke("#FF0000");

    song_status = song1.isPlaying();
    song_status2 = song2.isPlaying();

    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if (song_status == "false")
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Faded";
        }
    }
    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song1.stop();

        if (song_status2 == "false")
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Darkside";
        }
    }
}