import EventList from "@/components/Landing/EventList";
import Header from "@/components/Landing/Header";

export default function Home({searchParams: {query}}) {
  return (
    <section className="container">
      <Header />
      <EventList query={query} />
    </section>
  );
}
