import { useCallback, useState } from "react";
import TopBar from "@/components/mattflix/TopBar";
import Hero from "@/components/mattflix/Hero";
import TitleRow from "@/components/mattflix/TitleRow";
import SearchOverlay from "@/components/mattflix/SearchOverlay";
import InfoModal from "@/components/mattflix/InfoModal";
import VideoPlayer from "@/components/mattflix/VideoPlayer";
import Toast from "@/components/mattflix/Toast";
import Footer from "@/components/mattflix/Footer";
import useWatchState from "@/hooks/useWatchState";
import { findTitle, titlesFor } from "@/lib/catalog";
import { toggleMyList } from "@/lib/watchState";

export default function Home() {
  const { myList, progress, continueTitles } = useWatchState();
  const [searchOpen, setSearchOpen] = useState(false);
  const [infoItem, setInfoItem] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [toast, setToast] = useState("");

  const notify = useCallback((message) => setToast(message), []);

  const handleToggleList = useCallback(
    (item) => {
      const added = toggleMyList(item.title);
      notify(added ? "Added to My List" : "Removed from My List");
    },
    [notify],
  );

  const continueItems = continueTitles.map(findTitle).filter(Boolean);
  const myListItems = myList.map(findTitle).filter(Boolean);
  const rowProps = {
    progress,
    myList,
    onPlay: setPlaying,
    onInfo: setInfoItem,
    onToggleList: handleToggleList,
  };

  return (
    <div id="top" className="min-h-screen bg-[#070708] text-white">
      <TopBar
        onSearch={() => setSearchOpen(true)}
        onNotify={() => notify("You're all caught up!")}
        onProfile={() => notify("Profile: Matthew")}
      />

      <main>
        <Hero onPlay={setPlaying} onInfo={setInfoItem} />

        {continueItems.length > 0 && (
          <TitleRow id="continue" title="Continue Watching for Matthew" items={continueItems} {...rowProps} />
        )}
        <TitleRow id="shows" title="Out Now" items={titlesFor("continue")} {...rowProps} />
        <TitleRow id="movies" title="Popular on Mattflix" items={titlesFor("popular")} {...rowProps} />
        <TitleRow id="new" title="New Releases" items={titlesFor("new")} {...rowProps} />
        <TitleRow
          id="my-list"
          title="My List"
          items={myListItems}
          emptyMessage="Your list is empty. Click ＋ on a title to add it."
          {...rowProps}
        />
      </main>

      <Footer />

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} {...rowProps} />}
      {infoItem && (
        <InfoModal
          item={infoItem}
          inList={myList.includes(infoItem.title)}
          onClose={() => setInfoItem(null)}
          onPlay={(item) => {
            setInfoItem(null);
            setPlaying(item);
          }}
          onToggleList={handleToggleList}
        />
      )}
      {playing && <VideoPlayer item={playing} onClose={() => setPlaying(null)} />}

      <Toast message={toast} onDone={() => setToast("")} />
    </div>
  );
}