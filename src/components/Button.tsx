function ActionButton({ action, color, disabled, children }: {
  action: () => void;
  color: string,
  disabled?: boolean,
  children: React.ReactNode
}) {
  return (
    <button onClick={action} disabled={disabled} className={`py-2 px-16 ${disabled ? `bg-gray-500 cursor-not-allowed` : color} text-white rounded-lg shadow-lg`}>{children}</button>
  )
}

export default ActionButton;