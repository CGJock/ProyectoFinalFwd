import Inpts from "../../../components/Admin-components/admin-static-components/inpts";
import { useTheContext } from "../../../context/ContextProvider";

const Login = () => {
    const { username, setUsername, password, setPassword } = useTheContext();
    const handleLogin = () => {

    }
    


return (
    <>
    <div>
        <h1>Login</h1>
        <Inpts
            placeholder="Username"
            type="text"
            value={username}
            Change_Value={(e) => setUsername(e.target.value)}
        />
        <Inpts
            placeholder="Password"
            type="password"
            value={password}
            Change_Value={(e) => setPassword(e.target.value)}
            
        />

        <button onClick={handleLogin}>Login</button>
    </div>
     </>
    )

}
