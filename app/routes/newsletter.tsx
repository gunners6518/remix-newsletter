import { ActionFunction, Form, useActionData, useTransition } from "remix";

export let action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 2000));
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
  let transition = useTransition();
  let state: "succsess" | "idel" | "error" | "submitting" = transition
    ? "submitting"
    : actionData?.subscription
    ? "succsess"
    : actionData?.error
    ? "error"
    : "idel";

  return (
    <main>
      <Form method="post" aria-hidden={state === "succsess"}>
        <h2>Subscribe!!</h2>
        <p>Don`t miss any action!</p>
        {/* submit中はdisabledにする */}
        <fieldset disabled={state === "submitting"}>
          <input type="email" placeholder="you@example.com" />
          <button type="submit">
            {/* 文言もstateに応じて変える */}
            {state === "submitting" ? "submitting" : "subscribe"}
          </button>
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
