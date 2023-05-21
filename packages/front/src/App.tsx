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
          .
          <br />
          Below you have a show case of a route to add books, with the form, of
          a listing of the books and of the OpenAPI documentation.
          <br />
          All is generated relying on bookRoutes definition.
          <br />
          Any changes from the file `packages/routes/bookRoutes.ts`. Will
          immediately be reflected in the 3 sections.
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
