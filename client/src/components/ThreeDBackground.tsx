import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } as THREE.WebGLRendererParameters);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Create floating spheres with bright, translucent material
    const spheres: THREE.Mesh[] = [];
    const colors = [0x10b981, 0x6ee7b7, 0xd1fae5];
    
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.5,
        wireframe: false,
        transparent: true,
        opacity: 0.15,
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = (Math.random() - 0.5) * 8;
      sphere.position.y = (Math.random() - 0.5) * 8;
      sphere.position.z = (Math.random() - 5) * 5;
      
      sphere.userData.velocityX = (Math.random() - 0.5) * 0.01;
      sphere.userData.velocityY = (Math.random() - 0.5) * 0.01;
      sphere.userData.velocityZ = (Math.random() - 0.5) * 0.01;
      
      scene.add(sphere);
      spheres.push(sphere);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x10b981, 0.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x6ee7b7, 0.3);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      spheres.forEach(sphere => {
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;
        
        sphere.position.x += sphere.userData.velocityX;
        sphere.position.y += sphere.userData.velocityY;
        sphere.position.z += sphere.userData.velocityZ;

        // Boundary conditions
        if (sphere.position.x > 5) sphere.userData.velocityX *= -1;
        if (sphere.position.x < -5) sphere.userData.velocityX *= -1;
        if (sphere.position.y > 5) sphere.userData.velocityY *= -1;
        if (sphere.position.y < -5) sphere.userData.velocityY *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
