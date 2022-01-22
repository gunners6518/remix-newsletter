import { Form } from "remix";

export default function Newsletter() {
  return (
    <main>
      <Form method="post">
        <h2>Subscribe!!</h2>
        <p>Don`t miss any action!</p>
        <input type="email" placeholder="you@example.com" />
        <button type="submit"></button>
      </Form>
    </main>
  );
}
