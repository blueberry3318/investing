export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const { type, symbol } = req.query;
  const FH = 'd7hi6k1r01qhiu0bn8og';
  const GOLD_API_KEY = '';
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
      const headers = GOLD_API_KEY ? { 'x-access-token': GOLD_API_KEY } : {};
      const [goldRes, krwRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU/USD', { headers }),
        fetch('https://api.gold-api.com/price/XAU/KRW', { headers })
      ]);
      const goldUsd = await goldRes.json();
      const goldKrw = await krwRes.json();
      const usdPerOz = goldUsd.price;
      const krwPerOz = goldKrw.price;
      const krwPerGram = krwPerOz / 31.1035;
      return res.status(200).json({ c: usdPerOz, pc: usdPerOz, krwPerGram });
    }
    return res.status(400).json({ error: 'invalid type' });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
