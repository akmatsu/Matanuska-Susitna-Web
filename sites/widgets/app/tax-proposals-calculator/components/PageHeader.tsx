import Image from 'next/image';

export function PageHeader(props: { title: string; description: string }) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2">
        <div className="relative size-10 lg:size-14">
          <Image
            src="https://images.matsu.gov/logo.png"
            alt="Matanuska-Susitna Borough Seal"
            fill
          />
        </div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          {props.title}
        </h1>
      </div>
      <p className="mt-1 text-sm text-gray-600">{props.description}</p>
    </div>
  );
}
