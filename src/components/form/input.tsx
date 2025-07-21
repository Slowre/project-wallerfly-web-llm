import { cn } from "@/utils/styles"

type InputProps = React.ComponentProps<'input'> & {
    label?: string
    error?: string
    placeholder?: string
}
export default function Input({ className, type, label, ...props }: InputProps) {
    return (<div>
        {label && (

            <label className=" mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        )}
        <input type={type}
            data-slot="input"
            className={cn(
                'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:text-gray-300 dark:placeholder:text-gray-300',
                type !== 'checkbox' && 'h-9 border-input border shadow-xs w-full',
                className,
            )}
            {...props}
        />
        {props.error && (
            <p className="mt-2 text-sm text-red-600">{props.error}</p>
        )}
    </div>)
}