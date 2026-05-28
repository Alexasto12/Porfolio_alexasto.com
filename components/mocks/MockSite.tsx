import type { MockKey } from "@/data/projects";
import { MockNeibrLanding } from "./MockNeibrLanding";
import { MockNeibrApi } from "./MockNeibrApi";
import { MockLarasoak } from "./MockLarasoak";
import { MockGokthermal } from "./MockGokthermal";
import { MockRoses } from "./MockRoses";
import { MockPeer2Stream } from "./MockPeer2Stream";
import { MockPokeDS } from "./MockPokeDS";
import { MockSalerm } from "./MockSalerm";

const MAP: Record<MockKey, () => React.ReactNode> = {
  neibrPlatform: MockNeibrApi,
  neibrLanding: MockNeibrLanding,
  larasoak: MockLarasoak,
  gokthermal: MockGokthermal,
  roses: MockRoses,
  peer2stream: MockPeer2Stream,
  pokeDS: MockPokeDS,
  salerm: MockSalerm,
};

export function MockSite({ kind }: { kind: MockKey }) {
  const Cmp = MAP[kind];
  return <Cmp />;
}
