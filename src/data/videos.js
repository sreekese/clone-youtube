export const categories = [
  "All",
  "Movies",
  "Education",
  "Travel",
  "Music",
  "Gaming",
  "Sports",
];
const sample = "https://storage.googleapis.com/gtv-videos-bucket/sample/";
export const videos = [
  {
    id: "bunny",
    title: "Big Buck Bunny — a little kindness goes a long way",
    channel: "Blender Foundation",
    category: "Movies",
    views: "1.2M",
    duration: "9:56",
    file: "BigBuckBunny.mp4",
    image: "BigBuckBunny.jpg",
  },
  {
    id: "dream",
    title: "Elephants Dream | An open movie experiment",
    channel: "Blender Foundation",
    category: "Movies",
    views: "842K",
    duration: "10:53",
    file: "ElephantsDream.mp4",
    image: "ElephantsDream.jpg",
  },
  {
    id: "sintel",
    title: "Sintel — a journey worth taking",
    channel: "Blender Foundation",
    category: "Movies",
    views: "2.4M",
    duration: "14:48",
    file: "Sintel.mp4",
    image: "Sintel.jpg",
  },
  {
    id: "steel",
    title: "Tears of Steel | Behind a futuristic world",
    channel: "Blender Foundation",
    category: "Education",
    views: "516K",
    duration: "12:14",
    file: "TearsOfSteel.mp4",
    image: "TearsOfSteel.jpg",
  },
  {
    id: "escape",
    title: "Find your next great escape",
    channel: "Subaru",
    category: "Travel",
    views: "128K",
    duration: "0:15",
    file: "ForBiggerEscapes.mp4",
    image: "ForBiggerEscapes.jpg",
  },
  {
    id: "fun",
    title: "Make room for a little more fun",
    channel: "Google",
    category: "Gaming",
    views: "93K",
    duration: "1:00",
    file: "ForBiggerFun.mp4",
    image: "ForBiggerFun.jpg",
  },
].map((video) => ({
  ...video,
  src: sample + video.file,
  thumbnail: sample + "images/" + video.image,
}));

export function filterVideos(
  items,
  {
    query = "",
    category = "All",
    section = "Home",
    liked = [],
    saved = [],
    history = [],
  },
) {
  const collection = {
    "Liked videos": liked,
    "Watch later": saved,
    History: history,
  }[section];
  const result = items.filter(
    (video) =>
      (!collection || collection.includes(video.id)) &&
      (category === "All" || category === video.category) &&
      `${video.title} ${video.channel} ${video.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return section === "History"
    ? result.sort((a, b) => history.indexOf(a.id) - history.indexOf(b.id))
    : result;
}
