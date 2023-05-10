import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./App.css";
import { ListBooks } from "./ListBooks";
import { openApiSpec } from "./openApiSpec";

export const App = () => {
  return (
    <>
      <h1>Shared routes demo</h1>
      <div className="books">
        <ListBooks />
        <div className="docs">
          <SwaggerUI spec={openApiSpec} />
        </div>
      </div>
    </>
  );
};
