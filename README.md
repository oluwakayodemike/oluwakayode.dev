# mko.

This is the source for my personal website and blog.

# Stack

- TanStack Start (React 19, TypeScript)
- TailwindCSS
- react-markdown (for the blog posts)
- Satori and Resvg (for the share cards)

## Can I fork this to reuse your design?

Go ahead, that is partly why the source is public. One condition: strip out everything that is me before you ship it. That means [the writing and projects](./src/data/portfolio.ts), the [avatar illustrations](./public/media), the [favicon](./public), and my social links. The layout and the ideas are yours to learn from, the identity is not.

Questions? Find me on X as trulymko or on GitHub as oluwakayodemike.

## Running it

```sh
bun install
bun run dev
```

The long version, with commands, content editing, media, tests, and troubleshooting, lives in [docs/guide.md](./docs/guide.md).
