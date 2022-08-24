import "./Modal.scss";

const Modal = ({
  children,
  center = false,
}: {
  children: any;
  center?: boolean;
}) => (
  <div
    className={"modal" + (center ? " center" : "")}
    style={{ backgroundColor: "white", borderRadius: 10 }}
  >
    {children}
  </div>
);

export default Modal;
