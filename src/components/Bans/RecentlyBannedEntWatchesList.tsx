import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "../Spinner";
import Avatar from "@/components/Avatar";
import {
  cn,
  formatBanDuration,
  formatBanTime,
  getBanIconColor,
} from "@/lib/utils";
import type { FC } from "react";
import type { EntWatch } from "@/types/bans";
import BugIcon from "../img/BugIcon";
import LiquidGlassContainer from "../LiquidGlassContainer";

const RecentlyBannedEntWatchesList: FC<{
  isLoading: boolean;
  entWatches?: EntWatch[];
}> = ({ entWatches, isLoading }) => {
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        Recently Banned EntWatches
      </h1>
      <LiquidGlassContainer>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-color-none">
              <TableHead className="w-8 text-center text-white" />
              <TableHead className="w-40 text-white">Player name</TableHead>
              <TableHead className="w-28 text-white md:w-40">
                Ban duration
              </TableHead>
              <TableHead className="w-40 text-center text-white">
                Ban time
              </TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow className="hover:bg-color-none">
                <TableCell colSpan={7} className="h-40 text-center">
                  <Spinner className="text-white" size="large" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : entWatches?.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-color-none">
                <TableCell colSpan={6} className="h-40 text-center">
                  No entWatches available
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {entWatches?.map((entWatch) => (
                <TableRow key={entWatch.id} className="hover:bg-color-none">
                  <TableCell className="min-w-4">
                    <BugIcon
                      className={cn(
                        "mx-auto h-4 w-4",
                        getBanIconColor(entWatch.created, entWatch.length),
                      )}
                    />
                  </TableCell>
                  <TableCell className="min-w-40">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={entWatch.avatar}
                        alt={entWatch.nickname}
                        className="h-6 w-6 rounded-sm"
                        imgClassName="rounded-sm"
                      />
                      <span style={{ color: entWatch.color || "#ffffff" }}>
                        {entWatch.nickname}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-28">
                    {formatBanDuration(entWatch.length)}
                  </TableCell>
                  <TableCell className="w-20 text-center md:w-40">
                    {formatBanTime(entWatch.created)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </LiquidGlassContainer>
    </div>
  );
};

export default RecentlyBannedEntWatchesList;
