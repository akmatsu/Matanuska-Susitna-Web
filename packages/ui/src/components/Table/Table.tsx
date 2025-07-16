export function Table(props: { children: React.ReactNode }) {
  return <table className="w-full border-collapse">{props.children}</table>;
}
