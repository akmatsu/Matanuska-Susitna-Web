export function PageHeader(props: { title: string; description: string }) {
  return (
    <div className="mb-4 sm:mb-6">
      <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
        {props.title}
      </h1>
      <p className="mt-1 text-sm text-gray-600">{props.description}</p>
    </div>
  );
}
