import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

export default function Index(props) {
    const { isLoggedIn, setLoggedIn } = props
    return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}>
          </Route>
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUp setIsLoggedIn={setLoggedIn} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}