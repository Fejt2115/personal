import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from 'leva'

// n - złożoność - liczba całkowita nieujemna
// x, y, z - współrzędne środka sześcianu
// d - długość krawędzi
function Szescian(x: number, y: number, z: number, d: number) {
    return <mesh position={[x, y, z]}>
        <boxGeometry args={[d, d, d]} />
        <meshStandardMaterial color="white" />
    </mesh>
}

function menger(n: number, x: number, y: number, z: number, d: number) {
  if (n == 0){
    return Szescian(x, y, z, d);
  }else{
    [-1, 0, 1].map(i => {
      [-1, 0, 1].map(j => {
        [-1, 0, 1].map(k => {
          if ((i*i+j*j)*(i*i+k*k)+(j*j+k*k) > 0){
            return menger(n-1, x+i*d/3, y+j*d/3, z+k*d/3, d/3);
          }
        });
      });
    });
  }
}

export default function MengersCube() {
    const { size, depth } = useControls({ size: 5, depth: 3})
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />

        {menger(depth, 0, 0, 0, size)}

      <OrbitControls />
    </Canvas>
  );
}