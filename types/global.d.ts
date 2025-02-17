import 'react';
import { ThreeElements } from '@react-three/fiber';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            mesh: ThreeElements['mesh'];
            boxGeometry: ThreeElements['boxGeometry'];
            meshStandardMaterial: ThreeElements['meshStandardMaterial'];
            ambientLight: ThreeElements['ambientLight'];
            pointLight: ThreeElements['pointLight'];
        }
    }
}