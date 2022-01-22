import { ActionFunction, Form, useActionData } from "remix";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");

  const API_KEY = "...";
  const FORM_ID = "...";
  const API = "https://api.convertkit.com/v3";

  const res = await fetch(`${API}/forms/${FORM_ID}/subscribe`, {
    method: "post",
    body: JSON.stringify({ email, api_key: API_KEY }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return res.json();
};

export default function Newsletter() {
  let actionData = useActionData();
  let state: "succsess" | "idel" | "error" = actionData?.subscription
    ? "succsess"
    : actionData?.error
    ? "error"
    : "idel";

  return (
    <main>
      <Form method="post" aria-hidden={state === "succsess"}>
        <h2>Subscribe!!</h2>
        <p>Don`t miss any action!</p>
        <fieldset>
          <input type="email" placeholder="you@example.com" />
          <button type="submit"></button>
        </fieldset>

        <p>{actionData?.error ? actionData.message : <>&nbsp;</>}</p>
      </Form>

      <div aria-hidden={state !== "succsess"}>
        <h2>Your subscribed!!</h2>
        <p>Please check your email!!</p>
      </div>
    </main>
  );
}
