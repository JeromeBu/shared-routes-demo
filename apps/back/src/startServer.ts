import { createBookApp } from "./createBookApp";

const port = 4000;
createBookApp().listen(port, () => {
  console.log(`Server started, listening on port ${port}`);
});
