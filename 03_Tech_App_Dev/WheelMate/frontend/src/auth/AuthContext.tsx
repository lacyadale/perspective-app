import React, { createContext, useContext, useState } from 'react';

type AuthCtx = {
  apiKey: string | null;
  tier:   string | null;
  login:  (email: string) => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

export const useAuth = (): AuthCtx => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [tier,   setTier]   = useState<string | null>(null);

  const login = (email: string) => {
    if (email.includes('+ent')) {
      setApiKey('sk_test_enterprise');
      setTier('enterprise');
    } else if (email.includes('+pro')) {
      setApiKey('sk_test_premium');
      setTier('premium');
    } else {
      setApiKey('sk_test_free');
      setTier('free');
    }
  };

  return (
    <AuthContext.Provider value={{ apiKey, tier, login }}>
      {children}
    </AuthContext.Provider>
  );
};
