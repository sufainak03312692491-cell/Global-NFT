let users = {};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { action } = req.query;
    const body = req.body || {};
    const userId = body.userId || "default_user";

    if (!users[userId]) {
        users[userId] = {
            username: body.username || 'Trader',
            balance: 12.00, // Starting bonus balance matching your UI
            lastClaim: null,
            withdrawals: []
        };
    }

    if (req.method === 'POST') {
        if (action === 'get_user') {
            return res.status(200).json(users[userId]);
        }
        if (action === 'claim') {
            const user = users[userId];
            const reward = 5.00;
            user.balance += reward;
            return res.status(200).json({ success: true, newBalance: user.balance, reward });
        }
        if (action === 'deposit') {
            const { amount, txid } = body;
            return res.status(200).json({ success: true, message: 'Deposit submitted for confirmation.' });
        }
        if (action === 'withdraw') {
            const { amount, address } = body;
            const user = users[userId];
            if (amount <= 0 || user.balance < amount) {
                return res.status(400).json({ error: 'Insufficient balance or invalid amount.' });
            }
            user.balance -= amount;
            return res.status(200).json({ success: true, message: 'Withdrawal request submitted successfully.' });
        }
    }

    return res.status(200).json(users[userId]);
              }
