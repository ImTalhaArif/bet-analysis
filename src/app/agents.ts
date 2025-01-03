import { NextApiRequest, NextApiResponse } from 'next';

interface Bet {
  userId: string;
  betDetails: string;
  amount: number;
  pick: string;
}

let userBets: Record<string, Bet[]> = {}; // Store bets for simplicity

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { userId, betDetails, amount, pick }: Bet = req.body;

    if (!userId || !betDetails || !amount || !pick) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    if (!userBets[userId]) userBets[userId] = [];
    userBets[userId].push({ userId, betDetails, amount, pick });

    return res.status(200).json({ message: 'Bet locked successfully!', bets: userBets[userId] });
  }

  if (method === 'GET') {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'User ID required' });
    }

    const userPerformance = userBets[userId] || [];
    const totalAmount = userPerformance.reduce((sum, bet) => sum + bet.amount, 0);

    return res.status(200).json({
      message: 'Daily Performance Update',
      totalAmount,
      bets: userPerformance,
    });
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
