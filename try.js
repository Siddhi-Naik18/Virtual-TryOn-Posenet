let video;
let bodyPose;
let poses = [];
let specs, tshirt;

function preload() {
    bodyPose = ml5.bodyPose("BlazePose", { flipped: true });
    specs = loadImage("images/specs.png");  // Add your own image
    tshirt = loadImage("images/images.png"); // Add your own image
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO, {flipped:true});
    video.hide();
    bodyPose.detectStart(video, gotPoses);
}

function gotPoses(results) {
    poses = results;
}

function draw() {
    image(video, 0, 0);

    if (poses.length > 0) {
        let pose = poses[0];

        // Draw face keypoints
        for (let i = 0; i < pose.keypoints.length; i++) {
            let keypoint = pose.keypoints[i];
            if (keypoint.confidence > 0.1) {
                fill(0, 0, 255);
                noStroke();
                circle(keypoint.x, keypoint.y, 10);
            }
        }

        // Glasses placement
        let rx = pose.right_eye_outer.x;
        let ry = pose.right_eye_outer.y;
        let lx = pose.left_eye_outer.x;
        let ly = pose.left_eye_outer.y;
        let centerX = (rx + lx) / 2;
        let centerY = (ry + ly) / 2;
        let eyeDistance = dist(lx, ly, rx, ry);
        let glassesWidth = eyeDistance * 2;
        let glassesHeight = glassesWidth * 0.5;
        image(specs, centerX - glassesWidth / 2, centerY - glassesHeight / 2, glassesWidth, glassesHeight);

        // Get key body points
        let leftShoulder = pose.left_shoulder;
        let rightShoulder = pose.right_shoulder;
        let leftHip = pose.left_hip;
        let rightHip = pose.right_hip;

        // Adjust hip positions to widen the shirt placement
        let hipXShift = (leftHip.x - rightHip.x) * 0.3; // Adjust width

        // Calculate torso center and dimensions
        let torsoCenterX = (leftShoulder.x + rightShoulder.x + leftHip.x + rightHip.x) / 4;
        let torsoCenterY = (leftShoulder.y + rightShoulder.y + leftHip.y + rightHip.y) / 4;
        let torsoWidth = abs(rightShoulder.x - leftShoulder.x) * 1.9 + hipXShift;
        let torsoHeight = abs(leftHip.y - leftShoulder.y) * 1.3;

        // Calculate rotation angle
        let angle = atan2(rightShoulder.y - leftShoulder.y, rightShoulder.x - leftShoulder.x);

        // Draw the rotated shirt
        push();
        translate(torsoCenterX, torsoCenterY);
        rotate(angle);
        imageMode(CENTER);
        image(tshirt, 0, 0, torsoWidth, torsoHeight);
        pop();
    }
}
