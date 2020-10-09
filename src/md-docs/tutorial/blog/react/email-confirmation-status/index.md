---
title: Email Confirmation Status
date: "2020-05-02"
order: 74
---

## What You Will Learn Regarding Aventum?

- To resend the confirmation email make a `POST` request to `http://localhost:3030/users/resendConfirmationEmail` and put the user's token into the request header as `x-access-token`.

---

This component will simply check if the user email address is confirmed or not and will allow the user to resend the confirmation email.

Inside the `components` folder create `EmailConfirmationStatus` folder and inside this one create `EmailConfirmationStatus.js` and `EmailConfirmationStatus.module.css` files.

Inside the `EmailConfirmationStatus.module.css` put:

```css title=src/components/EmailConfirmationStatus/EmailConfirmationStatus.module.css
.resendLink {
  text-decoration: underline;
  cursor: pointer;
  color: green;
}
```

Inside the `EmailConfirmationStatus.js` file first import the required modules:

```js title=src/components/EmailConfirmationStatus/EmailConfirmationStatus.js
import React, { useState } from "react"
import classes from "./EmailConfirmationStatus.module.css"
```

Next create our main `EmailConfirmationStatus` functtion:

```js highlight=4 title=src/components/EmailConfirmationStatus/EmailConfirmationStatus.js
import React, { useState } from "react"
import classes from "./EmailConfirmationStatus.module.css"

export default function EmailConfirmationStatus({ user }) {}
```

Inside the `EmailConfirmationStatus` we will have one state:

```js highlight=5 title=src/components/EmailConfirmationStatus/EmailConfirmationStatus.js
import React, { useState } from "react"
import classes from "./EmailConfirmationStatus.module.css"

export default function EmailConfirmationStatus({ user }) {
  const [sending, setSending] = useState(false)
}
```

Next define `resendConfirmationEmail` function:

```js highlight=7-24 title=src/components/EmailConfirmationStatus/EmailConfirmationStatus.js
import React, { useState } from "react"
import classes from "./EmailConfirmationStatus.module.css"

export default function EmailConfirmationStatus({ user }) {
  const [sending, setSending] = useState(false)

  async function resendConfirmationEmail(event) {
    event.preventDefault()
    setSending(true)
    const response = await fetch(
      "http://localhost:3030/users/resendConfirmationEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      }
    )

    if (response.status === 200) {
      setSending(false)
    }
  }
}
```

The `resendConfirmationEmail` function will set first the `sending` to `true` using `setSending(true)` then it will make a `POST` request to `http://localhost:3030/users/resendConfirmationEmail` and will put the user's token `x-access-token` in the request header, on the success we set the `sending` back to `false` using `setSending(false)`.

Now render our component:

```js highlight=26-42 numbers title=src/components/EmailConfirmationStatus/EmailConfirmationStatus.js
import React, { useState } from "react"
import classes from "./EmailConfirmationStatus.module.css"

export default function EmailConfirmationStatus({ user }) {
  const [sending, setSending] = useState(false)

  async function resendConfirmationEmail(event) {
    event.preventDefault()
    setSending(true)
    const response = await fetch(
      "http://localhost:3030/users/resendConfirmationEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      }
    )

    if (response.status === 200) {
      setSending(false)
    }
  }

  return (
    <div>
      {user && (
        <div>
          {user.emailConfirmation
            ? "Email address confirmed!"
            : "Please confirm your email address!"}
        </div>
      )}
      {user && !user.emailConfirmation && !sending && (
        <a className={classes.resendLink} onClick={resendConfirmationEmail}>
          Resend confirmation email?
        </a>
      )}
      {sending && <div>Sending...</div>}
    </div>
  )
}
```
