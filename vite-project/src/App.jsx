import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import MasonryGrid from "./components/MasonryGrid";
import Notifications from "./components/Notifications";
import { uid } from "./utils/helpers";

const STORAGE_KEY = "tg_posts_storage";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const bottomRef = useRef(null); //  NEW for auto scroll

  // Load saved posts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  // Save posts when changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  // Auto-scroll when posts update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  // Preview images before publishing
  useEffect(() => {
    if (!selected.length) return setPreviews([]);

    Promise.all(
      selected.map(
        (file) =>
          new Promise((res) => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((images) => setPreviews(images));
  }, [selected]);

  // Random notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const msg = "New image added by a user";
        setNotifications((prev) => [msg, ...prev]);
        setUnread((u) => u + 1);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Handle file input
  const handleFileChange = (e) => {
    setSelected([...e.target.files]);
  };

  // Publish new posts
  const publish = () => {
    if (previews.length === 0) return;

    const newPosts = previews.map((img, i) => ({
      id: uid(),
      title: `Post ${posts.length + i + 1}`,
      image: img,
      createdAt: Date.now(),
    }));

    setPosts((p) => [...newPosts, ...p]);
    setSelected([]);
    setPreviews([]);
  };

  const clearAll = () => {
    if (window.confirm("Are you sure?")) {
      setPosts([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="p-6">
      <Header unread={unread} clearAll={clearAll} markRead={() => setUnread(0)} />

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_320px] gap-6">

        {/* FEED */}
        <div>
          <div className="mb-20">
            <MasonryGrid posts={posts} />
          </div>

          {/* AUTO-SCROLL  */}
          <div ref={bottomRef}></div>
        </div>

        {/* SIDEBAR */}
        <div>
          <ImageUpload
            previews={previews}
            handleFileChange={handleFileChange}
            publish={publish}
          />

          <Notifications items={notifications} />
        </div>
      </div>
    </div>
  );
}
