import { useTeamStore } from "@/app/store/useTeamStore";
import { fetchTeams } from "../api/team";

const useTeam = () => {
  const { teamMembers, setTeamMembers } = useTeamStore();

  if (!teamMembers) {
    fetchTeams().then(setTeamMembers);
  }
};
export default useTeam;
