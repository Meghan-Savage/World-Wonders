import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

import atmosphereVertexShader from "../shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../shaders/atmosphereFragment.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

import countries from "./countries.json";

const LandingPage = () => {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasContainerRef.current;
    const sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load("/globe.jpg"),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.rotation.y = -Math.PI / 2;
    scene.add(sphere);

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(5, 50, 50);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    // Group
    const group = new THREE.Group();
    scene.add(group);

    // Create box
    function createBox({ lat, lng, country, population, color }) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.8),
        new THREE.MeshBasicMaterial({
          color: color || "#5a24cc",
          opacity: 0.4,
          transparent: true,
        })
      );
      group.add(box);

      const latitude = (lat / 180) * Math.PI;
      const longitude = (lng / 180) * Math.PI;
      const radius = 5;

      const x = radius * Math.cos(latitude) * Math.sin(longitude);
      const y = radius * Math.sin(latitude);
      const z = radius * Math.cos(latitude) * Math.cos(longitude);

      box.position.x = x;
      box.position.y = y;
      box.position.z = z;

      box.lookAt(0, 0, 0);
      box.geometry.applyMatrix4(
        new THREE.Matrix4().makeTranslation(0, 0, -0.4)
      );

      // Tooltip
      const tooltipElement = document.createElement("div");
      tooltipElement.classList.add("tooltip");
      tooltipElement.textContent = `${country}, Population: ${population}`;
      document.body.appendChild(tooltipElement);

      // Events
      box.addEventListener("mouseenter", () => {
        gsap.to(box.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3 });
        gsap.to(tooltipElement, { opacity: 1, duration: 0.3 });
      });

      box.addEventListener("mouseleave", () => {
        gsap.to(box.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        gsap.to(tooltipElement, { opacity: 0, duration: 0.3 });
      });
    }

    // Add boxes for countries
    countries.forEach((countryData) => {
      const { lat, lng, country, population, color } = countryData;
      createBox({ lat, lng, country, population, color });
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      sizes.width = window.innerWidth / 2;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-row h-screen w-screen bg-orange-300">
      <div className="xl:w-1/2 flex flex-col justify-center px-8 pt-16 xl:pt-0 bg-blue-300">
        <div>
          <h1 className="text-black text-bold text-4xl mb-8 font-Crimson leading-none uppercase items-center mt-20">
            World Wonders
          </h1>
          <p className="text-black mb-8 font-Lato-400">
            World Wonders presents a delightful fusion of exquisite products and
            immersive cultural experiences, inviting you to embark on a
            captivating voyage into the very essence of each civilization.
          </p>

          <div>
            <a
              href=""
              className="text-white bg-blue-600 hover:text-black inline-block px-10 py-4 rounded-full text-xl font-Lato"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="h-screen xl:w-1/2 bg-red-300">
        <canvas ref={canvasContainerRef}></canvas>
      </div>
    </div>
  );
};

export default LandingPage;
