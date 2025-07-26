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
import BanIcon from "../img/BanIcon";
import {
  cn,
  formatBanTime,
  formatExpirationTime,
  formatBanDuration,
  getBanIconColor,
} from "@/lib/utils";
import type { FC } from "react";
import type { Ban } from "@/types/bans";
import LiquidGlassContainer from "../LiquidGlassContainer";

const RecentlyBannedList: FC<{ isLoading: boolean; bans?: Ban[] }> = ({
  bans,
  isLoading,
}) => {
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        Recently Banned Players
      </h1>
      <LiquidGlassContainer>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-color-none">
              <TableHead className="w-8 text-center text-white" />
              <TableHead className="w-60 text-white">Player name</TableHead>
              <TableHead className="w-60 text-white">Operator name</TableHead>
              <TableHead className="w-32 text-white">Ban type</TableHead>
              <TableHead className="w-32 text-center text-white">
                Ban duration
              </TableHead>
              <TableHead className="w-32 text-center text-white">
                Ban time
              </TableHead>
              <TableHead className="w-32 text-center text-white">
                Expiration time
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
          ) : bans?.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-color-none">
                <TableCell colSpan={6} className="h-40 text-center">
                  No bans available
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {bans?.map((ban) => (
                <TableRow key={ban.id} className="hover:bg-color-none">
                  <TableCell className="min-w-4">
                    <BanIcon
                      className={cn(
                        "mx-auto h-4 w-4",
                        getBanIconColor(ban.created, ban.length),
                      )}
                    />
                  </TableCell>
                  <TableCell className="min-w-60">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={ban.avatar}
                        alt={ban.nickname}
                        className="h-6 w-6 rounded-sm"
                        imgClassName="rounded-sm"
                      />
                      <span style={{ color: ban.color || "#ffffff" }}>
                        {ban.nickname}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-60">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={ban.adminAvatar}
                        alt={ban.adminName}
                        className="h-6 w-6 rounded-sm"
                        imgClassName="rounded-sm"
                      />
                      <span
                        style={
                          { color: ban.adminColor || "#ffffff" } // 使用 adminColor 或默認白色
                        }
                      >
                        {ban.adminName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-32">{ban.typeString}</TableCell>
                  <TableCell className="min-w-32 text-center">
                    {formatBanDuration(ban.length)}
                  </TableCell>
                  <TableCell className="min-w-32 text-center">
                    {formatBanTime(ban.created)}
                  </TableCell>
                  <TableCell className="min-w-32 text-center">
                    {formatExpirationTime(ban.created, ban.length)}
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

export default RecentlyBannedList;
