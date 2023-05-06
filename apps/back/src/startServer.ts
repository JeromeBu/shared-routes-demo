import { createBookApi } from "./createBookApi";

const port = 4000;
createBookApi().listen(
  port,
  () => {
    console.log(`Server started, listening on port ${port}`);
  },
  (error: any) => {
    console.error(error, `Server start failed`);
    process.exit(1);
  }
);
