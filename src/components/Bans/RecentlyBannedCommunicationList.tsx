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
import { cn, formatBanTime, getBanIconColor } from "@/lib/utils";
import type { FC } from "react";
import type { Communication } from "@/types/bans";
import CommunicationIcon from "../img/CommunicationIcon";
import MicrophoneIcon from "../img/MicrophoneIcon";
import LiquidGlassContainer from "../LiquidGlassContainer";

const RecentlyBannedCommunicationList: FC<{
  isLoading: boolean;
  communications?: Communication[];
}> = ({ communications, isLoading }) => {
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        Recently Banned Communications
      </h1>
      <LiquidGlassContainer>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-color-none">
              <TableHead className="w-8 text-center text-white" />
              <TableHead className="w-40 text-white">Player name</TableHead>
              <TableHead className="w-28 text-white md:w-40">Mode</TableHead>
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
          ) : communications?.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-color-none">
                <TableCell colSpan={6} className="h-40 text-center">
                  No communications available
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {communications?.map((communication) => (
                <TableRow
                  key={communication.id}
                  className="hover:bg-color-none"
                >
                  <TableCell className="min-w-4">
                    {communication.comm === 0 ? (
                      <CommunicationIcon
                        className={cn(
                          "mx-auto h-4 w-4",
                          getBanIconColor(
                            communication.created,
                            communication.length,
                          ),
                        )}
                      />
                    ) : (
                      <MicrophoneIcon
                        className={cn(
                          "mx-auto h-4 w-4",
                          getBanIconColor(
                            communication.created,
                            communication.length,
                          ),
                        )}
                      />
                    )}
                  </TableCell>
                  <TableCell className="min-w-40">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={communication.avatar}
                        alt={communication.nickname}
                        className="h-6 w-6 rounded-sm"
                        imgClassName="rounded-sm"
                      />
                      <span style={{ color: communication.color || "#ffffff" }}>
                        {communication.nickname}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-28">
                    {communication.typeString}
                  </TableCell>
                  <TableCell className="w-20 text-center md:w-40">
                    {formatBanTime(communication.created)}
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

export default RecentlyBannedCommunicationList;
