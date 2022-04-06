import "./App.css";
import { Alert } from "react-bootstrap";

function App() {
  let x: Number = 6;
  return (
    <div className="">
      {x}
      <br />
      {[
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ].map((variant, idx) => (
        <Alert key={idx} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </div>
  );
}

export default App;
