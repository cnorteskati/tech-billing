# Tech Billing Website

- Product: website with modern frontend.
- Objective: Present `Tech Billing`'s billing metrics and operational requirements.
- Qualities: Visually appealing, easy navigation, good and interactive UX. 

## Pages & Functionalities 

- [ ] Billing Dashboard Page (with interactive graphs):
  - [ ] Yearly  Revenue.
  - [x] Monthly  Revenue.
  - [x] Number of emitted bills.
  - [x] Monthly active users.

- [x] Company Requirements Page (with **box checking** functionality):
  - [x] Mandatory reports (taxes, audits, ...).
  - [x] Necessary documentation for billing processing. 
  - [x] Important deadlines tracking.
  - [ ] Preview a client invoice

## Requirements & Constraints

- [ ] Responsive website (Desktop, Tablet, Mobile).
- [x] Modular React (Component separation).
- [x] Use NextJS
- [x] \[Optional\] Use Tailwind
- [ ] Use Hooks and ContextAPI (for global state).
- [x] Generate Mockup data for the company (simple JSON file or served from mock backend).
- [x] Appealing UI/UX (MUI, ...).
- [x] Good file structure.
- [x] Clean, well documented, and well named code.


## Notes & Extras

- [x] The website should be focused on internal company users.
- [x] Create a Logo for the company and use in website.
- [x] Implement Dark/Light mode.
- [ ] Provide good **SEO metadata** for the **pages** and **website**.
- [ ] Optimize the balance between SSR and client side, to mantain good
 user interactivity, SEO, and caching/speed (focus on what data changes regularly, ...).
- [ ] Add sound to some interactions.
- [x] \[Optional\] Have some micro interactions, to keep the website engaging.
- [ ] \[Optional\] Have graph data be dynamic, and have **WebHooks** to
 notify/update it on the user side.

## How to run

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
