import SessionItem from "./SessionItem";

type RawSessionData = {
  id: string;
  title: string;
  summary: string;
  description: string;
  duration: number;
  date: string;
  image: string;
};

type SessionsListProps = {
  sessions: RawSessionData[];
};

export default function SessionsList({ sessions }: SessionsListProps) {
  return (
    <ul id="sessions-list">
      {sessions.map((session) => (
        <li key={session.id}>
          <SessionItem
            id={session.id}
            image={session.image}
            summary={session.summary}
            title={session.title}
          />
        </li>
      ))}
    </ul>
  );
}
