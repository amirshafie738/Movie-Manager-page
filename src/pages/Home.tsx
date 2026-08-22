import { useState } from "react";
import FormPage from "../components/Form";
import Header from "../components/header";
import MovieList from "../components/MovieList";

function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <>
      <Header setIsFormOpen={setIsFormOpen} />
      <main className="flex gap-4 justify-center items-center">
        <MovieList setIsFormOpen={setIsFormOpen} />
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
