import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

function AuthNavigation() {
  // const user = useAuthStore((state) => state.user);
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const handleLogout = () => {
    clearIsAuthenticated();
  };
  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      {isAuthenticated && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user?.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      )}

      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

export default AuthNavigation;
