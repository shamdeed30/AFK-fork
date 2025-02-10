import React from "react";

const SeasonCard = ({ players }) => {
  return (
    <div className="overflow-x-auto text-custom-off-white">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-white">
            {players.length > 0 &&
              Object.keys(players[0]).map((header, index) => (
                <th
                  key={index}
                  className="border-b border-custom-off-white bg-custom-gray p-4"
                >
                  {header.toUpperCase()}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {players.map((player, index) => (
            <tr key={`team-${index}`}>
              {Object.values(player).map((stat, idx) => (
                <td
                  key={`team-${idx}-stat-${idx}`}
                  className={`${
                    index % 2 === 0 ? "bg-custom-light-gray" : "bg-custom-gray"
                  } border-y border-custom-off-white p-4`}
                >
                  {stat}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeasonCard;
