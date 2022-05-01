import { handler } from "./function/handler.ts";

const cb = (err: any, res: any) => {
  if (err) {
    return console.error(err);
  }

  try {
    console.log(JSON.stringify(res, null, 2));
  } catch (error) {
    return console.error(error);
  }
};

const name = prompt("Please enter input");

const result = handler(name, cb);

try {
  if (result instanceof Promise) {
    result
      .then((data) => cb(undefined, data))
      .catch((err) => cb(err, undefined));
  }
} catch (e) {
  console.error(e.stack);
}
