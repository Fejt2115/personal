import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useControls } from 'leva'
import { JSX } from "react";

// n - złożoność - liczba całkowita nieujemna
// x, y, z - współrzędne środka sześcianu
// d - długość krawędzi
function Szescian(x: number, y: number, z: number, d: number) {
    return <mesh position={[x, y, z]} key={String(x)+   String(y) + String(z)}>
        <boxGeometry args={[d, d, d]} />
        <meshStandardMaterial color="white" />
        <Edges lineWidth={2} color="black" />
    </mesh>
}

function menger(n: number, x: number, y: number, z: number, d: number) {
  if (n == 0){
    return Szescian(x, y, z, d);
  }
  else{
    const cubes: JSX.Element[] = [];
    [-1, 0, 1].forEach(i => {
      [-1, 0, 1].forEach(j => {
        [-1, 0, 1].forEach(k => {
          if ((i*i+j*j)*(i*i+k*k)*(j*j+k*k) > 0){
            cubes.push(menger(n-1, x+i*d/3, y+j*d/3, z+k*d/3, d/3));
          }
        });
      });
    });
    return <>{cubes}</>;
  }
}

export default function MengersCube() {
    const { size, depth } = useControls({ size: 5, depth: 1})
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />

        {menger(depth, 0, 0, 0, size)}

      <OrbitControls />
    </Canvas>
  );
}