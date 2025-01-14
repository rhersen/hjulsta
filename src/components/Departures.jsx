import { h } from "preact";
import { useState } from "preact/hooks";

const TransportIcon = ({ mode }) => {
  const icons = {
    METRO: "🚇",
    BUS: "🚌",
    TRAIN: "🚂",
    TRAM: "🚊",
  };
  return <span title={mode}>{icons[mode] || "🚍"}</span>;
};

const DepartureTime = ({ scheduled, expected, display }) => {
  const formatTime = (isoString) =>
    new Date(isoString).toLocaleTimeString("sv-SE").slice(0, 5);

  const scheduledTime = formatTime(scheduled);
  const expectedTime = formatTime(expected);

  return (
    <div>
      {display === "Nu" ? (
        <strong>Nu</strong>
      ) : (
        <>
          {scheduledTime !== expectedTime ? (
            <span title={`Scheduled: ${scheduledTime}`}>
              {expectedTime} ({display})
            </span>
          ) : (
            <span>
              {scheduledTime} ({display})
            </span>
          )}
        </>
      )}
    </div>
  );
};

const Departures = ({ data }) => {
  // Sort all departures by expected time
  const departures = [...(data?.departures || [])].sort(
    (a, b) => new Date(a.expected) - new Date(b.expected),
  );

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {departures
          .filter((departure) => departure.destination === "Hjulsta")
          .map((departure, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #eee",
                borderRadius: "4px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <TransportIcon mode={departure.line.transport_mode} />
                  <strong style={{ marginLeft: "8px" }}>
                    Linje {departure.line.designation}
                  </strong>
                  {departure.line.group_of_lines && (
                    <span style={{ color: "#666", marginLeft: "8px" }}>
                      ({departure.line.group_of_lines})
                    </span>
                  )}
                </div>
                <DepartureTime
                  scheduled={departure.scheduled}
                  expected={departure.expected}
                  display={departure.display}
                />
              </div>
              <div style={{ marginTop: "4px" }}>
                → {departure.destination}
                <span
                  style={{
                    color: "#666",
                    fontSize: "0.9em",
                    marginLeft: "8px",
                  }}
                >
                  från {departure.stop_point.name} (Platform{" "}
                  {departure.stop_point.designation})
                </span>
              </div>
              {departure.state !== "EXPECTED" && (
                <div
                  style={{ color: "#666", fontSize: "0.9em", marginTop: "4px" }}
                >
                  Status: {departure.state}
                </div>
              )}
            </li>
          ))}
      </ul>
      {departures.length === 0 && <p>No departure information available.</p>}
    </div>
  );
};

export default Departures;
