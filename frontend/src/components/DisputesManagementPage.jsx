import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config";

const DisputesManagementPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch disputes from backend
  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.getAllDisputes);
        if (!response.ok) throw new Error("Failed to fetch disputes");

        const data = await response.json();
        setDisputes(data);
      } catch (error) {
        console.error("Error fetching disputes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputes();
  }, []);

  // Review dispute (navigate to Modify Page)
  const handleReview = (gameId) => {
    navigate("/modify", { state: { gameId } });
  };

  // Resolve dispute (remove from UI & database)
  const handleResolve = async (gameId) => {
    try {
      const response = await fetch(API_ENDPOINTS.resolveDispute(gameId), {
        method: "POST",
      });

      if (response.ok) {
        setDisputes((prevDisputes) =>
          prevDisputes.filter((dispute) => dispute.gameId !== gameId),
        );
        alert("Dispute resolved successfully!");
      } else {
        alert("Failed to resolve dispute.");
      }
    } catch (error) {
      console.error("Error resolving dispute:", error);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-custom-blue text-2xl text-white">
        Loading disputes...
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center bg-custom-blue p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Super Admin - Manage Disputes
      </h1>

      {disputes.length === 0 ? (
        <p className="text-white">No disputes to review.</p>
      ) : (
        disputes.map((game) => (
          <div
            key={game.gameId}
            className="mb-6 w-3/4 rounded-lg bg-custom-gray p-4 text-white shadow-lg"
          >
            {/* Game Details */}
            <h2 className="text-xl font-semibold">
              {game.gameType} - {game.map || game.code || "N/A"}
            </h2>
            <p className="text-custom-off-white">
              {game.school} vs {game.opponent || "N/A"} | {game.week} | Game{" "}
              {game.game_number}
            </p>

            {/* Display Winning & Losing Points if available */}
            {game.w_points !== "" && game.l_points !== "" && (
              <p className="font-semibold text-custom-gold">
                Score: {game.school} {game.w_points} - {game.l_points}{" "}
                {game.opponent}
              </p>
            )}

            {/* Image Preview */}
            {game.image_url && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Match Screenshot:</h3>
                <img
                  src={game.image_url}
                  alt="Game Screenshot"
                  className="mt-2 w-full rounded-lg border border-custom-off-white shadow-lg"
                />
              </div>
            )}

            {/* Dispute Comments Section */}
            <div className="mt-4 rounded-md bg-custom-light-gray p-4">
              <h3 className="text-lg font-semibold">Dispute Comments:</h3>
              <ul className="list-disc pl-4">
                {game.disputes.map((dispute, index) => (
                  <li key={index} className="text-white">
                    <strong>
                      {dispute.username} ({dispute.school}):
                    </strong>{" "}
                    {dispute.comment}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-4">
              <button
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                onClick={() => handleReview(game.gameId)}
              >
                Review & Edit
              </button>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => handleResolve(game.gameId)}
              >
                Resolve Dispute
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisputesManagementPage;
