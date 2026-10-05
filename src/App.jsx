import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </main>
    </>
  );
}

export default App;
