let video;
let bodyPose;
let connections; 
let poses = [];



// function mousePressed() {
//     console.log(poses);
// }


let glassesOptions = ["specs.png", "specs3-Photoroom.png", "specs2-Photoroom.png", "specs4-Photoroom.png"];
let currentGlasses = 0;

let earringOptions = ["earring-Photoroom.png", "earring1-Photoroom.png", "earring2-Photoroom.png"];
currentEarring = 0;

function preload() {
    bodyPose = ml5.bodyPose("BlazePose", {flipped:true});
    specs = loadImage("images/" + glassesOptions[currentGlasses]);
    earring = loadImage("images/" + earringOptions[currentEarring]);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO, {flipped:true});
    video.hide();

    bodyPose.detectStart(video, gotPoses);
    connections = bodyPose.getSkeleton();
    console.log(connections);

    let glassesButton = createButton("Next Glasses");
    glassesButton.position(120, height + 10);
    glassesButton.mousePressed(() => {
        currentGlasses = (currentGlasses + 1) % glassesOptions.length;
        specs = loadImage("images/" + glassesOptions[currentGlasses]);
        earring = loadImage("images/" + earringOptions[currentEarring]);
    });

    let earringButton = createButton("Next Earring");
    earringButton.position(240, height + 10);
    earringButton.mousePressed(() => {
        currentEarring = (currentEarring + 1) % earringOptions.length;
        earring = loadImage("images/" + earringOptions[currentEarring]);
    });
}

function gotPoses(results){
    poses = results;
}

function draw() {
    image(video, 0, 0);

    if(poses.length > 0) {
        let pose = poses[0];

        // let x = pose.nose.x;
        // let y = pose.nose.y;
        // fill(255,0,0);
        // circle(x,y,20);

        // for(let i = 0; i < pose.keypoints.length; i++) {
        //     let keypoint = pose.keypoints[i];
        //     fill(0, 0, 255);
        //     noStroke();
        //     if(keypoint.confidence > 0.1) {
        //         circle(keypoint.x, keypoint.y, 12);
        //     }
        // }

        // for(let i = 0; i<connections.length; i++) {
        //     let connection = connections[i];
        //     let a = connection[0];
        //     let b = connection[1];
        //     let keypointA = pose.keypoints[a];
        //     let keypointB = pose.keypoints[b];

        //     let confA = keypointA.confidence;
        //     let confB = keypointB.confidence;

        //     if(confA > 0.1 && confB > 0.1) {
        //         stroke(255,255,255);
        //         strokeWeight(5);
        //         line(keypointA.x, keypointA.y, keypointB.x, keypointB.y);
        //     }
        // }

        let rx = pose.right_eye_outer.x;
        let ry = pose.right_eye_outer.y;

        let lx = pose.left_eye_outer.x;
        let ly = pose.left_eye_outer.y;
        
        let centerX = (rx + lx) / 2;
        let centerY = (ry + ly) / 2;
        
        // Distance between eyes for scaling
        let eyeDistance = dist(lx, ly, rx, ry);
        let glassesWidth = eyeDistance * 2;
        let glassesHeight = glassesWidth * 0.5;
        let glassesAngle = atan2(ry - ly, rx - lx); // This is correct

        push();
        translate(centerX, centerY);
        rotate(glassesAngle);
        imageMode(CENTER);
        image(specs, 0, 0, glassesWidth, glassesHeight); // <-- MOVE HERE!
        pop();

        let leftEar = pose.left_ear;
        let rightEar = pose.right_ear;

        let earringWidth = eyeDistance * 0.5;
        let earringHeight = earringWidth * 1.5;
        
        push();
        if (leftEar && rightEar) {
            imageMode(CENTER);
            image(earring, leftEar.x - 30, leftEar.y + 40, earringWidth, earringHeight);  // slight downward shift
            image(earring, rightEar.x + 30, rightEar.y + 40, earringWidth, earringHeight);
        }
        pop();


    }
}