import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile Page - NoteHub",
  description: "User profile page with avatar, username and email.",
  keywords: ["profile", "user", "notehub", "account"],
  openGraph: {
    title: "Profile Page - NoteHub",
    description: "View and edit your profile information.",
    url: "http://localhost:3000/profile",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/user/avatar123.png",
        width: 1200,
        height: 630,
        alt: "User Avatar",
      },
    ],
    type: "website",
  },
};

async function ProfilePage() {
  const user = await getServerMe();
  // console.log(user);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
