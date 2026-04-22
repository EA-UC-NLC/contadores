import { cookies } from 'next/headers';
import dynamic from "next/dynamic";
const FormGenerator = dynamic(() => import("./FormGenerator"), { ssr: false });

export default function Page() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: 700, margin: '0 auto' }}>
      <h1>Contador Regresivo</h1>
      <FormGenerator />
    </div>
  );
}
