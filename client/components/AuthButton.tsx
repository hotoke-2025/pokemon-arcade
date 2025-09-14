import { useIsAuthenticated } from '@auth0/auth0-react';

interface Props {
  children: React.ReactNode;
}

export function IfAuthenticated({ children }: Props) {
  return useIsAuthenticated() ? <>{children}</> : null;
}

export function IfNotAuthenticated({ children }: Props) {
  return !useIsAuthenticated() ? <>{children}</> : null;
}
export default function AuthButtons() {
  return (
    <div>
      <IfAuthenticated>
        <button
          onClick={() => {
            window.location.href = '/logout';
          }}
        >
          Logout
        </button>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <button
          onClick={() => {
            window.location.href = '/login';
          }}
        >
          Login
        </button>
      </IfNotAuthenticated>
    </div>
  );
}
