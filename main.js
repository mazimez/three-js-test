var scene = new THREE.Scene();
const vehicleColors = [
    0Xa52523,
    0Xbdb638,
    0X78b14b
]

const playerCar = Truck();
scene.add(playerCar);

//set up lights
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
dirLight.position.set(100, -300, 400);
scene.add(dirLight);

//set up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, //left
    cameraHeight / 2, //right
    cameraHeight / 2, //top
    cameraHeight / -2, //bottom
    0, //near plane
    1000, //far plane
);
camera.position.set(200, -200, 300);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

//set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

function Car() {
    const car = new THREE.Group();
    const backWheel = Wheel();
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = Wheel();
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60, 30, 15),
        new THREE.MeshLambertMaterial({ color: pickRandom(vehicleColors) })
    );
    main.position.z = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;
    const carBackTexture = getCarFrontTexture();
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = -Math.PI / 2
    const carRightSideTexture = getCarSideTexture();
    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.flipY = false;


    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 24, 12), [
            new THREE.MeshLambertMaterial({ map: carFrontTexture }),
            new THREE.MeshLambertMaterial({ map: carBackTexture }),
            new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
            new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
            new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), //top
            new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), //bottom
        ]
    );
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    car.add(cabin);


    const glass = Glass();
    glass.position.x = -14;
    car.add(glass);
    const glass_two = Glass();
    glass_two.position.x = 0;
    car.add(glass_two);

    return car;
}

function Truck() {
    const truck = new THREE.Group();
    const backWheel = Wheel();
    backWheel.position.x = -40;
    truck.add(backWheel);


    const backWheel_two = Wheel();
    backWheel_two.position.x = 0;
    truck.add(backWheel_two);

    const frontWheel = Wheel();
    frontWheel.position.x = 30;
    truck.add(frontWheel);


    const load = new THREE.Mesh(
        new THREE.BoxBufferGeometry(70, 35, 35),
        new THREE.MeshLambertMaterial({ color: "#D8F0FF" })
    );
    load.position.z = 25;
    load.position.x = -22.5;
    truck.add(load);

    const chain = new THREE.Mesh(
        new THREE.BoxBufferGeometry(20, 25, 5),
        new THREE.MeshLambertMaterial({ color: "#D8F0FF" })
    );
    truck.add(chain);
    chain.position.x = 20;
    chain.position.z = 8;
    // const truckFrontTexture = getTruckFrontTexture();
    // const truckBackTexture = getTruckFrontTexture();
    // const truckRightSideTexture = getTruckSideTexture();
    // const truckLeftSideTexture = getTruckSideTexture();

    const front = new THREE.Mesh(
        new THREE.BoxBufferGeometry(20, 30, 25), [
            new THREE.MeshLambertMaterial({ map: truckFrontTexture }),
            new THREE.MeshLambertMaterial({ map: truckBackTexture }),
            new THREE.MeshLambertMaterial({ map: truckLeftSideTexture }),
            new THREE.MeshLambertMaterial({ map: truckRightSideTexture }),
            new THREE.MeshLambertMaterial({ color: "#E4DB3F" }), //top
            new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), //bottom
        ]
    );

    front.position.x = 30;
    front.position.z = 20;
    truck.add(front);

    return truck;
}

function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12, 33, 12),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    );
    wheel.position.z = 6;
    return wheel;
}

function Glass() {
    const glass = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12, 25, 10),
        new THREE.MeshLambertMaterial({ color: 0x333333 })
    )
    glass.position.z = 25.5;
    return glass;
}

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);

    return new THREE.CanvasTexture(canvas);

}

function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}

function getTruckFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#E4DB3F";
    context.fillRect(0, 0, 64, 32);

    context.fillStyle = "#383313";
    context.fillRect(10, 0, 20, 32);

    return new THREE.CanvasTexture(canvas);
}

function getTruckSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#E4DB3F";
    context.fillRect(0, 0, 128, 32);

    context.fillStyle = "#383313";
    context.fillRect(32, 5, 32, 10);
    // context.fillRect(58, 8, 60, 24);

    return new THREE.CanvasTexture(canvas);
}