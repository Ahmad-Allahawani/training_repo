Next.js Project
This is a Next.js project bootstrapped with create-next-app.

Getting Started
First, run the development server:

bash
Copy
Edit
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Open http://localhost:3000 with your browser to see the frontend result.
You can start editing the page by modifying app/page.js. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

use node index.js to run the backend server and access the admin page.

Open http://localhost:4000 with your browser to see the backend result.

the link to the admin page https://training-repo.onrender.com .

the admin email : admin@gmail.com and password : 1234.

latest update with commit name () :

fixed the login route to deny any access to the dashboard through the url
without entering the correct email and password.

fixed some design issues with the main page , [id] page , and the dashboard page.

some adjustment to the index.js file to handle the new changes, by adding
express-session to prevent access to dashboard by unauthorized users,

express-flash to render the login page with alert if the email or passsword are wrong.

some adjustment to the .env file.

