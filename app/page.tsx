import dynamic from "next/dynamic";
const FormGenerator = dynamic(() => import("./FormGenerator"), { ssr: false });

export default function Page() {
  return <FormGenerator />;
}
