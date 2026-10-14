// Every searchable item is a Card with id="item-<id>" so search can scroll to it.
export function Card({ id, as: Tag = "article", className = "", children, ...rest }) {
  return (
    <Tag
      id={id ? `item-${id}` : undefined}
      data-item={id ? "" : undefined}
      tabIndex={id ? -1 : undefined}
      className={`card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
