const sizes = {
  'md' : 'w-48 h-10',
  'fit': '',
  'fill': 'w-full'
}
//TODO: This would be easier as a styled component tbh
export const Button = ({
  children,
  onClick,
  size = 'fit',
  type = "button",
  color = "primary"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'md' | 'fit' | 'fill';
  type?: "button" | "submit";
  color?: "primary" | "secondary"
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-${color} rounded-md shadow-sm text-white flex items-center justify-center py-2 px-4 ${sizes[size]}
  hover:bg-${color}-dark focus:outline-none focus:ring-2 focus:ring-offset-2`}
  >
    {children}
  </button>
);
