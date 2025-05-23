# Static Components

These are components that do not have "use client" at the top of the file and they do not use any server only features. Meaning they can be used in both client and server components. Additionally, they can import both client and server components. We keep them separate from client and server components, since those components use either client only or server only features and if we mix them in the same barrel file it can cause issues with the bundler.
