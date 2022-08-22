export default function Section({ children, className, ...props }) {
  return (
    <section {...props} className={`px-5 md:px-16 lg:px-28${className ? ` ${className}` : ''}`}>
      {children}
    </section>
  );
}
