const ButtonDemo = ({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "secondary" | "primary";
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        h-10
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        px-4
        text-sm
        font-medium
        transition-all
        duration-200

        ${
          variant === "primary"
            ? `
              border-(--primary-color)
              bg-(--primary-color)
              text-white
              shadow-sm
              hover:brightness-110
              hover:shadow-md
            `
            : `
              border-(--border-color)
              bg-(--surface-color)
              text-(--text-color)
              hover:border-(--primary-color)
              hover:text-(--primary-color)
              hover:bg-(--surface-hover)
            `
        }

        active:scale-[0.97]

        disabled:cursor-not-allowed
        disabled:pointer-events-none
        disabled:opacity-40
      `}
    >
      {children}
    </button>
  );
};

export default ButtonDemo;