let scene, camera, renderer, cube;
let scrollY = 0;
let targetScrollY = 0;

function init() {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("scene-container").appendChild(renderer.domElement);

  // Create cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({ color: 0xff69b4 }); // Hot pink color
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 5;

  // Event listeners
  window.addEventListener("resize", onWindowResize, false);
  window.addEventListener("scroll", onScroll, false);

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
  targetScrollY = window.scrollY;
}

function animate() {
  requestAnimationFrame(animate);

  // Smooth scrolling effect
  scrollY += (targetScrollY - scrollY) * 0.1;

  // Animate cube based on scroll position
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollY / maxScroll;

  cube.rotation.x = scrollProgress * Math.PI * 2;
  cube.rotation.y += 0.01;
  cube.position.x = Math.sin(scrollProgress * Math.PI * 2) * 2;
  cube.position.y = Math.cos(scrollProgress * Math.PI * 2) * 2;

  renderer.render(scene, camera);
}

init();
