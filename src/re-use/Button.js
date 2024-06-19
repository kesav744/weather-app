import './Button.css'

const Button = ({children,onClick,className}) => {
  return (
    <button className={`reuse-btn ${className ? className : ''}`} onClick={onClick}>{children}</button>
  )
}

export default Button;
