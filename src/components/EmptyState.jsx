export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="empty">
      {Icon && <Icon className="icon-big" />}
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
