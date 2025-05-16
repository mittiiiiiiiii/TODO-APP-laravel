import { router } from "@inertiajs/react";

export default function ProfileButton() {
	const handleProfile = () => {
		console.log("プロフィールの編集ボタンが押されたよー");
		router.visit("/profile");
	};

	return (
		<button type="button" onClick={handleProfile} className="profile-edit-btn">
			プロフィールの編集
		</button>
	);
}
