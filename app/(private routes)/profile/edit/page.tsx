import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useState } from "react";

function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // const [username, setUsername] = useState(user?.username || "");
  // const [email, setEmail] = useState(user?.email || "");
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const updatedUser = await updateMe({ username });
  //     setUser(updatedUser); // ✅ оновлюємо Zustand-store
  //     router.push("/profile"); // редірект на сторінку профілю
  //   } catch (err: any) {
  //     setError(err.message || "Failed to update profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="/placeholder/avatar.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfilePage;
