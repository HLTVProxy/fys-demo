import RecentlyBannedCommunicationList from "@/components/Bans/RecentlyBannedCommunicationList";
import RecentlyBannedEntWatchesList from "@/components/Bans/RecentlyBannedEntWatchesList";
import RecentlyBannedList from "@/components/Bans/RecentlyBannedList";
import ImageBackgroundContainer from "@/components/ImageBackgroundContainer";
import { useBans } from "@/hooks/useBans";
import { useSplashControl } from "@/hooks/useSplashControl";

const Bans = () => {
  // 不啟用 splash
  useSplashControl(false);
  const { data, isLoading } = useBans();
  console.log("data", data);

  return (
    <ImageBackgroundContainer imgSrc="/assets/icebear.jpg">
      <h1 className="mb-6 text-center text-4xl font-bold text-white">Bans</h1>
      <RecentlyBannedList bans={data?.bans} isLoading={isLoading} />
      <div className="container mx-auto my-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentlyBannedCommunicationList
          isLoading={isLoading}
          communications={data?.communications}
        />
        <RecentlyBannedEntWatchesList
          isLoading={isLoading}
          entWatches={data?.entWatches}
        />
      </div>
    </ImageBackgroundContainer>
  );
};

export default Bans;
