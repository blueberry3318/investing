export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const { type, symbol } = req.query;
  const FH = 'd7hi6k1r01qhiu0bn8og';
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
      const r = await fetch('https://api.frankfurter.app/latest?from=XAU&to=USD,KRW');
      const d = await r.json();
      const usdPerOz = 1 / d.rates.USD;
      const krwPerGram = (usdPerOz / 31.1035) * d.rates.KRW;
      return res.status(200).json({ c: usdPerOz, pc: usdPerOz, krwPerGram: krwPerGram });
    }
    return res.status(400).json({ error: 'invalid type' });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
