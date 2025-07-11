import React, { useEffect, useState } from 'react';
import { useAuth }                    from '../auth/AuthContext';

type Trade = {
  symbol:  string;
  strike:  number;
  iv_rank: number;
  rsi:     number;
};

export default function DashboardPage() {
  const { apiKey, tier } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    fetch('/trades', { headers: { 'X-Api-Key': apiKey || '' } })
      .then(r => r.json())
      .then(setTrades);
  }, [apiKey]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard — Tier: {tier}</h2>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Strike</th>
            <th>IV Rank</th>
            <th>RSI</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t, i) => (
            <tr key={i}>
              <td>{t.symbol}</td>
              <td>{t.strike}</td>
              <td>{t.iv_rank.toFixed(2)}</td>
              <td>{t.rsi.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
