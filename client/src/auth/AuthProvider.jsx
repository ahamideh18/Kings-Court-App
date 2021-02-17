import { createContext } from "react";
import { useProvideAuth } from './useAuth'

export const authContext = createContext();
const { Provider } = authContext;

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <Provider value={auth}>
            {children}
        </Provider>
    )
};

export default AuthProvider;
