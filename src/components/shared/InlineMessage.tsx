interface InlineMessageProps {
  children: React.ReactNode;
  variant: "info" | "error";
}

export const InlineMessage = ({ children, variant }: InlineMessageProps) => {
  const baseStyles = "text-md font-medium mt-10 text-center";
  const messageStyles = {
    info: "text-slate-500",
    error: "text-red-500",
  }[variant];

  return <p className={`${baseStyles} ${messageStyles}`}>{children}</p>;
};
