import { useState } from "react";
import FormPage from "../components/Form";
import Header from "../components/Header";
import MovieList from "../components/MovieList";

function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Header setIsFormOpen={setIsFormOpen} />
      <main className="flex gap-4 justify-center items-center">
        <MovieList />
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
