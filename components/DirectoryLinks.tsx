export default function DirectoryLinks({ items }: { items: readonly { path: string; name: string }[] }) {
  return (
    <ul className="service-links directory-links">
      {items.map(({ path, name }) => <li key={path}><a className="ulink" href={path}>{name}</a></li>)}
    </ul>
  );
}
