import { Component, Input, OnInit, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-head-view',
  templateUrl: './head-view.component.html',
})

export class HeadViewComponent implements OnInit, OnChanges, OnDestroy {
    @Input() xyz!: XYZ;
  
    modelLoaded = false;
  
    private destroy = new Subject<void>();
    private scene!: THREE.Scene;
    private camera!: THREE.Camera;
    private renderer!: THREE.WebGLRenderer;
    private headModel!: THREE.Mesh;
  
    constructor(private element: ElementRef) {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20000);
      this.camera.position.set(0, 0, 20);
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);
  
      const directional = new THREE.DirectionalLight(0xffffff, 0.6);
      directional.position.set(6, 3, 9);
      this.scene.add(directional);
  
      const ambient = new THREE.AmbientLight(0x4c4c4c, 1);
      this.scene.add(ambient);
  
      // const loader = new (THREE as any).GLTF2Loader();
      const loader = new GLTFLoader();
      loader.load('./assets/3D/head.glb', (collada: any) => {
        this.headModel = collada.scene;
        this.headModel.scale.set(13, 13, 13);
        this.scene.add(this.headModel);
        this.modelLoaded = true;
      });
  
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(170, 170);
    }
  
    ngOnInit(): void {
      this.element.nativeElement.appendChild(this.renderer.domElement);
      this.animate();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['xyz'] && this.xyz) {
        const gVector = new THREE.Vector3(this.xyz.y, -this.xyz.x, this.xyz.z);
        gVector.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

        const yAxis = new THREE.Vector3(0, 1, 0);
        this.headModel.quaternion.setFromUnitVectors(yAxis, gVector.clone().normalize());
      }
    }
  
    ngOnDestroy(): void {
      this.destroy.next();
    }
  
    animate() {
      requestAnimationFrame(() => this.animate());
      this.renderer.render(this.scene, this.camera);
    }
  }