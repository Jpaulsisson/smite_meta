"use client"

import { supabase } from '@/database/supabase';
import { Session } from '@supabase/supabase-js';
import React, {Dispatch, SetStateAction, createContext, ReactNode, useContext, useState, useEffect } from 'react';
import md5 from 'md5';

type UserContextProviderProps = {
  children: ReactNode;
}

type UserContext = {
  currentSession: object | null;
  setCurrentSession: Dispatch<SetStateAction<Session | null>>;
  appElement: HTMLElement | undefined;
  currentUsername: string | null;
  currentUserId: string | null;
  hashedId: string | null;
}

const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [appElement, setAppElement] = useState<HTMLElement | undefined>(undefined);
  const [currentUsername, setcurrentUsername] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hashedId, setHashedId] = useState<string | null>(null);

  useEffect(() => {
    if (document) {
      const newAppElement = document.getElementById('app') || undefined;
      if (newAppElement) setAppElement(newAppElement);
    }
  }, [])

  useEffect(() => {
      const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          setCurrentSession(session);
          setCurrentUserId(session.user.id);
          setHashedId(md5(session.user.id));
        }
        if (!session) {
          setCurrentSession(null);
          setCurrentUserId(null);
          setHashedId(null);
        }
      });
  }, [])

  return (
    <UserContext.Provider
      value={{
        currentSession,
        setCurrentSession,
        appElement,
        currentUsername,
        currentUserId,
        hashedId
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContextProvider"
    );
  }
  return context;
}