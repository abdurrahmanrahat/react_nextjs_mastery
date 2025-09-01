import { toast } from "sonner";

export default function Home() {
  const handleSubmit = () => {
    toast.success("su")
  }
  return (
    <div>
      <button onClick={handleSubmit}>Test</button>
    </div>
  );
}
