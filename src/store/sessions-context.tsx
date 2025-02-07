import { createContext, ReactNode, useContext, useReducer } from "react";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  duration: number;
  date: string;
  image: string;
};

type SessionState = {
  upcomingSessions: Session[];
};

type SessionContextValue = SessionState & {
  bookSession: (session: Session) => void;
  cancelSession: (sessionId: string) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function useSessionContext() {
  const sessionCtx = useContext(SessionContext);
  if (!sessionCtx) {
    throw new Error("Something went wrong!");
  }
  return sessionCtx;
}

const initialState: SessionState = { upcomingSessions: [] };

type BookSessionActionType = {
  type: "BOOK_SESSION";
  payload: Session;
};

type CancelSessionActionType = {
  type: "CANCEL_SESSION";
  payload: string;
};

type SessionAction = BookSessionActionType | CancelSessionActionType;

function sessionReducer(state: SessionState, action: SessionAction) {
  if (action.type === "BOOK_SESSION") {
    if (
      state.upcomingSessions.some((session) => session.id === action.payload.id)
    ) {
      return state;
    }
    return { upcomingSessions: state.upcomingSessions.concat(action.payload) };
  }
  if (action.type === "CANCEL_SESSION") {
    return {
      upcomingSessions: state.upcomingSessions.filter(
        (session) => session.id !== action.payload
      ),
    };
  }
  return state;
}

export default function SessionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentSession, dispatch] = useReducer(sessionReducer, initialState);

  const ctxValue: SessionContextValue = {
    upcomingSessions: currentSession.upcomingSessions,
    bookSession(session: Session) {
      dispatch({
        type: "BOOK_SESSION",
        payload: session,
      });
    },
    cancelSession(sessionId: string) {
      dispatch({
        type: "CANCEL_SESSION",
        payload: sessionId,
      });
    },
  };

  return (
    <SessionContext.Provider value={ctxValue}>
      {children}
    </SessionContext.Provider>
  );
}
