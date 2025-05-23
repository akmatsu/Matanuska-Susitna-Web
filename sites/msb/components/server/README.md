# Server Components

These are components that do not have "use client" at the top of the file and they specifically use server side only features. Since they use server side only features if we include them in the same barrel file as client components it can cause issues with the bundler. Additionally, these components cannot be use inside of a client component. They can only be used in static components or other server components. Doing so will result in errors.
