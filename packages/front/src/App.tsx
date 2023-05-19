import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./App.css";
import { ListBooks } from "./ListBooks";
import { openApiSpec } from "./openApiSpec";

export const App = () => {
  return (
   <>
    <header className="app__header">
      <h1 className="app__title">Shared routes demo</h1>
      <p className="app__description">
        A show case of{" "}
        <a href="https://github.com/JeromeBu/shared-routes">
          the shared-routes library
        </a>
      </p>
    </header>
    <main className="app">
      
      <ListBooks />
      <section className="app__block">
        <SwaggerUI spec={openApiSpec} />
      </section>
      
    </main>
   </>
  );
};
