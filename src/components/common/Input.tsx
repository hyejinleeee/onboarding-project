import { cva, VariantProps } from "class-variance-authority";
import { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from "react";

const labelVariant = cva("font-medium text-16px tracking-0.32px mb-1", {
  variants: {
    state: {
      default: "text-gray-700 cursor-pointer",
      filled: "text-blue-500 cursor-pointer",
      error: "text-red-500 cursor-pointer",
      disable: "text-gray-400 cursor-not-allowed",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

const inputVariant = cva(
  "w-full px-4 py-2 border-2 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none",
  {
    variants: {
      state: {
        default: "border-gray-300 focus:border-black",
        filled: "border-gray-400",
        error: "border-red-500 text-red-500",
        disable: "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariant>;

type InputProps = {
  label?: string;
  validationMessage?: string;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & InputVariantProps &
  ComponentProps<"input">;

const Input = ({
  label,
  validationMessage,
  state,
  id,
  value,
  setValue,
  onChange,
  ...props
}: InputProps) => {
  const inputId = id || crypto.randomUUID();

  const handleChangeDefault = (e: ChangeEvent<HTMLInputElement>): void => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-start w-full gap-1">
      <label htmlFor={inputId} className={labelVariant({ state })}>
        {label}
      </label>

      <input
        id={inputId}
        className={inputVariant({ state })}
        value={value}
        onChange={onChange || handleChangeDefault}
        disabled={state === "disable"}
        {...props}
      />

      {validationMessage && (
        <span className="text-red-600 text-sm mt-1">{validationMessage}</span>
      )}
    </div>
  );
};

export default Input;
