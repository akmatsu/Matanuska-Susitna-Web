export function Links() {
  return (
    <div className="d-flex flex-col">
      <p>
        This is an <a>internal link</a> and it's going places
      </p>

      <p>
        This is an{' '}
        <a href="#" className="external">
          external link
        </a>{' '}
        and it's going places
      </p>
    </div>
  );
}
