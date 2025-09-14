import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  children: React.ReactNode;
}

const useIsAuthenticated = () => {
  const {isAuthenticated} = useAuth0();
  if (isAuthenticated){
    return true
  } else {
    return false
  }
} 

export function IfAuthenticated( props : Props) {
  const { children } = props;
  return useIsAuthenticated() ? <>{children}</> : null;
}

export function IfNotAuthenticated({ children }: Props) {
  return !useIsAuthenticated() ? <>{children}</> : null;
}

// export default function AuthButton() {
//   return (
//     <div>
//       <IfAuthenticated>
//         <button
//           onClick={() => {
//             window.location.href = '/logout';
//           }}
//         >
//           Logout
//         </button>
//       </IfAuthenticated>

//       <IfNotAuthenticated>
//         <button
//           onClick={() => {
//             window.location.href = '/login';
//           }}
//         >
//           Login
//         </button>
//       </IfNotAuthenticated>
//     </div>
//   );


