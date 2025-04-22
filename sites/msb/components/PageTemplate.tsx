import { Hero } from '@matsugov/ui';

export function PageTemplate() {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-12 gap-4">
        <div className="bg-base-lightest rounded-sm p-4 col-span-8 flex flex-col gap-4 ">
          <div className="prose">
            <h1>Page title</h1>
            <p>
              Culpa voluptate do ex esse velit ut ex et nulla ad elit mollit.
              Qui reprehenderit non aliqua ut enim anim dolor minim exercitation
              fugiat. Cillum elit ut occaecat enim aliquip. Qui ex labore sint
              aliquip nulla pariatur veniam nulla laborum consequat sunt sint.
              Consequat id ullamco adipisicing magna voluptate in fugiat nisi
              Lorem cupidatat quis.
            </p>
          </div>
          <div className="bg-base-lighter rounded-sm p-4">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
            </div>
          </div>
          <div className="bg-base-lighter rounded-sm p-4">
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
              <div className="rounded-sm bg-base-light rounded-sm p-4 col-span-6"></div>
            </div>
          </div>
        </div>
        <div className="bg-base-lightest rounded-sm p-4 col-span-4 flex flex-col gap-4">
          <div className="bg-base-lighter rounded-sm p-4" w-full>
            <h2 className="text-2xl font-bold mb-4">Contacts</h2>
            <ul className="flex flex-col gap-2">
              <li className="bg-base-light p-4 rounded-sm"></li>
              <li className="bg-base-light p-4 rounded-sm"></li>
              <li className="bg-base-light p-4 rounded-sm"></li>
              <li className="bg-base-light p-4 rounded-sm"></li>
            </ul>
          </div>
          <div className="bg-base-lighter rounded-sm p-4" w-full>
            <h2 className="text-2xl font-bold mb-4">Divisions</h2>
            <ul className="flex flex-col gap-2">
              <li className="bg-base-light p-4 rounded-sm"></li>
              <li className="bg-base-light p-4 rounded-sm"></li>
              <li className="bg-base-light p-4 rounded-sm"></li>
              <li className="bg-base-light p-4 rounded-sm"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
