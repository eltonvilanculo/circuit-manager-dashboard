type Props = {
  children: React.ReactNode;
  size?: "large" | "medium" | "small";
};

export default function AppCard({ children, size = "small" }: Props) {
  const percentage = size === "large" ? 100 : size === "small" ? 60 : 80;

  return (
    <div
      className={`max-w-[${percentage}%] bg-slate-100 shadow-sm rounded-md p-12 space-y-3`}
    >
      {children}
    </div>
  );
}
