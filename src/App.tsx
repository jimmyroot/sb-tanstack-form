import "./App.css";
import SignUp from "./components/SignUp";
import Typography from "./components/ui/typography";

function App() {
  return (
    <div className="dark w-screen h-screen bg-background flex flex-col items-center">
      <Typography
        variant={"h1"}
        className="my-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600"
      >
        Tanstack Form Demo
      </Typography>
      <SignUp />
    </div>
  );
}

export default App;
