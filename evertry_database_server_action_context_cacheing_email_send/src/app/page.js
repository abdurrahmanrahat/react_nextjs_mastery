import EventList from "@/components/Landing/EventList";
import Header from "@/components/Landing/Header";
import Loading from "@/components/Ui/Loading";
import { Suspense } from "react";

export default function Home({ searchParams: { query } }) {
  return (
    <section className="container">
      <Header />

      <Suspense key={query} fallback={<Loading text="Events" />}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
