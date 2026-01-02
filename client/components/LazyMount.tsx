import * as React from "react";

type Props = {
  rootMargin?: string;
  once?: boolean;
  placeholder?: React.ReactNode;
  children: React.ReactNode;
};

export default function LazyMount({
  rootMargin = "200px",
  once = true,
  placeholder = null,
  children,
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once, visible]);

  return <div ref={ref}>{visible ? children : placeholder}</div>;
}
