import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./App.css";
import { ListBooks } from "./ListBooks";
import { openApiSpec } from "./openApiSpec";

export const App = () => {
  return (
    <>
      <h1>Shared routes demo</h1>
      <p>
        A show case of{" "}
        <a href="https://github.com/JeromeBu/shared-routes">
          the shared-routes library
        </a>
      </p>
      <div>
        <ListBooks />
        <SwaggerUI spec={openApiSpec} />
      </div>
    </>
  );
};
