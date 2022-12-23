/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/components/Header.js",
    "./src/components/NotFound.js",
    "./src/components/Search.js",
    "./src/components/UserCard.js",
    "./src/customRouter/PageRender.js",
    "./src/screen/Login.js",
    "./src/screen/Register.js",
    "./src/screen/Home.js",
    "./src/screen/profile/[id].js",
    "./src/screen/profile/SearchUser.js",
    "./src/screen/profile/UserDetails.js",
    "./src/screen/profile/Posts.js",
    "./src/screen/profile/FollowBtn.js",
    "./src/screen/profile/EditProfile.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
