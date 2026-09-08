import * as THREE from "three";

export type ReflectiveScene = {
  setTarget: (pointerX: number, pointerY: number, scroll: number) => void;
  render: (delta: number) => boolean;
  resize: () => void;
  dispose: () => void;
};

/** A continuous curved capsule with elliptical depth and seamless rounded ends. */
function createMonogramGeometry() {
  const majorRadius = 1.12;
  const tubeRadius = 0.35;
  const depth = 0.46;
  const start = 0.7;
  const end = Math.PI * 2 - start;
  const segments = 144;
  const sides = 48;
  const capSegments = 12;
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  const addRing = (angle: number, capAngle: number, direction: number) => {
    const radialX = Math.cos(angle);
    const radialY = Math.sin(angle);
    const tangentX = -radialY;
    const tangentY = radialX;
    const capRadius = Math.cos(capAngle);
    const extension = Math.sin(capAngle) * direction;
    for (let side = 0; side <= sides; side++) {
      const phi = (side / sides) * Math.PI * 2;
      const radial = Math.cos(phi) * capRadius;
      const vertical = Math.sin(phi) * capRadius;
      positions.push(
        radialX * (majorRadius + tubeRadius * radial) +
          tangentX * tubeRadius * extension,
        radialY * (majorRadius + tubeRadius * radial) +
          tangentY * tubeRadius * extension,
        depth * vertical,
      );
      const normal = new THREE.Vector3(
        (radialX * radial + tangentX * extension) / tubeRadius,
        (radialY * radial + tangentY * extension) / tubeRadius,
        vertical / depth,
      ).normalize();
      normals.push(normal.x, normal.y, normal.z);
    }
  };

  for (let cap = capSegments; cap > 0; cap--) {
    addRing(start, (cap / capSegments) * Math.PI * 0.5, -1);
  }
  for (let segment = 0; segment <= segments; segment++) {
    addRing(start + (segment / segments) * (end - start), 0, 0);
  }
  for (let cap = 1; cap <= capSegments; cap++) {
    addRing(end, (cap / capSegments) * Math.PI * 0.5, 1);
  }

  const rings = positions.length / ((sides + 1) * 3);
  for (let ring = 0; ring < rings - 1; ring++) {
    for (let side = 0; side < sides; side++) {
      const a = ring * (sides + 1) + side;
      const b = a + sides + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

export function createReflectiveScene(
  host: HTMLElement,
  onContextLost: () => void,
): ReflectiveScene {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0xf7f7f2, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -2.05,
    2.05,
    2.05,
    -2.05,
    0.1,
    30,
  );
  camera.position.set(0, 0, 7);

  // A tiny procedural photography studio provides real reflections without HDR downloads.
  const environment = new THREE.Scene();
  environment.background = new THREE.Color(0x6b7279);
  const panelGeometry = new THREE.PlaneGeometry(1, 1);
  const panels: THREE.MeshBasicMaterial[] = [];
  const panel = (
    color: number,
    intensity: number,
    width: number,
    height: number,
    x: number,
    y: number,
    z: number,
  ) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    panels.push(material);
    const mesh = new THREE.Mesh(panelGeometry, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(width, height, 1);
    mesh.lookAt(0, 0, 0);
    environment.add(mesh);
  };
  panel(0xffffff, 4.5, 3.5, 7, -4, 2, 3);
  panel(0xfffdf5, 3.5, 6, 3, 1, 5, 1);
  panel(0xffffff, 2.2, 1.2, 6, 4, 0, 4);
  panel(0x242831, 1, 1.8, 7, 0.5, 0, 5);
  panel(0xe2e8ee, 1.2, 5, 5, 0, 0, -5);
  panel(0x69313e, 1.65, 3, 4, -5, -1.8, -1);
  panel(0xdcf59b, 1.6, 5, 2.3, 1, -4, 2);

  const generator = new THREE.PMREMGenerator(renderer);
  const environmentTarget = generator.fromScene(environment, 0.055, 0.1, 30, {
    size: 128,
  });
  scene.environment = environmentTarget.texture;
  generator.dispose();
  panelGeometry.dispose();
  panels.forEach((material) => material.dispose());
  environment.clear();

  const geometry = createMonogramGeometry();
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xe8edef,
    metalness: 1,
    roughness: 0.155,
    envMapIntensity: 1.1,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
    iridescence: 0.32,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [180, 380],
  });
  const mark = new THREE.Mesh(geometry, material);
  mark.rotation.set(0.2, -0.4, -0.13);
  mark.position.set(0.07, 0.06, 0);
  scene.add(mark);

  const key = new THREE.DirectionalLight(0xfffaf0, 2);
  key.position.set(-3, 4, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe8eefc, 0.5);
  fill.position.set(5, -1, 3);
  scene.add(fill);

  let targetX = 0.2;
  let targetY = -0.4;
  let targetZ = -0.13;
  let targetHeight = 0.06;
  let disposed = false;

  const resize = () => {
    if (disposed) return;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    const aspect = width / height;
    const halfHeight = aspect < 1 ? 2.05 / aspect : 2.05;
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const contextLost = (event: Event) => {
    event.preventDefault();
    onContextLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  host.appendChild(renderer.domElement);
  resize();

  return {
    setTarget(pointerX, pointerY, scroll) {
      targetX = 0.2 + pointerY * 0.18 + scroll * 0.12;
      targetY = -0.4 + pointerX * 0.35;
      targetZ = -0.13 + pointerX * 0.055 + scroll * 0.035;
      targetHeight = 0.06 + scroll * 0.12;
    },
    render(delta) {
      if (disposed) return false;
      const blend = 1 - Math.exp(-7 * delta);
      mark.rotation.x += (targetX - mark.rotation.x) * blend;
      mark.rotation.y += (targetY - mark.rotation.y) * blend;
      mark.rotation.z += (targetZ - mark.rotation.z) * blend;
      mark.position.y += (targetHeight - mark.position.y) * blend;
      renderer.render(scene, camera);
      return (
        Math.max(
          Math.abs(targetX - mark.rotation.x),
          Math.abs(targetY - mark.rotation.y),
          Math.abs(targetZ - mark.rotation.z),
          Math.abs(targetHeight - mark.position.y),
        ) > 0.0005
      );
    },
    resize,
    dispose() {
      if (disposed) return;
      disposed = true;
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      geometry.dispose();
      material.dispose();
      environmentTarget.dispose();
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
