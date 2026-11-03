import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 768;

    // Scene, Camera, Renderer (Optimized for mobile power & GPU fill-rate)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0A0A, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, 
      alpha: true, 
      powerPreference: isMobile ? 'low-power' : 'high-performance',
      precision: isMobile ? 'mediump' : 'highp'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3D Objects: Central kinetic tech lattice (Torus Knot)
    // Reduce geometry subdivision by 75% on mobile to eliminate CPU/GPU thread stalls
    const geometry = new THREE.TorusKnotGeometry(
      1.6, 
      0.45, 
      isMobile ? 64 : 128, 
      isMobile ? 16 : 32, 
      2, 
      3
    );
    
    // Wireframe material with subtle glowing lines
    const material = new THREE.MeshStandardMaterial({
      color: 0x222222,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x111111,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inner glowing core
    const coreGeometry = new THREE.IcosahedronGeometry(0.9, isMobile ? 1 : 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xCBB89A,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
      emissive: 0x332818,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Ambient floating particles
    const particleCount = isMobile ? 80 : 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xCBB89A,
      size: isMobile ? 0.045 : 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightBeige = new THREE.PointLight(0xCBB89A, 4, 15);
    pointLightBeige.position.set(3, 3, 4);
    scene.add(pointLightBeige);

    const pointLightSilver = new THREE.PointLight(0xffffff, 3, 15);
    pointLightSilver.position.set(-3, -2, 3);
    scene.add(pointLightSilver);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop with Visibility & Intersection Observer Optimization (Core Web Vitals)
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mesh.rotation.x += 0.25 * delta;
      mesh.rotation.y += 0.35 * delta;
      mesh.rotation.x += mouseY * 0.02;
      mesh.rotation.y += mouseX * 0.02;

      coreMesh.rotation.x -= 0.4 * delta;
      coreMesh.rotation.y -= 0.5 * delta;

      particles.rotation.y += 0.05 * delta;

      camera.position.x = mouseX * 0.8;
      camera.position.y = -mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          clock.start();
          animate();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center opacity-30">
        <div className="w-64 h-64 rounded-full border border-brand-beige/40 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 pointer-events-none opacity-80 mix-blend-screen"
      aria-hidden="true"
    />
  );
};
