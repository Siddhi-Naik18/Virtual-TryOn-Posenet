const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

async function setupCamera() {
    video.width = 640;
    video.height = 480;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise(resolve => video.onloadedmetadata = resolve);
}

async function loadBodyPix() {
    return await bodyPix.load();
}

async function detectBody(model) {
    const segmentation = await model.segmentPerson(video, {
        internalResolution: 'medium',
        segmentationThreshold: 0.7
    });

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get body part positions
    const leftShoulder = segmentation.allPoses[0]?.keypoints.find(p => p.part === "leftShoulder");
    const rightShoulder = segmentation.allPoses[0]?.keypoints.find(p => p.part === "rightShoulder");
    const leftHip = segmentation.allPoses[0]?.keypoints.find(p => p.part === "leftHip");
    const rightHip = segmentation.allPoses[0]?.keypoints.find(p => p.part === "rightHip");

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
        drawClothing(leftShoulder, rightShoulder, leftHip, rightHip);
    }
}

function drawClothing(leftShoulder, rightShoulder, leftHip, rightHip) {
    const tshirt = document.getElementById("tshirt");
    const pants = document.getElementById("pants");

    const shirtWidth = rightShoulder.position.x - leftShoulder.position.x;
    const shirtHeight = (leftHip.position.y - leftShoulder.position.y) * 0.8;
    const shirtX = leftShoulder.position.x;
    const shirtY = leftShoulder.position.y;

    const pantsWidth = rightHip.position.x - leftHip.position.x;
    const pantsHeight = (rightHip.position.y - leftHip.position.y) * 2;
    const pantsX = leftHip.position.x;
    const pantsY = leftHip.position.y;

    ctx.drawImage(tshirt, shirtX, shirtY, shirtWidth, shirtHeight);
    ctx.drawImage(pants, pantsX, pantsY, pantsWidth, pantsHeight);
}

async function init() {
    await setupCamera();
    canvas.width = video.width;
    canvas.height = video.height;
    const model = await loadBodyPix();
    setInterval(() => detectBody(model), 100);
}

init();