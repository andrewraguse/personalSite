import "./TextBox.scss";

interface Props {
  children: React.ReactNode;
  theme: string;
}

function TextBox({ children, theme }: Props) {
  return (
    <div
      className={`default-text-box default-text-box-${theme} animate__animated animate__pulse`}
    >
      {children}
    </div>
  );
}

export default TextBox;
