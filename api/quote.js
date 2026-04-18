export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const { type, symbol } = req.query;
  const FH = 'd7hi6k1r01qhiu0bn8og';
  const GOLD_KEY = 'fecdd33123b16d540f362980e5f0342fbfc7d98554e3fbcec4772337f29e140b';
  try {
    if (type === 'upbit') {
      const r = await fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-USDT');
      const d = await r.json();
      return res.status(200).json(d);
    }
    if (type === 'fng') {
      const r = await fetch('https://api.alternative.me/fng/?limit=1');
      const d = await r.json();
      return res.status(200).json(d);
    }
    if (type === 'stock') {
      const r = await fetch('https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + FH);
      const d = await r.json();
      return res.status(200).json(d);
    }
    if (type === 'gold') {
      const r = await fetch('https://www.gold-api.com/price/XAU', { headers: { 'x-access-token': GOLD_KEY } });
      const d = await r.json();
      return res.status(200).json(d);
    }
    return res.status(400).json({ error: 'invalid type' });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
