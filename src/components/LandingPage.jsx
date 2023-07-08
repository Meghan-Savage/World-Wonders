import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { Link } from "react-router-dom";
import atmosphereVertexShader from "../shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../shaders/atmosphereFragment.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

import countries from "./countries.json";
import "../index.css";

const LandingPage = () => {
  const canvasContainerRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({
    country: "",
    population: "",
  });
  const [tooltipPositionX, setTooltipPositionX] = useState(0);
  const [tooltipPositionY, setTooltipPositionY] = useState(0);

  useEffect(() => {
    const raycaster = new THREE.Raycaster();

    const canvas = canvasContainerRef.current;
    const sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
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
    atmosphere.scale.set(0.1, 0.1, 0.1);

    scene.add(atmosphere);

    // Group
    const group = new THREE.Group();
    group.add(sphere);
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
      group.add(box);
      gsap.to(box.scale, {
        z: 1.4,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "linear",

        delay: Math.random(),
      });
      box.country = country;
      box.population = population;
    }

    function createBoxes(countries) {
      countries.forEach((country) => {
        const scale = country.population / 1000000000;
        const lat = country.latlng[0];
        const lng = country.latlng[1];
        const zScale = 0.8 * scale;
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(
            Math.max(0.1, 0.1 * scale),
            Math.max(0.1, 0.1 * scale),

            Math.max(zScale, 0.4 * Math.random())
          ),
          new THREE.MeshBasicMaterial({
            color: "#3BF7FF",
            opacity: 0.4,
            transparent: true,
          })
        );

        //canada 56.1304° N, negative 106.3468° W
        //africa mid point sudan 12.8628, 30.2176

        //india 20.5937° N, 78.9629° E
        //japan 36.2048° N, 138.2529° E

        //southern hemisphere is always negative
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
          new THREE.Matrix4().makeTranslation(0, 0, -zScale / 2)
        );

        group.add(box);

        gsap.to(box.scale, {
          z: 1.4,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "linear",
          delay: Math.random(),
        });
        box.country = country.name;
        box.population = new Intl.NumberFormat().format(country.population);
      });
    }

    createBoxes(countries);

    createBox({
      lat: 56.1304,
      lng: -106.3468,
      country: "Canada",
      population: "39566248",
      color: "#8512ed",
    });
    createBox({
      lat: 0.0236,
      lng: 37.9062,
      country: "Kenya",
      population: "53455245",
      color: "#8512ed",
    });

    createBox({
      lat: 36.2048,
      lng: 138.2529,
      country: "Japan",
      population: "125361589",
      color: "#8512ed",
    });
    sphere.rotation.y = -Math.PI / 2;
    group.rotation.offset = {
      x: 0,
      y: 0,
    };

    const mouse = {
      x: undefined,
      y: undefined,
      down: false,
      xPrev: undefined,
      yPrev: undefined,
    };

    const handleMouseMove = (event) => {
      const canvasBounds = canvas.getBoundingClientRect();

      const mouse = {
        x: ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
        y: -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1,
      };

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        group.children.filter((mesh) => {
          return mesh.geometry.type === "BoxGeometry";
        })
      );

      if (intersects.length > 0) {
        const intersectedBox = intersects[0].object;

        const tooltipX = event.clientX - canvasBounds.left;
        const tooltipY = event.clientY - canvasBounds.top;

        const offsetX = tooltipX + 10 > canvasBounds.width / 2 ? -80 : 0;
        const offsetY = tooltipY + 10 > canvasBounds.height / 2 ? -30 : 0;

        const adjustedTooltipX = tooltipX + offsetX + canvasBounds.left;
        const adjustedTooltipY = tooltipY + offsetY + canvasBounds.top;

        setTooltipVisible(true);
        setTooltipContent({
          country: intersectedBox.country,
          population: intersectedBox.population,
        });

        setTooltipPositionX(adjustedTooltipX);
        setTooltipPositionY(adjustedTooltipY);
      } else {
        setTooltipVisible(false);
      }
    };

    const handleMouseDown = (event) => {
      onClick = (event) => {
        event.preventDefault();
      };

      mouse.down = true;
      mouse.xPrev = mouse.x;
      mouse.yPrev = mouse.y;
    };

    const handleMouseUp = (event) => {
      mouse.down = false;
      group.rotation.offset.x += mouse.y - mouse.yPrev;
      group.rotation.offset.y += mouse.x - mouse.xPrev;
      mouse.xPrev = mouse.x;
      mouse.yPrev = mouse.y;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      renderer.render(scene, camera);
      scene.rotation.y += 0.0008;

      const intersects = raycaster.intersectObjects(
        group.children.filter((mesh) => {
          return mesh.geometry.type === "BoxGeometry";
        })
      );

      group.children.forEach((mesh) => {
        mesh.material.opacity = 0.4;
      });

      intersects.forEach((intersect) => {
        intersect.object.material.opacity = 1;
      });

      if (mouse.down) {
        const deltaX = mouse.x - mouse.xPrev;
        const deltaY = mouse.y - mouse.yPrev;

        group.rotation.offset.x += deltaY * 0.005;
        group.rotation.offset.y += deltaX * 0.005;

        gsap.to(group.rotation, {
          y: group.rotation.offset.y,
          x: group.rotation.offset.x,
          duration: 2,
        });

        mouse.xPrev = mouse.x;
        mouse.yPrev = mouse.y;
      }

      //controls.update();

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      sizes.width = window.innerWidth / 2;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);

      const canvasBounds = canvas.getBoundingClientRect();

      let tooltipX = tooltipPositionX;
      let tooltipY = tooltipPositionY;

      if (sizes.width !== 0 && sizes.height !== 0) {
        tooltipX = (tooltipX * sizes.width) / canvasBounds.width;
        tooltipY = (tooltipY * sizes.height) / canvasBounds.height;
      }

      setTooltipPositionX(tooltipX);
      setTooltipPositionY(tooltipY);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-row h-screen bg-gradient-to-r from-orange-400 to-orange-100">
      <div className="flex mb-32">
        <div className="flex flex-col justify-center px-8 pt-16 xl:pt-0 w-1/2 p-4">
          <div className="flex flex-col  items-center">
            <h1 className="text-black text-bold text-6xl mb-8 font-Crimson leading-none uppercase items-center mt-70">
              World Wonders
            </h1>
            <p className="text-black mb-8 font-Lato-400 w-1/2">
              World Wonders presents a delightful fusion of exquisite products
              and immersive cultural experiences, inviting you to embark on a
              captivating voyage into the very essence of each civilization.
            </p>
            <div>
              <Link to="/products">
                <button className="bg-black text-white px-8 py-4 rounded-full uppercase font-Lato-400">
                  Explore
                </button>
              </Link>
              <Link to="/signIn">
                <button className="bg-black text-white px-8 py-4 rounded-full uppercase font-Lato-400 ml-4">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-full w-1/2">
          <canvas className="h-full w-full" ref={canvasContainerRef}></canvas>
          {tooltipVisible && (
            <Link to={`/products/${tooltipContent.country}`}>
              <div
                className="flex justify-center items-center h-14 text-white bg-black px-4 py-2 rounded bg-opacity-50"
                style={{
                  position: "absolute",
                  left: `${tooltipPositionX - 10}px`,
                  top: `${tooltipPositionY - 20}px`,
                }}
              >
                <span className="text-center">
                  {tooltipContent.country}, Population:{" "}
                  {tooltipContent.population}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
