import { getTournamentsService } from "../tournament/tournament.service.js";

export const getLeadBoardTurnaments = async (req, res) => {
  const turnaments = await getTournamentsService();
  const LeadBoardTurnaments = await turnaments.filter(
    (item) => item.inform === true,
  );

  res.json(LeadBoardTurnaments);
};
export const getLeadBoardPlayers = async (req, res) => {};
