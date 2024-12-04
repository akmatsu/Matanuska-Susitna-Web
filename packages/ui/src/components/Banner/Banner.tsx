'use client';
import clsx from 'clsx';
import { useState } from 'react';

export function Banner({
  label = 'An official website of the United States government',
  showFlag = true,
}: {
  label?: string;
  showFlag?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="space-y-8">
      <section
        className="@container bg-gray-5 group"
        aria-label="Official website of the United States government"
      >
        <header className="flex text-xs gap-2 @tablet:items-center pl-4 pr-12 @tablet:pr-4 @tablet:px-8 py-2 @tablet:py-1 mx-auto max-w-5xl min-h-12 @tablet:min-h-0 leading-tight @tablet:leading-none relative">
          <div className="hidden group-[[data-open]]:flex @tablet:group-[[data-open]]:hidden items-center justify-center absolute right-0 inset-y-0 bg-gray-10 size-12">
            <span className="icon-[material-symbols--close] text-blue-60v size-6"></span>
          </div>
          {showFlag && (
            <div className="pt-0.5 @tablet:pt-0 shrink-0 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 64 64"
              >
                <path
                  fill="#DB3E1F"
                  d="M32 10h32v4H32zM32 18h32v4H32zM32 26h32v4H32zM32 34h32v4H32zM0 42h64v4H0zM0 50h64v4H0z"
                />
                <path
                  fill="#fff"
                  d="M32 14h32v4H32zM32 22h32v4H32zM32 30h32v4H32z"
                />
                <path
                  fill="#fff"
                  d="M32 30h32v4H32zM0 46h64v4H0zM0 38h64v4H0z"
                />
                <path fill="#fff" d="M0 38h64v4H0z" />
                <path fill="#1D33B1" d="M0 10h32v28H0z" />
                <path
                  fill="#fff"
                  d="M4 14h4v4H4zM8 22h4v4H8zM4 30h4v4H4zM12 14h4v4h-4zM16 22h4v4h-4zM12 30h4v4h-4zM20 14h4v4h-4zM24 22h4v4h-4zM20 30h4v4h-4z"
                />
              </svg>
            </div>
          )}
          <div className="@tablet:flex gap-2 items-center">
            <div>
              <p>{label}</p>
            </div>
            <button
              type="button"
              id="banner-button"
              aria-expanded={expanded}
              aria-controls="banner"
              className="text-blue-60v group-[[data-open]]:block focus:outline-none @tablet:focus:outline @tablet:focus:outline-4 @tablet:focus:outline-blue-40v cursor-pointer group after:absolute @tablet:after:relative after:inset-0 @tablet:inset-auto focus:after:outline @tablet:focus:after:outline-none focus:after:outline-4 focus:after:outline-blue-40v "
              onClick={() => setExpanded((val) => !val)}
            >
              <div className="inline-flex items-center underline group-[[data-open]]:hidden @tablet:group-[[data-open]]:inline-flex">
                <span>Here&#8217;s how you know</span>
                <span className="icon-[material-symbols--expand-more] size-4 align-middle group-aria-expanded:rotate-180"></span>
              </div>
            </button>
          </div>
        </header>
        <div
          id="banner"
          aria-labelledby="banner-button"
          role="region"
          hidden={!expanded}
          className={clsx(
            '[&[hidden]]:p-0 py-6 px-6 tablet:grid-cols-2 gap-6 mx-auto max-w-5xl',
            {
              grid: expanded,
            },
          )}
        >
          <div className="flex gap-2">
            <div
              aria-hidden="true"
              className="rounded-full border border-blue-50 text-blue-50 size-10 shrink-0 justify-center items-center flex"
            >
              <span className="icon-[material-symbols--account-balance] size-5 align-middle"></span>
            </div>
            <div>
              <p>
                <span className="font-bold">Official websites use .gov</span>
              </p>
              <p>
                A<span className="font-bold">.gov</span>
                website belongs to an official government organization in the
                United States.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div
              aria-hidden="true"
              className="rounded-full border border-green-40v text-green-40v size-10 shrink-0 justify-center items-center flex"
            >
              <span className="icon-[material-symbols--lock] size-5 align-middle"></span>
            </div>
            <div>
              <p>
                <span className="font-bold">
                  Secure .gov websites use HTTPS
                </span>
              </p>
              <p>
                A<span className="font-bold">lock</span>(
                <span className="icon-[material-symbols--lock] size-4 align-middle"></span>
                ) or
                <span className="font-bold">https://</span>
                means you've safely connected to the .gov website. Share
                sensitive information only on official, secure websites.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
