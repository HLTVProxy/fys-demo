import { useDashboard } from "@/hooks/useDashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CS2Logo from "../img/CS2Logo";
import CSGOLogo from "../img/CSGOLogo";
import { Spinner } from "../Spinner";
import LiquidGlassContainer from "../LiquidGlassContainer";

const ServerList = () => {
  const { servers, isLoading } = useDashboard();

  return (
    <div>
      <h1 className="mb-6 text-center text-4xl font-bold text-white">
        Server List
      </h1>
      <LiquidGlassContainer>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-color-none">
              <TableHead className="w-10 text-center text-white">#</TableHead>
              <TableHead className="w-40 text-white">Server</TableHead>
              <TableHead className="w-40 text-white">Map</TableHead>
              <TableHead className="w-40 text-white">Map translation</TableHead>
              <TableHead className="w-40 text-center text-white">
                Stage / Score
              </TableHead>
              <TableHead className="w-10 text-center text-white">
                Players
              </TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow className="hover:bg-color-none">
                <TableCell colSpan={6} className="h-40 text-center">
                  <Spinner className="text-white" size="large" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : servers.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-color-none">
                <TableCell colSpan={6} className="h-40 text-center">
                  No servers available
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {servers.map((server) => (
                <TableRow
                  key={server.host + server.port}
                  className="hover:bg-color-none"
                >
                  <TableCell className="min-w-10">
                    {server.game === "cs2" ? (
                      <CS2Logo />
                    ) : server.game === "csgo" ? (
                      <CSGOLogo />
                    ) : null}
                  </TableCell>
                  <TableCell className="min-w-40">{server.name}</TableCell>
                  <TableCell className="min-w-40">{server.map}</TableCell>
                  <TableCell className="min-w-40">
                    {server.translation}
                  </TableCell>
                  <TableCell className="min-w-40 text-center">
                    {server.ctScore !== undefined &&
                    server.teScore !== undefined ? (
                      <>
                        {server.ctScore} : {server.teScore}
                      </>
                    ) : server.currentStage && server.totalStage ? (
                      <>
                        {server.currentStage} / {server.totalStage}
                      </>
                    ) : (
                      "- / -"
                    )}
                  </TableCell>
                  <TableCell className="min-w-10 text-center">{`${server.currentPlayers} / ${server.maxPlayers}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </LiquidGlassContainer>
    </div>
  );
};

export default ServerList;
