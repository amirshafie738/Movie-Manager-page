import { useState } from "react";
import FormPage from "../components/Form";
import Header from "../components/header";
import MovieList from "../components/MovieList";

function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <Header setIsFormOpen={setIsFormOpen} search={search} setSearch={setSearch}/>
      <main className="flex gap-4 justify-center items-center">
        <MovieList setIsFormOpen={setIsFormOpen} search={search}/>
        {isFormOpen && (
          <div className="w-1/3">
            <FormPage setIsFormOpen={setIsFormOpen} />
          </div>
        )}
      </main>
    </>
  );
}
export default HomePage;
